import { z } from "zod";
import { updateListOrderSchema } from "./schema";

export type UpdateListOrderInputs = z.infer<typeof updateListOrderSchema>;
