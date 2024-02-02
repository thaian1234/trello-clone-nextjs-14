"use server";

import { createBoard, deleteBoard } from "@/lib/board-service";
import { revalidatePath } from "next/cache";

export const onCreateBoard = async (title: string, image: string) => {
	try {
		const board = await createBoard(title, image);

		if (board) revalidatePath(`/organization/${board.orgId}`);

		return board;
	} catch (error) {
		throw new Error("Interal Error");
	}
};

export const onDeleteBoard = async (id: string) => {
	try {
		const deletedBoard = await deleteBoard(id);

		revalidatePath("/");

		return deletedBoard;
	} catch (error) {
		throw new Error("Interal Error");
	}
};
