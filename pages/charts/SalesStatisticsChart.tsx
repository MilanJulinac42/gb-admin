import React, { useEffect, useRef } from "react";
import {
	Chart,
	BarController,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
} from "chart.js";

interface SalesData {
	totalSales: number;
	orderCount: number;
	averageOrderValue: number;
}

export default function SalesStatisticsChart() {
	const chartRef = useRef<HTMLCanvasElement | null>(null);
	const myChartRef = useRef<Chart | null>(null);

	Chart.register(
		BarController,
		CategoryScale,
		LinearScale,
		BarElement,
		Title
	);

	useEffect(() => {
		const fetchSalesData = async () => {
			const response = await fetch(
				"http://localhost:9090/chart/sales-statistics"
			);
			const data = await response.json();
			return data;
		};

		const createChart = (data: SalesData) => {
			if (!chartRef.current) {
				return null;
			}

			const ctx = chartRef.current.getContext("2d");

			if (ctx) {
				if (myChartRef.current) {
					myChartRef.current.destroy();
				}

				myChartRef.current = new Chart(ctx, {
					type: "bar",
					data: {
						labels: [
							"Total Sales",
							"Order Count",
							"Average Order Value",
						],
						datasets: [
							{
								label: "Sales Statistics",
								data: [
									data.totalSales,
									data.orderCount,
									data.averageOrderValue,
								],
								backgroundColor: [
									"rgba(255, 99, 132, 0.2)",
									"rgba(54, 162, 235, 0.2)",
									"rgba(255, 206, 86, 0.2)",
								],
								borderColor: [
									"rgba(255, 99, 132, 1)",
									"rgba(54, 162, 235, 1)",
									"rgba(255, 206, 86, 1)",
								],
								borderWidth: 1,
							},
						],
					},
				});
			}
		};

		const fetchAndCreateChart = async () => {
			const salesData = await fetchSalesData();
			createChart(salesData);
		};

		fetchAndCreateChart();
		return () => {
			if (myChartRef.current) {
				myChartRef.current.destroy();
			}
		};
	}, []);

	return <canvas ref={chartRef}></canvas>;
}
