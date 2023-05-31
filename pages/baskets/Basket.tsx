// baskets/Basket.tsx
import { FormEvent, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { useRouter } from "next/router";

export type BasketProps = {
	mode: "create" | "edit";
	existingBasket?: {
		_id: number;
		name: string;
		description: string;
		price: number;
		color: string;
		isSerbian: boolean;
	};
};

export default function Basket({ mode, existingBasket }: BasketProps) {
	const router = useRouter();
	const [name, setName] = useState(existingBasket?.name || "");
	const [description, setDescription] = useState(
		existingBasket?.description || ""
	);
	const [price, setPrice] = useState(existingBasket?.price || 0);
	const [color, setColor] = useState(existingBasket?.color || "");
	const [isSerbian, setIsSerbian] = useState(
		existingBasket?.isSerbian || false
	);

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		const data = { name, description, price, color, isSerbian };

		if (mode !== "edit") {
			await axios.post("http://localhost:9090/basket-type/create", data, {
				withCredentials: true,
			});
			router.push("/baskets");
		} else if (mode === "edit" && existingBasket) {
			await axios.patch(
				`http://localhost:9090/basket-type/update/${existingBasket._id}`,
				data,
				{
					withCredentials: true,
				}
			);
			router.push("/baskets");
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
				<label htmlFor="color">Basket color</label>
				<input
					id="color"
					name="color"
					type="text"
					placeholder="color"
					value={color}
					onChange={(e) => setColor(e.target.value)}
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
