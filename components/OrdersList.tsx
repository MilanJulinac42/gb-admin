import { OrderType, OrdersType, BasketsOrder } from "../pages/orders";

type OrdersListProps = {
	items: OrdersType;
};

export default function OrdersList({ items }: OrdersListProps) {
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
							<button className="btn-information">PENDING</button>
							<button className="btn-edit mt-1">SHIPPED</button>
							<button className="btn-primary mt-1">
								DELIVERED
							</button>
							<button className="btn-delete mt-1">
								CANCELLED
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
