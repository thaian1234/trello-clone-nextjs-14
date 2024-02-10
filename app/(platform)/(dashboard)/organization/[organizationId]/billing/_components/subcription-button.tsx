"use client";

import { onStripeRedirect } from "@/actions/stripe-redirect";
import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/use-pro-modal";
import { useTransition } from "react";
import { toast } from "sonner";

interface SubcriptionButtonProps {
	isPro: boolean;
}

export function SubcriptionButton({ isPro }: SubcriptionButtonProps) {
	const [isPending, startTransition] = useTransition();
	const proModal = useProModal((state) => state);

	const handleUpgradeSubcription = () => {
		startTransition(() => {
			onStripeRedirect()
				.then((data) => {
					window.location.href = data || "";
				})
				.catch((error: Error) => {
					toast.error(error.message);
					proModal.onOpen();
				});
		});
	};

	return (
		<Button
			variant="primary"
			onClick={handleUpgradeSubcription}
			disabled={isPending}
		>
			{isPro ? "Manage subcription" : "Upgrade to pro"}
		</Button>
	);
}
