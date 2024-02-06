import { auth } from "@clerk/nextjs";
import { db } from "./db";
import { UpdateCardOrderInputs } from "@/actions/card-order/types";

export const updateCardOrder = async (data: UpdateCardOrderInputs) => {
	const { orgId, userId } = auth();

	if (!userId || !orgId) throw new Error("Unauthorized");

	const { items } = data;

	const transaction = items.map((card) =>
		db.card.update({
			where: {
				id: card.id,
				list: {
					board: {
						orgId,
					},
				},
			},
			data: {
				order: card.order,
				listId: card.listId,
			},
		})
	);

	const cards = await db.$transaction(transaction);

	if (!cards) throw new Error("Failed to reorder");

	return cards;
};
