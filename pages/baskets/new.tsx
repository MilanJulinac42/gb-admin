import { useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";

export default function NewBasket() {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);
	const [color, setColor] = useState("");

	async function createBasket(e: any) {
		e.preventDefault();
		const data = { name, description, price, color };
		await axios.post("http://localhost:9090/basket-type/create", data, {
			withCredentials: true,
		});
	}

	return (
		<Layout>
			<form onSubmit={createBasket}>
				<h1>New Basket</h1>
				<label htmlFor="">Basket name</label>
				<input
					type="text"
					placeholder="basket name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<label htmlFor="">Basket description</label>
				<textarea
					name="description"
					id="description"
					placeholder="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				></textarea>
				<label htmlFor="">Basket price</label>
				<input
					type="number"
					placeholder="price"
					value={price}
					onChange={(e) => setPrice(parseInt(e.target.value))}
				/>
				<label htmlFor="">Basket color</label>
				<input
					type="text"
					placeholder="color"
					value={color}
					onChange={(e) => setColor(e.target.value)}
				/>
				<button type="submit" className="btn-primary">
					Save
				</button>
			</form>
		</Layout>
	);
}
