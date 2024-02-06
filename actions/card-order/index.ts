"use server";

import { UpdateCardOrderInputs } from "./types";
import { revalidatePath } from "next/cache";
import { updateCardOrder } from "@/lib/card-order-service";

export const onUpdateCardOrder = async (data: UpdateCardOrderInputs) => {
	try {
		const orderedCards = await updateCardOrder(data);

		if (orderedCards) revalidatePath(`board/${data.boardId}`);

		return orderedCards;
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
	}
};
