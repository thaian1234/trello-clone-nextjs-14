import { db } from "./db";

import { auth } from "@clerk/nextjs";
import {
	listFormCopyInput,
	listFormCopySchema,
	listFormDeleteInput,
	listFormDeleteSchema,
	listFormInput,
	listFormSchema,
	listFormUpdateInput,
	listFormUpdateSchema,
} from "@/actions/list/schema";

export const createList = async (data: listFormInput) => {
	const { orgId, userId } = auth();

	if (!orgId || !userId) throw new Error("Unauthorized");

	if (!listFormSchema.safeParse(data).success)
		throw new Error("Missing some fields");

	const board = await db.board.findUnique({
		where: {
			id: data.boardId,
			orgId,
		},
	});

	if (!board) throw new Error("Board not found");

	const lastList = await db.list.findFirst({
		where: {
			boardId: data.boardId,
		},
		orderBy: { order: "desc" },
		select: { order: true },
	});
	const newOrder = lastList ? lastList.order + 1 : 1;

	const createdList = await db.list.create({
		data: {
			title: data.title,
			boardId: data.boardId,
			order: newOrder,
		},
	});

	if (!createdList) throw new Error("Failed to create list");

	return createdList;
};

export const updateList = async (data: listFormUpdateInput) => {
	const { orgId, userId } = auth();

	if (!orgId || !userId) throw new Error("Unauthorized");

	if (!listFormUpdateSchema.safeParse(data).success)
		throw new Error("Missing some fields");

	const updatedList = await db.list.update({
		where: {
			id: data.id,
			boardId: data.boardId,
			board: {
				orgId,
			},
		},
		data: {
			title: data.title,
		},
	});

	if (!updatedList) throw new Error("Failed to update list");

	return updatedList;
};

export const deleteList = async (data: listFormDeleteInput) => {
	const { orgId, userId } = auth();

	if (!orgId || !userId) throw new Error("Unauthorized");

	if (!listFormDeleteSchema.safeParse(data).success)
		throw new Error("Missing some fields");

	const deletedList = await db.list.delete({
		where: {
			id: data.id,
			boardId: data.boardId,
			board: {
				orgId,
			},
		},
	});

	if (!deletedList) throw new Error("Failed to delete list");

	return deletedList;
};

export const copyList = async (data: listFormCopyInput) => {
	const { orgId, userId } = auth();

	if (!orgId || !userId) throw new Error("Unauthorized");

	if (!listFormCopySchema.safeParse(data).success)
		throw new Error("Missing some fields");

	const listToCopy = await db.list.findUnique({
		where: {
			id: data.id,
			boardId: data.boardId,
			board: {
				orgId,
			},
		},
		include: {
			cards: true,
		},
	});

	if (!listToCopy) throw new Error("List not found");

	const lastList = await db.list.findFirst({
		where: {
			boardId: data.boardId,
		},
		orderBy: { order: "desc" },
		select: { order: true },
	});

	const newOrder = lastList ? lastList.order + 1 : 1;

	const copiedList = await db.list.create({
		data: {
			boardId: listToCopy.boardId,
			title: `${listToCopy.title} - Copy`,
			order: newOrder,
			cards: {
				createMany: {
					data: listToCopy.cards.map((card) => ({
						title: card.title,
						description: card.description,
						order: card.order,
					})),
				},
			},
		},
		include: {
			cards: true,
		},
	});

	if (!copiedList) throw new Error("Failed to copy list");

	return copiedList;
};
