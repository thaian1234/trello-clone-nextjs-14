"use client";

import { onDeleteBoard } from "@/actions/board";
import { Button } from "@/components/ui/button";
import { Board } from "@prisma/client";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

interface BoardItemProps {
	board: Board;
}

export function BoardItem({ board }: BoardItemProps) {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const handleDeleteBoard = () => {
		startTransition(() => {
			onDeleteBoard(board.id)
				.then((data) => {
					toast.success(`Board "${board.title}" deleted`);
					router.replace(`/organization/${data.orgId}`);
					router.refresh();
				})
				.catch(() => {
					toast.error("Cannot delete board");
				});
		});
	};

	return (
		<Link
			key={board.id}
			href={`/board/${board.id}`}
			style={{
				backgroundImage: `url(${board.imageThumbUrl})`,
			}}
			className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm size-full p-2 overflow-hidden"
		>
			<Button
				className="absolute top-0 right-0 z-[50] hover:bg-red-400/40 py-1 px-2"
				variant="ghost"
				onClick={handleDeleteBoard}
				disabled={isPending}
			>
				<Trash2 className="size-4 text-red-600" />
			</Button>
			<div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition " />
			<p className="relative font-semibold text-white truncate w-[70%]">
				{board.title}
			</p>
		</Link>
	);
}
