"use client";

import { useQuery } from "@tanstack/react-query";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-modal";
import { CardWithList } from "@/types";
import { fetcher } from "@/lib/fetcher";
import { Header, HeaderSkelton } from "./header";
import { Description, DescriptionSkeleton } from "./description";
import { Actions, ActionsSkeleton } from "./actions";
import { AuditLog } from "@prisma/client";
import { Activity, ActivitySkeleton } from "./activity";

export function CardModal() {
	const { id, isOpen, onClose } = useCardModal((state) => state);

	const { data: cardData, isLoading: isLoadingCard } = useQuery<CardWithList>(
		{
			queryKey: ["card", id],
			queryFn: () => fetcher(`/api/cards/${id}`),
		}
	);

	const { data: auditLogsData, isLoading: isLoadingAuditLogs } = useQuery<
		AuditLog[]
	>({
		queryKey: ["card-logs", id],
		queryFn: () => fetcher(`/api/cards/${id}/logs`),
	});

	const isLoading =
		isLoadingCard || !cardData || isLoadingAuditLogs || !auditLogsData;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				{isLoading ? <HeaderSkelton /> : <Header data={cardData} />}
				<div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
					<div className="col-span-3">
						<div className="w-full space-y-6">
							{isLoading ? (
								<DescriptionSkeleton />
							) : (
								<Description data={cardData} />
							)}
							{isLoading ? (
								<ActivitySkeleton />
							) : (
								<Activity items={auditLogsData} />
							)}
						</div>
					</div>
					{isLoading ? (
						<ActionsSkeleton />
					) : (
						<Actions data={cardData} />
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
