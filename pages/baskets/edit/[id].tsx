// baskets/edit/[id].tsx
import Basket, { BasketProps } from "../Basket";
import { GetServerSideProps } from "next";
import axios from "axios";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const id = context.params?.id;
	const response = await axios.get(
		`http://localhost:9090/basket-type/find\\${id}`
	);
	const existingBasketData = response.data.basketType;
	return { props: { existingBasketData } };
};

const EditBasket = ({
	existingBasketData,
}: {
	existingBasketData: BasketProps["existingBasket"];
}) => <Basket mode="edit" existingBasket={existingBasketData} />;

export default EditBasket;
