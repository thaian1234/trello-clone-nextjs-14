import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { createAuditLog } from "./audit-log-service";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import {
	decreaseAvailableCount,
	hasAvailableCount,
	incrementAvailableCount,
} from "./org-limit";
import { checkSubcription } from "./subscription";

export const createBoard = async (title: string, image: string) => {
	const { userId, orgId } = auth();

	if (!userId || !orgId) throw new Error("Unauthorized");

	// const canCreate = await hasAvailableCount();
	// const isPro = await checkSubcription();
	const [canCreate, isPro] = await Promise.all([
		hasAvailableCount(),
		checkSubcription(),
	]);

	if (!canCreate && !isPro)
		throw new Error(
			"You have reached your limit of free boards. Please update to create more board."
		);

	const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUsername] =
		image.split("|");

	if (
		!imageId ||
		!imageThumbUrl ||
		!imageFullUrl ||
		!imageLinkHTML ||
		!imageUsername
	) {
		throw new Error("Missing field. Failed to create board");
	}

	const board = await db.board.create({
		data: {
			title,
			orgId,
			imageId,
			imageThumbUrl,
			imageFullUrl,
			imageLinkHTML,
			imageUsername,
		},
	});

	if (!board) throw new Error("Interal Error");

	if (!isPro) await incrementAvailableCount();

	const auditLog = await createAuditLog({
		entityId: board.id,
		entityTitle: board.title,
		entityType: ENTITY_TYPE.BOARD,
		action: ACTION.CREATE,
	});

	if (!auditLog) throw new Error("Failed to audit action");

	return board;
};

export const updateBoard = async (id: string, title: string) => {
	const { userId, orgId } = auth();

	if (!userId || !orgId) throw new Error("Unauthorized");

	const board = await db.board.update({
		where: {
			id,
			orgId,
		},
		data: { title },
	});

	if (!board) throw new Error("Failed to update");

	const auditLog = await createAuditLog({
		entityId: board.id,
		entityTitle: board.title,
		entityType: ENTITY_TYPE.BOARD,
		action: ACTION.UPDATE,
	});

	if (!auditLog) throw new Error("Failed to audit action");

	return board;
};

export const deleteBoard = async (id: string) => {
	const { userId, orgId } = auth();

	if (!userId || !orgId) throw new Error("Unauthorized");

	const deletedBoard = await db.board.delete({
		where: {
			id,
			orgId,
		},
	});

	if (!deletedBoard) throw new Error("Failed to delete");

	const isPro = await checkSubcription();

	const auditLog = await createAuditLog({
		entityId: deletedBoard.id,
		entityTitle: deletedBoard.title,
		entityType: ENTITY_TYPE.BOARD,
		action: ACTION.DELETE,
	});

	if (!auditLog) throw new Error("Failed to audit action");

	if (!isPro) await decreaseAvailableCount();

	return deletedBoard;
};
