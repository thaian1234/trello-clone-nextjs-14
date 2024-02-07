"use server";

import { createCard, updateCard } from "@/lib/card-service";
import { CreateCardInputs, UpdateCardInputs } from "./type";
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

export const onUpdateCard = async (data: UpdateCardInputs) => {
	try {
		const updatedCard = await updateCard(data);

		if (updatedCard) revalidatePath(`board/${data.boardId}`);

		return updatedCard;
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
	}
};
