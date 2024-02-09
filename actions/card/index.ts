"use server";

import {
	copyCard,
	createCard,
	deleteCard,
	updateCard,
} from "@/lib/card-service";
import {
	CopyCardInputs,
	CreateCardInputs,
	DeleteCardInputs,
	UpdateCardInputs,
} from "./type";
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

export const onCopyCard = async (data: CopyCardInputs) => {
	try {
		const copiedCard = await copyCard(data);

		if (copiedCard) revalidatePath(`board/${data.boardId}`);

		return copiedCard;
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
	}
};

export const onDeleteCard = async (data: DeleteCardInputs) => {
	try {
		const deletedCard = await deleteCard(data);

		if (deletedCard) revalidatePath(`board/${data.boardId}`);

		return deletedCard;
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
	}
};
