"use server";

import { createCard } from "@/lib/card-service";
import { CreateCardInputs } from "./type";
import { revalidatePath } from "next/cache";

export const onCreateCard = async (data: CreateCardInputs) => {
	try {
		const createdCard = await createCard(data);

		if (createdCard) revalidatePath(`/board/${data.boardId}`);

		return createdCard;
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
	}
};
