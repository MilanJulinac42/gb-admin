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
	const [nameFilter, setNameFilter] = useState("");
	const [fromPriceFilter, setFromPriceFilter] = useState("");
	const [toPriceFilter, setToPriceFilter] = useState("");
	const [shouldFetchData, setShouldFetchData] = useState(false);

	const fetchData = async () => {
		try {
			const response = await axios.get(
				"http://localhost:9090/basket-item/find-all",
				{
					params: {
						page,
						limit,
						name: nameFilter,
						priceFrom: fromPriceFilter,
						priceTo: toPriceFilter,
					},
				}
			);
			setItems(response.data.basketItems.basketItems);
			setTotalPages(Math.ceil(response.data.basketItems.total / 10));
			setIsLoading(false);
			setShouldFetchData(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (shouldFetchData) {
			fetchData();
		}
	}, [shouldFetchData]);

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
				<Link href={`/basket-items?page=${i}&limit=${limit}`} key={i}>
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

	const applyFilers = () => {
		setShouldFetchData(true);
		setPage(1);
	};

	const clearFilters = () => {
		setNameFilter("");
		setFromPriceFilter("");
		setToPriceFilter("");
		setShouldFetchData(true);
		setPage(1);
	};

	return (
		<Layout>
			<h1>Basket Page</h1>
			<Link href={"/basket-items/BasketItem"}>Add new basket item</Link>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<>
					<div className="filters text-white p-4 mt-2 mb-2 rounded border border-blue-900 border-1 ">
						<div className="grid grid-cols-2 gap-4">
							<div className="flex flex-col gap-2">
								<label htmlFor="nameFilter">Name filter</label>
								<input
									type="text"
									id="nameFilter"
									className="p-2 rounded bg-white text-black"
									value={nameFilter}
									onChange={(e) =>
										setNameFilter(e.target.value)
									}
								/>
							</div>

							<div className="flex flex-col gap-2">
								<label>Price filter</label>
								<div className="flex gap-4">
									<div className="flex flex-col gap-2">
										<label
											htmlFor="fromPriceFilter"
											className="text-sm"
										>
											From
										</label>
										<input
											type="text"
											id="fromPriceFilter"
											className="p-2 rounded bg-white text-black w-20"
											value={fromPriceFilter}
											onChange={(e) =>
												setFromPriceFilter(
													e.target.value
												)
											}
										/>
									</div>
									<div className="flex flex-col gap-2">
										<label
											htmlFor="toPriceFilter"
											className="text-sm"
										>
											To
										</label>
										<input
											type="text"
											id="toPriceFilter"
											className="p-2 rounded bg-white text-black w-20"
											value={toPriceFilter}
											onChange={(e) =>
												setToPriceFilter(e.target.value)
											}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="text-center mt-4">
							<button
								className="bg-white text-blue-900 px-4 py-2 rounded"
								onClick={applyFilers}
							>
								Apply Filters
							</button>
							<button
								className="bg-white text-blue-900 px-4 py-2 rounded ml-4"
								onClick={clearFilters}
							>
								Clear Filters
							</button>
						</div>
					</div>

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
