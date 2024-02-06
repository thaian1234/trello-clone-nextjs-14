import { z } from "zod";

export const updateListOrderSchema = z.object({
	items: z.array(
		z.object({
			id: z.string().trim(),
			title: z.string().trim(),
			order: z.number(),
			createdAt: z.date(),
			updatedAt: z.date(),
		})
	),
	boardId: z.string().trim(),
});
