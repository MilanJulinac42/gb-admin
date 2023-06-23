// gift-baskets.tsx
import Link from "next/link";
import Layout from "../components/Layout";
import ItemList from "../components/ItemList";
import axios from "axios";
import { useEffect, useState } from "react";

type GiftBasketItem = {
	item: {
		_id: string;
		name: string;
		description: string;
		price: number;
	};
	quantity: number;
	_id: string;
};

type BasketType = {
	_id: string;
	name: string;
};

export type GiftBasket = {
	_id: string;
	name: string;
	description: string;
	price: number;
	profit: number;
	inStock: number;
	sold: number;
	totalProfit: number;
	liked: number;
	type: string;
	giftBasketItems: GiftBasketItem[];
	basketType: BasketType;
	isSerbian: boolean;
	imageUrl: string;
	deleted: boolean;
	createdAt: string;
	updatedAt: string;
	__v: number;
};

export default function GiftBaskets() {
	const [items, setItems] = useState<GiftBasket[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [totalPages, setTotalPages] = useState(0);
	const [nameFilter, setNameFilter] = useState("");
	const [typeFilter, setTypeFilter] = useState("");
	const [fromPriceFilter, setFromPriceFilter] = useState("");
	const [toPriceFilter, setToPriceFilter] = useState("");
	const [fromProfitFilter, setFromProfitFilter] = useState("");
	const [toProfitFilter, setToProfitFilter] = useState("");
	const [fromInStockFilter, setFromInStockFilter] = useState("");
	const [toInStockFilter, setToInStockFilter] = useState("");
	const [fromSoldFilter, setFromSoldFilter] = useState("");
	const [toSoldFilter, setToSoldFilter] = useState("");
	const [shouldFetchData, setShouldFetchData] = useState(false);

	const fetchData = async () => {
		try {
			const response = await axios.get(
				"http://localhost:9090/gift-basket/find-all",
				{
					params: {
						page,
						limit,
						name: nameFilter,
						priceFrom: fromPriceFilter,
						priceTo: toPriceFilter,
						profitFrom: fromProfitFilter,
						profitTo: toProfitFilter,
						type: typeFilter,
						inStockFrom: fromInStockFilter,
						inStockTo: toInStockFilter,
						soldFrom: fromSoldFilter,
						soldTo: toSoldFilter,
					},
				}
			);
			setItems(response.data.baskets.baskets);
			setTotalPages(Math.ceil(response.data.baskets.total / 10));
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

	const applyFilers = () => {
		setShouldFetchData(true);
		setPage(1);
	};

	const clearFilters = () => {
		setNameFilter("");
		setTypeFilter("");
		setFromPriceFilter("");
		setToPriceFilter("");
		setToProfitFilter("");
		setFromProfitFilter("");
		setShouldFetchData(true);
		setFromInStockFilter("");
		setToInStockFilter("");
		setFromSoldFilter("");
		setToSoldFilter("");
		setPage(1);
	};

	return (
		<Layout>
			<h1>Basket Page</h1>
			<Link href={"/gift-baskets/GiftBasket"}>Add new gift basket</Link>
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
								<label htmlFor="typeFilter">Type filter</label>
								<input
									type="text"
									id="typeFilter"
									className="p-2 rounded bg-white text-black"
									value={typeFilter}
									onChange={(e) =>
										setTypeFilter(e.target.value)
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

							<div className="flex flex-col gap-2">
								<label>Profit filter</label>
								<div className="flex gap-4">
									<div className="flex flex-col gap-2">
										<label
											htmlFor="fromProfitFilter"
											className="text-sm"
										>
											From
										</label>
										<input
											type="text"
											id="fromProfitFilter"
											className="p-2 rounded bg-white text-black w-20"
											value={fromProfitFilter}
											onChange={(e) =>
												setFromProfitFilter(
													e.target.value
												)
											}
										/>
									</div>
									<div className="flex flex-col gap-2">
										<label
											htmlFor="toProfitFilter"
											className="text-sm"
										>
											To
										</label>
										<input
											type="text"
											id="toProfitFilter"
											className="p-2 rounded bg-white text-black w-20"
											value={toProfitFilter}
											onChange={(e) =>
												setToProfitFilter(
													e.target.value
												)
											}
										/>
									</div>
								</div>
							</div>

							<div className="flex flex-col gap-2">
								<label>Sold filter</label>
								<div className="flex gap-4">
									<div className="flex flex-col gap-2">
										<label
											htmlFor="fromSoldFilter"
											className="text-sm"
										>
											From
										</label>
										<input
											type="text"
											id="fromSoldFilter"
											className="p-2 rounded bg-white text-black w-20"
											value={fromSoldFilter}
											onChange={(e) =>
												setFromSoldFilter(
													e.target.value
												)
											}
										/>
									</div>
									<div className="flex flex-col gap-2">
										<label
											htmlFor="toSoldFilter"
											className="text-sm"
										>
											To
										</label>
										<input
											type="text"
											id="toSoldFilter"
											className="p-2 rounded bg-white text-black w-20"
											value={toSoldFilter}
											onChange={(e) =>
												setToSoldFilter(e.target.value)
											}
										/>
									</div>
								</div>
							</div>

							<div className="flex flex-col gap-2">
								<label>Stock filter</label>
								<div className="flex gap-4">
									<div className="flex flex-col gap-2">
										<label
											htmlFor="fromInStockFilter"
											className="text-sm"
										>
											From
										</label>
										<input
											type="text"
											id="fromInStockFilter"
											className="p-2 rounded bg-white text-black w-20"
											value={fromInStockFilter}
											onChange={(e) =>
												setFromInStockFilter(
													e.target.value
												)
											}
										/>
									</div>
									<div className="flex flex-col gap-2">
										<label
											htmlFor="toInStockFilter"
											className="text-sm"
										>
											To
										</label>
										<input
											type="text"
											id="toInStockFilter"
											className="p-2 rounded bg-white text-black w-20"
											value={toInStockFilter}
											onChange={(e) =>
												setToInStockFilter(
													e.target.value
												)
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

					<ItemList items={items} type={"giftBasket"}></ItemList>
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
