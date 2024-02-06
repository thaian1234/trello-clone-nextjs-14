import { createCardSchema } from "@/actions/card/schema";
import { CreateCardInputs } from "@/actions/card/type";
import { auth } from "@clerk/nextjs";
import { db } from "./db";

export const createCard = async (data: CreateCardInputs) => {
	const { orgId, userId } = auth();

	if (!orgId || !userId) throw new Error("Unauthorized");
	if (!createCardSchema.safeParse(data).success)
		throw new Error("Missing some field");

	const { title, listId } = data;

	const list = await db.list.findUnique({
		where: {
			id: listId,
			board: {
				orgId,
			},
		},
	});

	if (!list) throw new Error("List not found");

	const lastCard = await db.card.findFirst({
		where: {
			listId,
		},
		orderBy: { order: "desc" },
		select: { order: true },
	});
	const newOrder = lastCard ? lastCard.order + 1 : 1;

	const card = await db.card.create({
		data: {
			title,
			listId,
			order: newOrder,
		},
	});

	if (!card) throw new Error("Failed to create card");

	return card;
};
