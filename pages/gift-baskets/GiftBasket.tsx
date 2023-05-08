// gift-baskets/GiftBaskets.tsx
import { useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { useRouter } from "next/router";

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
	};
}

export default function Basket({ mode, existingGiftBasket }: GiftBasketProps) {
	const router = useRouter();
	const [name, setName] = useState(existingGiftBasket?.name || "");
	const [description, setDescription] = useState(
		existingGiftBasket?.description || ""
	);
	const [price, setPrice] = useState(existingGiftBasket?.price || 0);
	const [profit, setProfit] = useState(existingGiftBasket?.profit || 0);
	const [type, setType] = useState(existingGiftBasket?.type || "");
	const [isSerbian, setIsSerbian] = useState(
		existingGiftBasket?.isSerbian || false
	);
	async function handleSubmit(e: any) {
		e.preventDefault();
		const data = { name, description, price, profit, type, isSerbian };

		if (mode !== "edit") {
			await axios.post("http://localhost:9090/gift-basket/create", data, {
				withCredentials: true,
			});
			router.push("/gift-baskets");
		} else if (mode === "edit" && existingGiftBasket) {
			await axios.patch(
				`http://localhost:9090/gift-basket/update/${existingGiftBasket._id}`,
				data,
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
				<label htmlFor="price">Basket price</label>
				<input
					id="price"
					name="price"
					type="number"
					placeholder="price"
					value={price}
					onChange={(e) => setPrice(parseInt(e.target.value))}
				/>
				<label htmlFor="profit">Basket profit</label>
				<input
					id="profit"
					name="profit"
					type="number"
					placeholder="profit"
					value={profit}
					onChange={(e) => setProfit(parseInt(e.target.value))}
				/>
				<label htmlFor="type">Basket type</label>
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