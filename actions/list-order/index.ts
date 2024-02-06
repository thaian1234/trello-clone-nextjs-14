"use server";

import { updateListOrder } from "@/lib/list-order-service";
import { UpdateListOrderInputs } from "./types";
import { revalidatePath } from "next/cache";

export const onUpdateListOrder = async (data: UpdateListOrderInputs) => {
	try {
		const orderedLists = await updateListOrder(data);

		if (orderedLists) revalidatePath(`board/${data.boardId}`);

		return orderedLists;
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
	}
};
