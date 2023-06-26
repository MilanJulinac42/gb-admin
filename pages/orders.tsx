import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import OrdersList from "../components/OrdersList";

export type BasketsOrder = {
	quantity: number;
	_id: string;
	basketId: string;
	basketName: string;
};

export type OrderType = {
	_id: string;
	email: string;
	firstName: string;
	lastName: string;
	baskets: BasketsOrder[];
	totalPrice: number;
	orderStatus: string;
	paymentType: string;
	street: string;
	city: string;
	zipCode: string;
	country: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
};

export type OrdersType = OrderType[];

export default function Orders() {
	const [items, setItems] = useState<OrdersType>([]);
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
