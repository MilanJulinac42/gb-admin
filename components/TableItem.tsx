// components/TableItem.tsx
import Link from "next/link";
import Checkmark from "./Checkmark";
import { useEffect, useState } from "react";
import { BasketType } from "../pages/baskets";
import { GiftBasket } from "../pages/gift-baskets";
import { BasketItem } from "../pages/basket-items";

type TableItemProps = {
	item: BasketType | GiftBasket | BasketItem;
	type: "basketItem" | "basketType" | "giftBasket";
};

export default function TableItem({ item, type }: TableItemProps) {
	const [hrefValue, setHrefValue] = useState("");
	const [removeLink, setRemoveLink] = useState("");
	const [restoreLink, setRestoreLink] = useState("");

	useEffect(() => {
		if (type === "giftBasket") {
			setHrefValue("gift-baskets");
			setRemoveLink("http://localhost:9090/gift-basket/remove");
			setRestoreLink("http://localhost:9090/gift-basket/restore");
		} else if (type === "basketItem") {
			setHrefValue("basket-items");
			setRemoveLink("http://localhost:9090/basket-item/remove");
			setRestoreLink("http://localhost:9090/basket-item/restore");
		} else {
			setHrefValue("baskets");
			setRemoveLink("http://localhost:9090/basket-type/remove");
			setRestoreLink("http://localhost:9090/basket-type/restore");
		}
	}, []);

	return (
		<tr
			className="bg-white text-black border-b border-gray-200 text-center"
			key={item._id}
		>
			{type !== "basketItem" && "imageUrl" in item && (
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
			{type === "basketType" && "color" in item && (
				<td className="px-4 py-2">{item.color}</td>
			)}
			{type === "giftBasket" && "profit" in item && (
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
				<div className="flex justify-center gap-1">
					<Link href={`/${hrefValue}/edit/${item._id}`}>
						<button className="btn-edit">Edit</button>
					</Link>
					<button className="btn-delete">Delete</button>
				</div>
			</td>
		</tr>
	);
}
