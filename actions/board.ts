"use server";

import { createBoard, deleteBoard, updateBoard } from "@/lib/board-service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const onCreateBoard = async (title: string, image: string) => {
	try {
		const board = await createBoard(title, image);

		if (board) revalidatePath(`/organization/${board.orgId}`);

		return board;
	} catch (error) {
		throw new Error("Interal Error");
	}
};

export const onUpdateBoard = async (id: string, title: string) => {
	try {
		const updatedBoard = await updateBoard(id, title);

		if (updatedBoard) revalidatePath(`/board/${id}`);

		return updatedBoard;
	} catch (error) {
		throw new Error("Interal Error");
	}
};

export const onDeleteBoard = async (id: string) => {
	try {
		const deletedBoard = await deleteBoard(id);

		if (deletedBoard) revalidatePath(`/organization/${deletedBoard.orgId}`);

		return deletedBoard;
	} catch (error) {
		throw new Error("Interal Error");
	}
};
