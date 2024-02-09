import { z } from "zod";
import {
	copyCardSchema,
	createCardSchema,
	deleteCardSchema,
	updateCardSchema,
} from "./schema";

export type CreateCardInputs = z.infer<typeof createCardSchema>;
export type UpdateCardInputs = z.infer<typeof updateCardSchema>;
export type CopyCardInputs = z.infer<typeof copyCardSchema>;
export type DeleteCardInputs = z.infer<typeof deleteCardSchema>;
