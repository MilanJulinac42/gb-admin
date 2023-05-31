// basket-items/BasketItem.tsx
import { FormEvent, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { useRouter } from "next/router";

export type BasketItemProps = {
	mode: "create" | "edit";
	existingBasketItem?: {
		_id: number;
		name: string;
		description: string;
		price: number;
		weight: number;
		isSerbian: boolean;
	};
};

export default function BasketItem({
	mode,
	existingBasketItem,
}: BasketItemProps) {
	const router = useRouter();
	const [name, setName] = useState(existingBasketItem?.name || "");
	const [description, setDescription] = useState(
		existingBasketItem?.description || ""
	);
	const [price, setPrice] = useState(existingBasketItem?.price || 0);
	const [weight, setWeight] = useState(existingBasketItem?.weight || "");
	const [isSerbian, setIsSerbian] = useState(
		existingBasketItem?.isSerbian || false
	);

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		const data = { name, description, price, weight, isSerbian };

		if (mode !== "edit") {
			await axios.post("http://localhost:9090/basket-item/create", data, {
				withCredentials: true,
			});
			router.push("/basket-items");
		} else if (mode === "edit" && existingBasketItem) {
			await axios.patch(
				`http://localhost:9090/basket-item/update${existingBasketItem._id}`,
				data,
				{
					withCredentials: true,
				}
			);
			router.push("/basket-items");
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
				<label htmlFor="color">Basket weight</label>
				<input
					id="weight"
					name="weight"
					type="text"
					placeholder="color"
					value={weight}
					onChange={(e) => setWeight(e.target.value)}
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
