import { db } from "./db";

import { auth } from "@clerk/nextjs";
import { listFormInput } from "@/actions/list/schema";

export const createList = async (data: listFormInput) => {
	const { orgId, userId } = auth();

	if (!orgId || !userId) throw new Error("Unauthorized");
	if (!data) throw new Error("Missing some field");

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
