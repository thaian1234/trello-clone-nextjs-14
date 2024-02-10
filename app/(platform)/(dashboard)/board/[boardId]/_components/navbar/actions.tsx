"use client";

import { onDeleteBoard } from "@/actions/board";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
	id: string;
}

export function Actions({ id }: ActionsProps) {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const handleDeleteBoard = () => {
		startTransition(() => {
			onDeleteBoard(id)
				.then((data) => {
					toast.success(`Board "${data?.title}" deleted`);
					router.replace(`/organization/${data?.orgId}`);
				})
				.catch(() => {
					toast.error("Something went wrong");
				});
		});
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button className="size-auto p-2" variant="transparent">
					<MoreHorizontal className="size-4" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="px-0 py-3" align="start">
				<div className="text-sm font-medium text-center text-neutral-600 mb-4">
					Board actions
				</div>
				<PopoverClose asChild>
					<Button
						className="size-auto absolute top-2 right-2 text-neutral-600"
						variant="transparent"
					>
						<X className="size-4" />
					</Button>
				</PopoverClose>
				<Button
					variant="ghost"
					disabled={isPending}
					onClick={handleDeleteBoard}
					className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm text-rose-500 hover:text-rose-500"
				>
					Delete this board
				</Button>
			</PopoverContent>
		</Popover>
	);
}
