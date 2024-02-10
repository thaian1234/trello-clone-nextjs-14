"use server";

import { createBoard, deleteBoard, updateBoard } from "@/lib/board-service";
import { revalidatePath } from "next/cache";

export const onCreateBoard = async (title: string, image: string) => {
	try {
		const board = await createBoard(title, image);

		if (board) revalidatePath(`/organization/${board.orgId}`);

		return board;
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
	}
};

export const onUpdateBoard = async (id: string, title: string) => {
	try {
		const updatedBoard = await updateBoard(id, title);

		if (updatedBoard) revalidatePath(`/board/${id}`);

		return updatedBoard;
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
	}
};

export const onDeleteBoard = async (id: string) => {
	try {
		const deletedBoard = await deleteBoard(id);

		if (deletedBoard) revalidatePath(`/organization/${deletedBoard.orgId}`);

		return deletedBoard;
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
	}
};
