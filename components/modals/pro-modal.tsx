"use client";

import Image from "next/image";

import { useProModal } from "@/hooks/use-pro-modal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { onStripeRedirect } from "@/actions/stripe-redirect";
import { toast } from "sonner";

export function ProModal() {
	const proModal = useProModal((state) => state);

	const [isPending, startTransition] = useTransition();

	const handleUpgrade = () => {
		startTransition(() => {
			onStripeRedirect()
				.then((data) => {
					window.location.href = data || "";
				})
				.catch((error: Error) => {
					toast.error(error.message);
				});
		});
	};

	return (
		<Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
			<DialogContent className="max-w-md p-0 overflow-hidden">
				<div className="aspect-video relative flex items-center justify-center">
					<Image
						src="/hero.svg"
						alt="Hero"
						className="object-cover"
						fill
					/>
				</div>
				<div className="text-neutral-700 mx-auto space-y-6 p-6">
					<h2 className="font-semibold text-xl">
						Upgrade to Taskify Pro Today!
					</h2>
					<p className="text-xs font-semibold text-muted-foreground">
						Explore the best of Taskify
					</p>
					<div className="pl-3">
						<ul className="text-sm list-disc">
							<li>Unlimited boaards</li>
							<li>Advanced checklists</li>
							<li>Admin and security features</li>
							<li>And more!</li>
						</ul>
					</div>
					<Button
						onClick={handleUpgrade}
						className="w-full"
						variant="primary"
					>
						Upgrade
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
