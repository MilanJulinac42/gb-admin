import { useState } from "react";
import { BasketItem, GiftBasketItems, GiftBasketItem } from "./GiftBasket";

export type GiftBasketItemsProps = {
	existingGiftBasketItems: GiftBasketItems;
	changeQuantity: (e: any, itemId: string) => void;
	removeItem: (itemId: string) => void;
	addNewItemToBasketItems: (item: GiftBasketItem) => void;
	basketItems: BasketItem[] | null;
	totalItemCost: number;
};

export default function GiftBasketItemList({
	existingGiftBasketItems,
	addNewItemToBasketItems,
	changeQuantity,
	removeItem,
	basketItems,
	totalItemCost,
}: GiftBasketItemsProps) {
	const [newItem, setNewItem] = useState<BasketItem>({
		_id: "",
		name: "",
		price: 0,
	});
	const [newItemQuantity, setNewItemQuantity] = useState(0);

	const handleNewBasketItemChange = (e: any) => {
		const selectedId = e.target.value;
		const selectedItem = basketItems?.find(
			(item: BasketItem) => item._id === selectedId
		);

		if (selectedItem) {
			setNewItem({
				_id: selectedItem._id,
				name: selectedItem.name,
				price: selectedItem.price,
			});
		} else {
			setNewItem({ _id: "", name: "", price: 0 });
		}
	};

	const generateUniqueId = () => {
		return "_" + Math.random().toString(36).substr(2, 9);
	};

	return (
		<ul className="list-none mb-2 border-4 border-blue-300 p-4">
			<div className="flex justify-between">
				<h1>Basket items list:</h1>
				<span className="text-blue-900 font-bold mr-4 text-lg">
					Total item cost: {totalItemCost}
				</span>
			</div>
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
								<input
									className="font-semibold text-blue-900 mr-3 w-40 mt-2"
									type="number"
									value={giftBasketItem.quantity}
									onChange={(e) =>
										changeQuantity(e, giftBasketItem._id)
									}
								/>
								<span className="font-semibold text-blue-900 mr-3">
									cost:
								</span>
								<span className="font-semibold text-blue-900 mr-3">
									{giftBasketItem.item.price *
										giftBasketItem.quantity}
								</span>
								<button
									type="button"
									className="btn-delete px-2 py-1 rounded"
									onClick={() =>
										removeItem(giftBasketItem._id)
									}
								>
									X
								</button>
							</div>
						</div>
					</li>
				))}

			<hr className="bg-green-600 h-2 mt-2" />

			<div className="bg-white rounded mt-2">
				<h3>Select new basket item and insert quantity</h3>
				<select
					name="basketItem"
					id="basketItem"
					value={newItem?._id || ""}
					onChange={(e) => handleNewBasketItemChange(e)}
				>
					<option value="">Select a new basket item</option>
					{basketItems?.map((basketItem: BasketItem) => (
						<option key={basketItem._id} value={basketItem._id}>
							{basketItem.name}
						</option>
					))}
				</select>
				<input
					id="quantity"
					name="quantity"
					type="number"
					placeholder="quantity"
					value={newItemQuantity}
					onChange={(e) =>
						setNewItemQuantity(parseInt(e.target.value))
					}
				/>
				<button
					className="btn-edit"
					type="button"
					disabled={
						!basketItems ||
						basketItems.length === 0 ||
						newItem._id === "" ||
						newItemQuantity === 0
					}
					onClick={() => {
						addNewItemToBasketItems({
							_id: generateUniqueId(),
							item: newItem,
							quantity: newItemQuantity,
						});
						setNewItem({ _id: "", name: "", price: 0 });
						setNewItemQuantity(0);
					}}
				>
					add new item
				</button>
			</div>
		</ul>
	);
}
