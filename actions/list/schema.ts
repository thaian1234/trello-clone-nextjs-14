import { z } from "zod";

export const listFormSchema = z.object({
	title: z.string().trim().min(3, {
		message: "Title is too short",
	}),
	boardId: z.string().trim(),
});

export const listFormUpdateSchema = z.object({
	id: z.string().trim(),
	title: z.string().trim().min(3, {
		message: "Title is too short",
	}),
	boardId: z.string().trim(),
});

export const listFormDeleteSchema = z.object({
	id: z.string().trim(),
	boardId: z.string().trim(),
});

export const listFormCopySchema = z.object({
	id: z.string().trim(),
	boardId: z.string().trim(),
});

export type listFormCopyInput = z.infer<typeof listFormCopySchema>;
export type listFormDeleteInput = z.infer<typeof listFormDeleteSchema>;
export type listFormUpdateInput = z.infer<typeof listFormUpdateSchema>;
export type listFormInput = z.infer<typeof listFormSchema>;
