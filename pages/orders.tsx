import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import OrdersList from "../components/OrdersList";

export default function Orders() {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		axios
			.get("http://localhost:9090/order/find-all", {
				withCredentials: true,
			})
			.then((response) => {
				setItems(response.data.orders);
				setIsLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<Layout>
			<h1>Orders Page</h1>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<OrdersList items={items}></OrdersList>
			)}
		</Layout>
	);
}
