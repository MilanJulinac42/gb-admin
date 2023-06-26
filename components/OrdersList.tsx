import { useEffect, useState } from "react";
import { OrderType, OrdersType, BasketsOrder } from "../pages/orders";
import axios from "axios";

type OrdersListProps = {
	items: OrdersType;
};

type OrderStatus = {};

export default function OrdersList({ items: initialItems }: OrdersListProps) {
	const [items, setItems] = useState(initialItems);
	console.log("Initial items:", initialItems);
	console.log("Items state:", items);

	async function changeOrderStatus(
		orderId: string,
		newStatus: OrderStatus,
		onSuccess: (updatedOrder: OrderType) => void
	) {
		try {
			const response = await axios.patch(
				`http://localhost:9090/order/change-order-status/${orderId}`,
				{ orderStatus: newStatus },
				{
					headers: {
						"Content-Type": "application/json",
					},
					withCredentials: true,
				}
			);

			const data = response.data;
			console.log("Order status updated successfully:", data);
			onSuccess(data.order);
		} catch (error) {
			console.error("Error updating order status:", error);
		}
	}

	function handleOrderStatusChange(updatedOrder: OrderType) {
		setItems((prevItems) =>
			prevItems.map((item) =>
				item._id === updatedOrder._id ? updatedOrder : item
			)
		);
		console.log("Items after update:", items);
	}

	useEffect(() => {
		setItems(initialItems);
	}, [initialItems]);

	return (
		<div>
			{items.map((item: OrderType) => (
				<div className="border border-blue-900 p-4 border-2 mb-4">
					<div className="grid grid-cols-4 gap-4 border-b border-blue-200">
						<p className="font-semibold text-blue-900">
							Email: {item.email}
						</p>
						<p className="font-semibold text-blue-900">
							Date: {item.createdAt}
						</p>
						<p className="font-semibold text-blue-900">
							Price: {item.totalPrice}
						</p>
						<p className="font-semibold text-blue-900">
							Status: {item.orderStatus}
						</p>
					</div>
					<div className="mt-4 grid grid-cols-4 gap-4">
						<div className="flex flex-col">
							<p className="font-semibold text-blue-900">
								User details:
							</p>
							<p>Name: {item.firstName + " " + item.lastName}</p>
							<p>Coutry: {item.country}</p>
							<p>City: {item.city}</p>
							<p>Street: {item.street}</p>
							<p>Zip: {item.zipCode}</p>
						</div>
						<div className="flex flex-col">
							<p className="font-semibold text-blue-900">
								Order baskets:
							</p>
							{item.baskets.map((item: BasketsOrder) => (
								<p>{item.basketId + " " + item.quantity}</p>
							))}
						</div>
						<div className="flex flex-col">
							<p className="font-semibold text-blue-900">
								Finance:
							</p>
							<p>Total price 3000</p>
							<p>Total profit 4000</p>
							<p>Payment type: {item.paymentType}</p>
						</div>
						<div className="flex flex-col">
							<p className="font-semibold text-blue-900">
								Edit status
							</p>
							<button
								className="btn-information"
								onClick={() =>
									changeOrderStatus(
										item._id,
										"PENDING",
										handleOrderStatusChange
									)
								}
							>
								PENDING
							</button>
							<button
								className="btn-edit mt-1"
								onClick={() =>
									changeOrderStatus(
										item._id,
										"SHIPPED",
										handleOrderStatusChange
									)
								}
							>
								SHIPPED
							</button>
							<button
								className="btn-primary mt-1"
								onClick={() =>
									changeOrderStatus(
										item._id,
										"DELIVERED",
										handleOrderStatusChange
									)
								}
							>
								DELIVERED
							</button>
							<button
								className="btn-delete mt-1"
								onClick={() =>
									changeOrderStatus(
										item._id,
										"CANCELLED",
										handleOrderStatusChange
									)
								}
							>
								CANCELLED
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
