import { BasketItem } from "../pages/basket-items";
import { BasketType } from "../pages/baskets";
import { GiftBasket } from "../pages/gift-baskets";
import TableItem from "./TableItem";

type ItemTableProps = {
	items: (GiftBasket | BasketType | BasketItem)[];
	type: "basketItem" | "basketType" | "giftBasket";
};

type ItemTableItem = GiftBasket | BasketType | BasketItem;

export default function ItemTable({ items, type }: ItemTableProps) {
	return (
		<table className="table-auto w-full">
			<thead className="bg-blue-900 text-white">
				<tr>
					{type === "giftBasket" && (
						<th className="px-4 py-2">Image</th>
					)}
					<th className="px-4 py-2">Name</th>
					<th className="px-4 py-2">Description</th>
					<th className="px-4 py-2">Price</th>
					{type === "basketType" && (
						<th className="px-4 py-2">Color</th>
					)}
					{type === "giftBasket" && (
						<>
							<th className="px-4 py-2">Profit</th>
							<th className="px-4 py-2">Sold</th>
							<th className="px-4 py-2">In stock</th>
							<th className="px-4 py-2">Type</th>
						</>
					)}
					<th className="px-4 py-2">Serbian</th>
					<th className="px-4 py-2">Actions</th>
				</tr>
			</thead>
			<tbody>
				{items.map((item: ItemTableItem) => (
					<TableItem type={type} item={item} key={item._id} />
				))}
			</tbody>
		</table>
	);
}
