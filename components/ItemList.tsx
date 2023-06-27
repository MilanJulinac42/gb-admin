import { useState } from "react";
import { BasketItem } from "../pages/basket-items";
import { BasketType } from "../pages/baskets";
import { GiftBasket } from "../pages/gift-baskets";
import TableItem from "./TableItem";

type ItemTableProps = {
	items: (GiftBasket | BasketType | BasketItem)[];
	type: "basketItem" | "basketType" | "giftBasket";
	onUpdate: () => void;
};

type ItemTableItem = GiftBasket | BasketType | BasketItem;

export default function ItemTable({ items, type, onUpdate }: ItemTableProps) {
	const [sortField, setSortField] = useState("");
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

	const handleSort = (field: string) => {
		if (sortField === field) {
			setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
			setSortField(field);
			setSortOrder("asc");
		}
	};

	const sortedItems = [...items];

	if (sortField === "price") {
		sortedItems.sort((a, b) => {
			if (sortOrder === "asc") {
				return a.price - b.price;
			} else {
				return b.price - a.price;
			}
		});
	} else if (sortField === "name") {
		sortedItems.sort((a, b) => {
			const nameA = a.name.toLowerCase();
			const nameB = b.name.toLowerCase();

			if (sortOrder === "asc") {
				if (nameA < nameB) return -1;
				if (nameA > nameB) return 1;
				return 0;
			} else {
				if (nameA > nameB) return -1;
				if (nameA < nameB) return 1;
				return 0;
			}
		});
	} else if (sortField === "profit") {
		sortedItems.sort((a, b) => {
			const profitA = (a as GiftBasket).profit || 0;
			const profitB = (b as GiftBasket).profit || 0;

			if (sortOrder === "asc") {
				return profitA - profitB;
			} else {
				return profitB - profitA;
			}
		});
	} else if (sortField === "sold") {
		sortedItems.sort((a, b) => {
			const soldA = (a as GiftBasket).sold || 0;
			const soldB = (b as GiftBasket).sold || 0;

			if (sortOrder === "asc") {
				return soldA - soldB;
			} else {
				return soldB - soldA;
			}
		});
	} else if (sortField === "inStock") {
		sortedItems.sort((a, b) => {
			const inStockA = (a as GiftBasket).inStock || 0;
			const inStockB = (b as GiftBasket).inStock || 0;

			if (sortOrder === "asc") {
				return inStockA - inStockB;
			} else {
				return inStockB - inStockA;
			}
		});
	}

	const getSortIndicator = (field: string) => {
		if (sortField === field) {
			return (
				<span className="sort-indicator">
					{sortOrder === "asc" ? "⌃" : "⌄"}
				</span>
			);
		}
		return null;
	};

	return (
		<table className="table-auto w-full">
			<thead className="bg-blue-900 text-white">
				<tr>
					{type === "giftBasket" && (
						<th className="px-4 py-2">Image</th>
					)}
					<th
						className="px-4 py-2 cursor-pointer"
						onClick={() => handleSort("name")}
					>
						Name {getSortIndicator("name")}
					</th>
					<th className="px-4 py-2">Description</th>
					<th
						className="px-4 py-2 cursor-pointer"
						onClick={() => handleSort("price")}
					>
						Price {getSortIndicator("price")}
					</th>
					{type === "basketType" && (
						<th className="px-4 py-2">Color</th>
					)}
					{type === "giftBasket" && (
						<>
							<th
								className="px-4 py-2 cursor-pointer"
								onClick={() => handleSort("profit")}
							>
								Profit {getSortIndicator("profit")}
							</th>
							<th
								className="px-4 py-2 cursor-pointer"
								onClick={() => handleSort("sold")}
							>
								Sold {getSortIndicator("sold")}
							</th>
							<th
								className="px-4 py-2 cursor-pointer"
								onClick={() => handleSort("inStock")}
							>
								In stock {getSortIndicator("inStock")}
							</th>
							<th className="px-4 py-2">Type</th>
						</>
					)}
					<th className="px-4 py-2">Serbian</th>
					<th className="px-4 py-2">Actions</th>
				</tr>
			</thead>
			<tbody>
				{sortedItems.map((item: ItemTableItem) => (
					<TableItem
						onUpdate={onUpdate}
						type={type}
						item={item}
						key={item._id}
					/>
				))}
			</tbody>
		</table>
	);
}
