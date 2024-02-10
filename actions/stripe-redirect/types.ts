import { z } from "zod";
import { stripeRedirectSchema } from "./schema";

export type StripeRedirectField = z.infer<typeof stripeRedirectSchema>;
