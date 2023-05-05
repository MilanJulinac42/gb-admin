// components/TableItem.tsx
import Link from "next/link";
import Checkmark from "./Checkmark";

export default function TableItem({ item }: any) {
	return (
		<tr
			className="bg-white text-black border-b border-gray-200"
			key={item._id}
		>
			<td className="px-4 py-2">
				<img src={item.image} alt={item.name} className="h-12 w-auto" />
			</td>
			<td className="px-4 py-2">{item.name}</td>
			<td className="px-4 py-2">{item.description}</td>
			<td className="px-4 py-2">{item.price}</td>
			<td className="px-4 py-2">{item.color}</td>
			<td className="px-4 py-2 text-center">
				{item.isSerbian ? <Checkmark /> : null}
			</td>
			<td className="px-4 py-2">
				<div className="flex justify-center">
					<Link href={`/baskets/edit/\\${item._id}`}>
						<button className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2">
							Edit
						</button>
					</Link>
					<button className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
						Delete
					</button>
				</div>
			</td>
		</tr>
	);
}
