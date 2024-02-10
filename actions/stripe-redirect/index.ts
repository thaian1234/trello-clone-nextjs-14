"use server";

import { stripeRedirect } from "@/lib/stripe";

export const onStripeRedirect = async () => {
	try {
		const url = stripeRedirect();

		return url;
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
	}
};
