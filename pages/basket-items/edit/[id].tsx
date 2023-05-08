// basket-items/edit/[id].tsx
import BasketItem, { BasketItemProps } from "../BasketItem";
import { GetServerSideProps } from "next";
import axios from "axios";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const id = context.params?.id;
	const response = await axios.get(
		`http://localhost:9090/basket-item/find/${id}`
	);
	const existingBasketItemData = response.data.basketItem;
	return { props: { existingBasketItemData } };
};

const EditBasketItem = ({
	existingBasketItemData,
}: {
	existingBasketItemData: BasketItemProps["existingBasketItem"];
}) => <BasketItem mode="edit" existingBasketItem={existingBasketItemData} />;

export default EditBasketItem;
