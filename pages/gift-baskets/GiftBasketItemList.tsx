import { useState } from "react";

interface Item {
	_id: string;
	name: string;
	description: string;
	price: number;
}

interface GiftBasketItem {
	item: Item;
	quantity: number;
	_id: string;
}

export interface GiftBasketItemsProps {
	existingGiftBasketItems: GiftBasketItem[];
	increaseQuantity: (itemId: string) => void;
	decreaseQuantity: (itemId: string) => void;
	addNewItemToBasketItems: any;
	basketItems: any;
}

export default function GiftBasketItemList({
	existingGiftBasketItems,
	addNewItemToBasketItems,
	increaseQuantity,
	decreaseQuantity,
	basketItems,
}: GiftBasketItemsProps) {
	const [newItem, setNewItem] = useState({ _id: "", name: "" });
	const [newItemQuantity, setNewItemQuantity] = useState(0);

	const handleNewBasketItemChange = (e: any) => {
		const selectedId = e.target.value;
		const selectedItem = basketItems.find(
			(item: any) => item._id === selectedId
		);

		if (selectedItem) {
			setNewItem({ _id: selectedItem._id, name: selectedItem.name });
		} else {
			setNewItem({ _id: "", name: "" });
		}
	};

	return (
		<ul className="list-none mb-2">
			{existingGiftBasketItems &&
				existingGiftBasketItems.map((giftBasketItem) => (
					<li
						key={giftBasketItem._id}
						className="px-4 py-2 border mt-2"
					>
						<div className="flex justify-between items-center">
							<span className="font-semibold text-blue-900">
								{giftBasketItem.item.name}
							</span>
							<div className="flex items-center">
								<span className="font-medium text-gray-500 mr-2">
									Quantity:{" "}
								</span>
								<span className="font-semibold text-blue-900 mr-3">
									{giftBasketItem.quantity}
								</span>
								<button
									type="button"
									className="btn-primary px-2 py-1 rounded"
									onClick={() =>
										increaseQuantity(giftBasketItem._id)
									}
								>
									+
								</button>
								<button
									type="button"
									className="btn-delete px-2 py-1 rounded"
									onClick={() =>
										decreaseQuantity(giftBasketItem._id)
									}
								>
									-
								</button>
							</div>
						</div>
					</li>
				))}

			<label htmlFor="basketItem">Basket Item</label>
			<select
				name="basketItem"
				id="basketItem"
				value={newItem._id || ""}
				onChange={(e) => handleNewBasketItemChange(e)}
			>
				<option value="">Select a basket type</option>
				{basketItems?.map((basketItem: any) => (
					<option key={basketItem._id} value={basketItem._id}>
						{basketItem.name}
					</option>
				))}
			</select>

			<label htmlFor="quantity">Basket item quantity</label>
			<input
				id="quantity"
				name="quantity"
				type="number"
				placeholder="quantity"
				value={newItemQuantity}
				onChange={(e) => setNewItemQuantity(parseInt(e.target.value))}
			/>
			<button
				type="button"
				onClick={() =>
					addNewItemToBasketItems({
						item: newItem,
						quantity: newItemQuantity,
					})
				}
			>
				add new item
			</button>
		</ul>
	);
}
