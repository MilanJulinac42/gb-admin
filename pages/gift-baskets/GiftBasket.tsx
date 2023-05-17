// gift-baskets/GiftBaskets.tsx
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import GiftBasketItemList, { GiftBasketItemsProps } from "./GiftBasketItemList";

export interface GiftBasketProps {
	mode: "create" | "edit";
	existingGiftBasket?: {
		_id: number;
		name: string;
		description: string;
		price: number;
		profit: number;
		type: string;
		isSerbian: boolean;
		imageUrl: string;
		basketType: { _id: string; name: string; price: number };
		giftBasketItems: any;
	};
}

interface BasketType {
	_id: string;
	name: string;
	price: number;
}

interface BasketItem {
	_id: string;
	name: string;
	price: number;
}

export default function Basket({ mode, existingGiftBasket }: GiftBasketProps) {
	const router = useRouter();
	const [name, setName] = useState(existingGiftBasket?.name || "");
	const [existingGiftBasketItems, setExistingGiftBasketItems] = useState<any>(
		existingGiftBasket?.giftBasketItems || []
	);
	const [description, setDescription] = useState(
		existingGiftBasket?.description || ""
	);
	const [price, setPrice] = useState(existingGiftBasket?.price || 0);
	const [profit, setProfit] = useState(existingGiftBasket?.profit || 0);
	const [type, setType] = useState(existingGiftBasket?.type || "");
	const [imageUpload, setImageUpload] = useState<File | null>(null);

	const [selectedBasketTypeId, setSelectedBasketTypeId] = useState(
		existingGiftBasket?.basketType._id || ""
	);
	const [isSerbian, setIsSerbian] = useState(
		existingGiftBasket?.isSerbian || false
	);
	const [basketTypes, setBasketTypes] = useState<BasketType[] | null>([]);
	const [basketTypePrice, setBasketTypePrice] = useState(
		existingGiftBasket?.basketType.price || 0
	);
	const [basketItems, setBasketItems] = useState<BasketItem[] | null>([]);

	const [previewImage, setPreviewImage] = useState(
		existingGiftBasket?.imageUrl || ""
	);

	const [totalItemCost, setTotalItemCost] = useState(0);

	const calculateTotalItemCost = () => {
		let totalCost = 0;
		existingGiftBasketItems.forEach((element: any) => {
			totalCost += element.quantity * element.item.price;
		});
		setTotalItemCost(totalCost);
	};

	const addNewItemToBasketItems = (item: any) => {
		setExistingGiftBasketItems([...existingGiftBasketItems, item]);
	};

	const calculateBasketProfit = () => {
		setProfit(price - totalItemCost - basketTypePrice);
	};

	const changeQuantity = (e: any, itemId: string) => {
		setExistingGiftBasketItems((prevItems: any) => {
			return prevItems.map((item: any) =>
				item._id === itemId
					? { ...item, quantity: parseInt(e.target.value) }
					: item
			);
		});
		calculateTotalItemCost();
	};

	const removeItem = (itemId: string) => {
		setExistingGiftBasketItems((prevItems: any) => {
			return prevItems.filter((item: any) => {
				return item._id !== itemId;
			});
		});
	};

	async function fetchBasketTypes() {
		try {
			const response = await axios.get(
				"http://localhost:9090/basket-type/find-all?adminBasketCreation=true"
			);
			setBasketTypes(response.data.basketTypes);
		} catch (error) {
			console.error("Error fetching basket types:", error);
		}
	}

	async function fetchBasketItems() {
		try {
			const response = await axios.get(
				"http://localhost:9090/basket-item/find-all?adminBasketCreation=true"
			);
			setBasketItems(response.data.basketItems);
		} catch (error) {
			console.error("Error fetching basket types:", error);
		}
	}

	useEffect(() => {
		fetchBasketTypes();
		fetchBasketItems();
		calculateTotalItemCost();
	}, []);

	useEffect(() => {
		calculateTotalItemCost();
	}, [existingGiftBasketItems]);

	useEffect(() => {
		calculateBasketProfit();
	}, [totalItemCost, basketTypePrice, price]);

	const handleBasketTypeChange = (e: any) => {
		const selectedBasketType = basketTypes?.find(
			(basketType) => basketType._id === e.target.value
		);
		if (selectedBasketType) {
			setSelectedBasketTypeId(selectedBasketType._id);
			setBasketTypePrice(selectedBasketType.price);
		}
	};

	async function handleSubmit(e: any) {
		e.preventDefault();

		const formatedGiftBasketItems = existingGiftBasketItems.map(
			({ item, quantity }: any) => ({
				item: item._id,
				quantity,
			})
		);

		const formData = new FormData();
		formData.append("name", name);
		formData.append("description", description);
		formData.append("price", price.toString());
		formData.append("profit", profit.toString());
		formData.append("type", type);
		formData.append("isSerbian", isSerbian ? "true" : "false");
		formData.append("basketType", selectedBasketTypeId);
		formData.append(
			"giftBasketItems",
			JSON.stringify(formatedGiftBasketItems)
		);

		if (imageUpload) {
			formData.append("imageUpload", imageUpload);
		}

		if (mode !== "edit") {
			await axios.post(
				"http://localhost:9090/gift-basket/create",
				formData,
				{
					withCredentials: true,
				}
			);
			router.push("/gift-baskets");
		} else if (mode === "edit" && existingGiftBasket) {
			await axios.patch(
				`http://localhost:9090/gift-basket/update/${existingGiftBasket._id}`,
				formData,
				{
					withCredentials: true,
				}
			);
			router.push("/gift-baskets");
		}
	}

	return (
		<Layout>
			<form onSubmit={handleSubmit}>
				<h1>{mode === "create" ? "New Basket" : "Edit Basket"}</h1>

				<div>
					<img src={previewImage} alt={name} />
				</div>

				<input
					type="file"
					name="imageUpload"
					id="imageUpload"
					onChange={(e) => {
						if (e.target.files) {
							setImageUpload(e.target.files[0]);
							setPreviewImage(
								URL.createObjectURL(e.target.files[0])
							);
						}
					}}
				/>

				<GiftBasketItemList
					existingGiftBasketItems={existingGiftBasketItems}
					changeQuantity={changeQuantity}
					removeItem={removeItem}
					addNewItemToBasketItems={addNewItemToBasketItems}
					basketItems={basketItems}
					totalItemCost={totalItemCost}
				/>

				<label htmlFor="name">Basket name</label>
				<input
					name="name"
					id="name"
					type="text"
					placeholder="basket name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>

				<label htmlFor="description">Basket description</label>
				<textarea
					name="description"
					id="description"
					placeholder="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				></textarea>

				<label htmlFor="basketType" className="block mb-2">
					Basket Type
				</label>
				<div className="flex justify-between">
					<select
						name="basketType"
						id="basketType"
						value={selectedBasketTypeId || ""}
						onChange={(e) => handleBasketTypeChange(e)}
						className="mr-2"
					>
						<option value="">Select a basket type</option>
						{basketTypes?.map((basketType) => (
							<option key={basketType._id} value={basketType._id}>
								{basketType.name}
							</option>
						))}
					</select>
					<span className="text-blue-900 font-bold text-lg w-32 mr-4 mt-1">
						Price: {basketTypePrice}
					</span>
				</div>

				<h2 className="info-header">
					BASKET TOTAL INVESTMENT COST:{" "}
					{basketTypePrice + totalItemCost}
				</h2>

				<label htmlFor="price">Basket price</label>
				<input
					id="price"
					name="price"
					type="number"
					placeholder="price"
					value={price}
					onChange={(e) => setPrice(parseInt(e.target.value))}
				/>

				<h2 className="info-header">BASKET PROFIT: {profit}</h2>

				<label htmlFor="type">Basket Class</label>
				<input
					name="type"
					id="type"
					type="text"
					placeholder="basket type"
					value={type}
					onChange={(e) => setType(e.target.value)}
				/>

				<label htmlFor="isSerbian">Is Serbian</label>
				<input
					name="isSerbian"
					className="check-input"
					type="checkbox"
					id="isSerbian"
					checked={isSerbian}
					onChange={() => setIsSerbian(!isSerbian)}
				></input>

				<button type="submit" className="btn-primary">
					Save
				</button>
			</form>
		</Layout>
	);
}
