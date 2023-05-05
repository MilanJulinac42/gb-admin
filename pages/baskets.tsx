import Link from "next/link";
import Layout from "../components/Layout";

export default function Baskets() {
	return (
		<Layout>
			<Link href={"/baskets/new"} className="btn-primary">
				Baskets page
			</Link>
		</Layout>
	);
}
