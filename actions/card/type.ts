import { z } from "zod";
import { createCardSchema } from "./schema";

export type CreateCardInputs = z.infer<typeof createCardSchema>;
