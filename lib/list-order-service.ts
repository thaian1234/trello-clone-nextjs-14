import { UpdateListOrderInputs } from "@/actions/list-order/types";
import { auth } from "@clerk/nextjs";
import { db } from "./db";

export const updateListOrder = async (data: UpdateListOrderInputs) => {
	const { orgId, userId } = auth();

	if (!userId || !orgId) throw new Error("Unauthorized");

	const { items } = data;

	const transaction = items.map((list) =>
		db.list.update({
			where: {
				id: list.id,
				board: {
					orgId,
				},
			},
			data: {
				order: list.order,
			},
		})
	);

	const lists = await db.$transaction(transaction);

	if (!lists) throw new Error("Failed to reorder");

	return lists;
};
