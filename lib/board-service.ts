import { db } from "@/lib/db";
import { getSelf } from "./auth-service";
import { auth } from "@clerk/nextjs";

export const createBoard = async (title: string, image: string) => {
	const { userId, orgId } = auth();

	if (!userId || !orgId) throw new Error("Unauthorized");

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

	return board;
};

export const deleteBoard = async (id: string) => {
	const self = await getSelf();
	if (!self) throw new Error("Unauthorized");

	return await db.board.findUnique({
		where: {
			id,
		},
	});
};
