import { z } from "zod";

export const listFormSchema = z.object({
	title: z.string().trim().min(2, {
		message: "Title must at least 2 charactors",
	}),
	boardId: z.string().trim(),
});

export type listFormInput = z.infer<typeof listFormSchema>;
