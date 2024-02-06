import { z } from "zod";

export const createCardSchema = z.object({
	title: z
		.string({
			required_error: "Title is required",
			invalid_type_error: "Title is required",
		})
		.trim()
		.min(3, {
			message: "Title is too short",
		}),
	boardId: z.string().trim(),
	listId: z.string().trim(),
});
