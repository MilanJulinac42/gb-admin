import Link from "next/link";
import Layout from "../components/Layout";
import ItemList from "../components/ItemList";
import axios from "axios";
import { useEffect, useState } from "react";

type BasketType = {
	_id: string;
	name: string;
	description: string;
	price: number;
	color: string;
	giftBasket: string[];
	isSerbian: boolean;
	deleted: boolean;
	createdAt?: string;
	updatedAt?: string;
	__v?: number;
};

export default function Baskets() {
	const [items, setItems] = useState<BasketType[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		axios
			.get("http://localhost:9090/basket-type/find-all")
			.then((response) => {
				setItems(response.data.basketTypes);
				setIsLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<Layout>
			<h1>Basket Page</h1>
			<Link href={"/baskets/Basket"}>Add new basket</Link>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<ItemList type={"basketType"} items={items}></ItemList>
			)}
		</Layout>
	);
}
