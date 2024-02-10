import { StripeRedirectField } from "@/actions/stripe-redirect/types";
import { auth, currentUser } from "@clerk/nextjs";
import Stripe from "stripe";
import { absoluteUrl } from "@/lib/utils";
import { db } from "./db";
import { revalidatePath } from "next/cache";

export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
	apiVersion: "2023-10-16",
	typescript: true,
});

export const stripeRedirect = async () => {
	const { userId, orgId, user } = auth();

	if (!userId || !orgId) throw new Error("Unauthorized");

	const settingUrl = absoluteUrl(`/organization/${orgId}`);
	let url = "";

	const orgSubcription = await db.orgSubscription.findUnique({
		where: {
			orgId,
		},
	});

	if (orgSubcription && orgSubcription.stripeCustomerId) {
		const stripeSession = await stripe.billingPortal.sessions.create({
			customer: orgSubcription.stripeCustomerId,
			return_url: settingUrl,
		});

		if (!stripeSession) throw new Error("Failed to create Stripe session");

		url = stripeSession.url;
	} else {
		const stripeSession = await stripe.checkout.sessions.create({
			success_url: settingUrl,
			cancel_url: settingUrl,
			mode: "subscription",
			payment_method_types: ["card"],
			billing_address_collection: "auto",
			customer_email: user?.emailAddresses[0].emailAddress,
			line_items: [
				{
					price_data: {
						currency: "USD",
						product_data: {
							name: "Tasify Pro",
							description:
								"Unlimited boards for your organization",
						},
						unit_amount: 2000,
						recurring: {
							interval: "month",
						},
					},
					quantity: 1,
				},
			],
			metadata: {
				orgId,
			},
		});

		url = stripeSession?.url || "";
	}

	revalidatePath(`organization/${orgId}`);

	return url;
};
