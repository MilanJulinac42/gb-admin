// gift-baskets.tsx
import Link from "next/link";
import Layout from "../components/Layout";
import ItemList from "../components/ItemList";
import axios from "axios";
import { useEffect, useState } from "react";

type GiftBasketItem = {
	item: {
		_id: string;
		name: string;
		description: string;
		price: number;
	};
	quantity: number;
	_id: string;
};

type BasketType = {
	_id: string;
	name: string;
};

type GiftBasket = {
	_id: string;
	name: string;
	description: string;
	price: number;
	profit: number;
	inStock: number;
	sold: number;
	totalProfit: number;
	liked: number;
	type: string;
	giftBasketItems: GiftBasketItem[];
	basketType: BasketType;
	isSerbian: boolean;
	imageUrl: string;
	deleted: boolean;
	createdAt: string;
	updatedAt: string;
	__v: number;
};

export default function GiftBaskets() {
	const [items, setItems] = useState<GiftBasket[]>([]);
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
