import { z } from "zod";
import { createCardSchema, updateCardSchema } from "./schema";

export type CreateCardInputs = z.infer<typeof createCardSchema>;
export type UpdateCardInputs = z.infer<typeof updateCardSchema>;
