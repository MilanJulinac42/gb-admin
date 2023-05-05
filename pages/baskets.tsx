import Link from "next/link";
import Layout from "../components/Layout";
import ItemList from "../components/ItemList";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Baskets() {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		axios
			.get("http://localhost:9090/basket-type/find-all")
			.then((response) => {
				setItems(response.data);
				setIsLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<Layout>
			<h1>Basket Page</h1>
			<Link href={"/baskets/new"}>Add new basket</Link>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<ItemList items={items}></ItemList>
			)}
		</Layout>
	);
}
