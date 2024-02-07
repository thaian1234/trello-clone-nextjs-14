"use client";

import { useQuery } from "@tanstack/react-query";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-modal";
import { CardWithList } from "@/types";
import { fetcher } from "@/lib/fetcher";
import { Header, HeaderSkelton } from "./header";

export function CardModal() {
	const { id, isOpen, onClose } = useCardModal((state) => state);

	const { data: cardData, isLoading } = useQuery<CardWithList>({
		queryKey: ["card", id],
		queryFn: () => fetcher(`/api/cards/${id}`),
	});

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				{!cardData ? <HeaderSkelton /> : <Header data={cardData} />}
			</DialogContent>
		</Dialog>
	);
}
