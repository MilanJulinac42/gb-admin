// components/TableItem.tsx
import Link from "next/link";
import Checkmark from "./Checkmark";
import { useEffect, useState } from "react";
import { BasketType } from "../pages/baskets";
import { GiftBasket } from "../pages/gift-baskets";
import { BasketItem } from "../pages/basket-items";
import axios from "axios";

type TableItemProps = {
	item: BasketType | GiftBasket | BasketItem;
	type: "basketItem" | "basketType" | "giftBasket";
	onUpdate: () => void;
};

export default function TableItem({ item, type, onUpdate }: TableItemProps) {
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

	async function removeObject(id: string) {
		try {
			const response = await axios.patch(
				`${removeLink}/${id}`,
				{},
				{
					headers: {
						"Content-Type": "application/json",
					},
					withCredentials: true,
				}
			);

			const data = response.data;
			console.log("Item removed successfully:", data);
			onUpdate();
		} catch (error) {
			console.error("Error removing item:", error);
		}
	}

	async function restoreObject(id: string) {
		try {
			const response = await axios.patch(
				`${restoreLink}/${id}`,
				{},
				{
					headers: {
						"Content-Type": "application/json",
					},
					withCredentials: true,
				}
			);

			const data = response.data;
			console.log("Item restored successfully:", data);
			onUpdate();
		} catch (error) {
			console.error("Error restoring item:", error);
		}
	}

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
					{!item.deleted ? (
						<button
							onClick={() => removeObject(item._id)}
							className="btn-delete"
						>
							Delete
						</button>
					) : (
						<button
							onClick={() => restoreObject(item._id)}
							className="btn-primary"
						>
							Retore
						</button>
					)}
				</div>
			</td>
		</tr>
	);
}
