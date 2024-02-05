"use server";

import {
	copyList,
	createList,
	deleteList,
	updateList,
} from "@/lib/list-service";
import {
	listFormCopyInput,
	listFormDeleteInput,
	listFormInput,
	listFormUpdateInput,
} from "./schema";
import { revalidatePath } from "next/cache";

export const onCreateList = async (data: listFormInput) => {
	try {
		const createdList = await createList(data);

		if (createdList) revalidatePath(`board/${data.boardId}`);

		return createdList;
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
	}
};

export const onUpdateList = async (data: listFormUpdateInput) => {
	try {
		const updatedList = await updateList(data);

		if (updatedList) revalidatePath(`board/${data.boardId}`);

		return updatedList;
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
	}
};

export const onDeleteList = async (data: listFormDeleteInput) => {
	try {
		const deletedList = await deleteList(data);

		if (deletedList) revalidatePath(`board/${data.boardId}`);

		return deletedList;
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
	}
};

export const onCopyList = async (data: listFormCopyInput) => {
	try {
		const copiedList = await copyList(data);

		if (copiedList) revalidatePath(`board/${data.boardId}`);

		return copiedList;
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
	}
};
