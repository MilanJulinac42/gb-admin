// baskets/edit/[id].tsx
import GiftBakset, { GiftBasketProps } from "../GiftBasket";
import { GetServerSideProps } from "next";
import axios from "axios";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const id = context.params?.id;
	const response = await axios.get(
		`http://localhost:9090/gift-basket/find/${id}`
	);
	const existingGiftBasketData = response.data.basket;
	return { props: { existingGiftBasketData } };
};

const EditGiftBasket = ({
	existingGiftBasketData,
}: {
	existingGiftBasketData: GiftBasketProps["existingGiftBasket"];
}) => <GiftBakset mode="edit" existingGiftBasket={existingGiftBasketData} />;

export default EditGiftBasket;
