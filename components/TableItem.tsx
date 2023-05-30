// components/TableItem.tsx
import Link from "next/link";
import Checkmark from "./Checkmark";
import { useEffect, useState } from "react";
import { GiftBasket } from "../pages/gift-baskets";
import { BasketType } from "../pages/baskets";
import { BasketItem } from "../pages/basket-items";

export type ItemTableProps = {
	item: GiftBasket | BasketType | BasketItem;
	type: string;
};

export default function TableItem({ item, type }: any) {
	const [hrefValue, setHrefValue] = useState("");

	useEffect(() => {
		if (type === "giftBasket") {
			setHrefValue("gift-baskets");
		} else if (type === "basketItem") {
			setHrefValue("basket-items");
		} else {
			setHrefValue("baskets");
		}
	}, []);

	return (
		<tr
			className="bg-white text-black border-b border-gray-200 text-center"
			key={item._id}
		>
			{type !== "basketItem" && (
				<td className="px-4 py-2">
					<img
						src={item.imageUrl}
						alt={item.name}
						className="h-12 w-auto"
					/>
				</td>
			)}
			<td className="px-4 py-2">{item.name}</td>
			<td className="px-4 py-2">{item.description}</td>
			<td className="px-4 py-2">{item.price}</td>
			{type === "basketType" && (
				<td className="px-4 py-2">{item.color}</td>
			)}
			{type === "giftBasket" && (
				<>
					<td className="px-4 py-2">{item.profit}</td>
					<td className="px-4 py-2">{item.sold}</td>
					<td className="px-4 py-2">{item.inStock}</td>
					<td className="px-4 py-2">{item.type}</td>
				</>
			)}
			<td className="px-4 py-2 text-center">
				{item.isSerbian ? <Checkmark /> : null}
			</td>
			<td className="px-4 py-2">
				<div className="flex justify-center">
					<Link href={`/${hrefValue}/edit/${item._id}`}>
						<button className="btn-edit">Edit</button>
					</Link>
					<button className="btn-delete">Delete</button>
				</div>
			</td>
		</tr>
	);
}
