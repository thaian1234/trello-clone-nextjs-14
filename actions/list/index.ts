"use server";

import { createList } from "@/lib/list-service";
import { listFormInput } from "./schema";
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
