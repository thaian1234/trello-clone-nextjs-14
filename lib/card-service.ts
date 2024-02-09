import {
	copyCardSchema,
	createCardSchema,
	deleteCardSchema,
	updateCardSchema,
} from "@/actions/card/schema";
import {
	CopyCardInputs,
	CreateCardInputs,
	DeleteCardInputs,
	UpdateCardInputs,
} from "@/actions/card/type";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { createAuditLog } from "@/lib/audit-log-service";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

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

	const auditLog = await createAuditLog({
		entityId: card.id,
		entityTitle: card.title,
		entityType: ENTITY_TYPE.CARD,
		action: ACTION.CREATE,
	});

	if (!auditLog) throw new Error("Failed to audit action");

	return card;
};

export const updateCard = async (data: UpdateCardInputs) => {
	const { orgId, userId } = auth();

	if (!orgId || !userId) throw new Error("Unauthorized");
	if (!updateCardSchema.safeParse(data).success)
		throw new Error("Missing some field");

	const { id, boardId, ...values } = data;
	const card = await db.card.update({
		where: {
			id,
			list: {
				board: {
					orgId,
				},
			},
		},
		data: {
			...values,
		},
	});

	if (!card) throw new Error("Failed to update card");

	const auditLog = await createAuditLog({
		entityId: card.id,
		entityTitle: card.title,
		entityType: ENTITY_TYPE.CARD,
		action: ACTION.UPDATE,
	});

	if (!auditLog) throw new Error("Failed to audit action");

	return card;
};

export const copyCard = async (data: CopyCardInputs) => {
	const { orgId, userId } = auth();

	if (!orgId || !userId) throw new Error("Unauthorized");
	if (!copyCardSchema.safeParse(data).success)
		throw new Error("Missing some field");

	const { id } = data;
	const cardToCopy = await db.card.findUnique({
		where: {
			id,
			list: {
				board: {
					orgId,
				},
			},
		},
	});
	if (!cardToCopy) throw new Error("Card not found");

	const lastCard = await db.card.findFirst({
		where: {
			listId: cardToCopy.listId,
		},
		orderBy: {
			order: "desc",
		},
		select: { order: true },
	});

	const newOrder = lastCard ? lastCard.order + 1 : 1;

	const card = await db.card.create({
		data: {
			title: `${cardToCopy.title} - Copy`,
			description: cardToCopy.description,
			order: newOrder,
			listId: cardToCopy.listId,
		},
	});

	if (!card) throw new Error("Failed to copy card");

	const auditLog = await createAuditLog({
		entityId: card.id,
		entityTitle: card.title,
		entityType: ENTITY_TYPE.CARD,
		action: ACTION.CREATE,
	});

	if (!auditLog) throw new Error("Failed to audit action");

	return card;
};

export const deleteCard = async (data: DeleteCardInputs) => {
	const { orgId, userId } = auth();

	if (!orgId || !userId) throw new Error("Unauthorized");
	if (!deleteCardSchema.safeParse(data).success)
		throw new Error("Missing some field");

	const { id } = data;
	const card = await db.card.delete({
		where: {
			id,
			list: {
				board: { orgId },
			},
		},
	});

	if (!card) throw new Error("Failed to delete");

	const auditLog = await createAuditLog({
		entityId: card.id,
		entityTitle: card.title,
		entityType: ENTITY_TYPE.CARD,
		action: ACTION.DELETE,
	});

	if (!auditLog) throw new Error("Failed to audit action");

	return card;
};
