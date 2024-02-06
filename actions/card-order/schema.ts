import { z } from "zod";

export const updateCardOrderSchema = z.object({
	items: z.array(
		z.object({
			id: z.string().trim(),
			title: z.string().trim(),
			order: z.number(),
			listId: z.string(),
			createdAt: z.date(),
			updatedAt: z.date(),
		})
	),
	boardId: z.string().trim(),
});
