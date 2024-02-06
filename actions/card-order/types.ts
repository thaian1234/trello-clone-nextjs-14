import { z } from "zod";
import { updateCardOrderSchema } from "./schema";

export type UpdateCardOrderInputs = z.infer<typeof updateCardOrderSchema>;
