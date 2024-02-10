"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import Image from "next/image";

interface InfoProps {
	isPro: boolean;
}

export function Info({ isPro }: InfoProps) {
	const { organization, isLoaded } = useOrganization();

	if (!isLoaded) return <InfoSkeleton />;

	return (
		<div className="flex items-center gap-x-4">
			<div className="size-[60px] relative">
				<Image
					fill
					src={organization?.imageUrl!}
					alt="Organization"
					className="rounded-md object-cover"
					priority
				/>
			</div>
			<div className="space-y-1">
				<p className="font-semibold text-xl">{organization?.name}</p>
				<div className="flex items-center text-xs text-muted-foreground">
					<CreditCard className="size-3 mr-1" />
					{isPro ? "Pro" : "Free"}
				</div>
			</div>
		</div>
	);
}

export function InfoSkeleton() {
	return (
		<div className="flex items-center gap-x-4">
			<div className="size-[60px] relative">
				<Skeleton className="size-full rounded-md absolute" />
			</div>
			<div className="space-y-2">
				<Skeleton className="h-10 w-[200px]" />
				<div className="flex items-center">
					<Skeleton className="size-4 mr-2" />
					<Skeleton className="h-4 w-[100px]" />
				</div>
			</div>
		</div>
	);
}
