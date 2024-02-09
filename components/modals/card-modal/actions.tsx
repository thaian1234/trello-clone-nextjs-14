"use client";

import { onCopyCard, onDeleteCard } from "@/actions/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCardModal } from "@/hooks/use-card-modal";
import { CardWithList } from "@/types";
import { Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
	data: CardWithList;
}

export function Actions({ data }: ActionsProps) {
	const params = useParams();
	const cardModal = useCardModal();
	const [isPending, startTransition] = useTransition();

	const boardId = params.boardId as string;

	const onCopy = () => {
		startTransition(() => {
			onCopyCard({ id: data.id, boardId })
				.then(() => {
					toast.success(`Card "${data?.title}" copied`);
					cardModal.onClose();
				})
				.catch((error: Error) => {
					toast.error(error.message);
				});
		});
	};

	const onDelete = () => {
		startTransition(() => {
			onDeleteCard({ id: data.id, boardId })
				.then(() => {
					toast.success(`Card "${data?.title} deleted`);
					cardModal.onClose();
				})
				.catch((error: Error) => {
					toast.error(error.message);
				});
		});
	};

	return (
		<div className="space-y-2 mt-2">
			<p className="text-xs font-semibold text-center">Actions</p>
			<Button
				disabled={isPending}
				onClick={onCopy}
				variant="gray"
				className="w-full items-center justify-start"
				size="inline"
			>
				<Copy className="size-4 mr-2" />
				Copy
			</Button>
			<Button
				disabled={isPending}
				onClick={onDelete}
				variant="destructive"
				size="inline"
				className="w-full items-center justify-start"
			>
				<Trash className="size-4 mr-2" />
				Delete
			</Button>
		</div>
	);
}

export function ActionsSkeleton() {
	return (
		<div className="space-y-2 mt-2">
			<Skeleton className="w-20 h-4 bg-neutral-200 mx-auto" />
			<Skeleton className="w-full h-8 bg-neutral-200" />
			<Skeleton className="w-full h-8 bg-neutral-200" />
		</div>
	);
}
