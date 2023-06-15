// basket-items.tsx
import Link from "next/link";
import Layout from "../components/Layout";
import ItemList from "../components/ItemList";
import axios from "axios";
import { useEffect, useState } from "react";

export type BasketItem = {
	_id: string;
	name: string;
	description: string;
	price: number;
	weight: number;
	giftBasket: string[];
	isSerbian: boolean;
	deleted: boolean;
	__v: number;
	createdAt?: string;
	updatedAt?: string;
};

export default function Baskets() {
	const [items, setItems] = useState<BasketItem[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [totalPages, setTotalPages] = useState(0);

	const fetchData = async () => {
		try {
			const response = await axios.get(
				"http://localhost:9090/basket-item/find-all",
				{
					params: {
						page,
						limit,
					},
				}
			);
			setItems(response.data.basketItems.basketItems);
			setTotalPages(Math.ceil(response.data.basketItems.total / 10));
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [page, limit]);

	const handlePageClick = (pageNumber: number) => {
		setPage(pageNumber);
	};

	const nextPage = () => {
		setPage(page + 1);
	};

	const previousPage = () => {
		if (page > 1) {
			setPage(page - 1);
		}
	};

	const renderPagination = () => {
		const paginationLinks = [];

		for (let i = 1; i <= totalPages; i++) {
			paginationLinks.push(
				<Link href={`/gift-baskets?page=${i}&limit=${limit}`} key={i}>
					<span
						className={
							page === i ? "text-blue-800 font-bold" : "text-gray"
						}
						onClick={() => handlePageClick(i)}
					>
						{i}
					</span>
				</Link>
			);
		}

		return paginationLinks;
	};

	return (
		<Layout>
			<h1>Basket Page</h1>
			<Link href={"/basket-items/BasketItem"}>Add new basket item</Link>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<>
					<ItemList type={"basketItem"} items={items}></ItemList>
					<div className="flex justify-end gap-3 mt-2 items-center">
						<button
							className="bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded disabled:bg-gray-300"
							onClick={previousPage}
							disabled={page === 1}
						>
							Previous Page
						</button>
						{renderPagination()}
						<button
							className="bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded disabled:bg-gray-300"
							onClick={nextPage}
							disabled={page === totalPages}
						>
							Next Page
						</button>
					</div>
				</>
			)}
		</Layout>
	);
}
