// gift-baskets.tsx
import Link from "next/link";
import Layout from "../components/Layout";
import ItemList from "../components/ItemList";
import axios from "axios";
import { useEffect, useState } from "react";

export default function GiftBaskets() {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		axios
			.get("http://localhost:9090/gift-basket/find-all")
			.then((response) => {
				setItems(response.data.baskets);
				setIsLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<Layout>
			<h1>Basket Page</h1>
			<Link href={"/gift-baskets/GiftBasket"}>Add new gift basket</Link>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<ItemList items={items} type={"giftBasket"}></ItemList>
			)}
		</Layout>
	);
}
