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

export const updateCardSchema = z.object({
	id: z.string().trim(),
	boardId: z.string().trim(),
	title: z
		.string({
			required_error: "Title is required",
			invalid_type_error: "Title is required",
		})
		.trim()
		.min(3, {
			message: "Title is too short",
		}),
	description: z.optional(
		z
			.string({
				required_error: "Description is required",
				invalid_type_error: "Description is required",
			})
			.trim()
			.min(3, { message: "Description is too short" })
	),
});

export const copyCardSchema = z.object({
	id: z.string().trim(),
	boardId: z.string().trim(),
});

export const deleteCardSchema = z.object({
	id: z.string().trim(),
	boardId: z.string().trim(),
});