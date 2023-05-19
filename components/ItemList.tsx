import TableItem from "./TableItem";

export default function ItemTable({ items, type }: any) {
	return (
		<table className="table-auto w-full">
			<thead className="bg-blue-900 text-white">
				<tr>
					{type !== "basketItem" && (
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
				{items.map((item: any) => (
					<TableItem type={type} item={item}></TableItem>
				))}
			</tbody>
		</table>
	);
}
