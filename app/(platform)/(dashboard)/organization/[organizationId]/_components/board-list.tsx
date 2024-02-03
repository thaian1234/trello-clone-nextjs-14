import { FormPopover } from "@/components/form-popover";
import { Hint } from "@/components/hint";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { HelpCircle, User2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BoardItem } from "./board-item";

export async function BoardList() {
	const { orgId } = auth();

	if (!orgId) return redirect("/select-org");

	const boards = await db.board.findMany({
		where: {
			orgId,
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	return (
		<div className="space-y-4">
			<div className="flex items-center font-semibold text-lg text-neutral-700">
				<User2 className="size-6 mr-2" />
				Your boards
			</div>
			<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
				{boards.map((board) => (
					<BoardItem board={board} key={board.id} />
				))}
				<FormPopover sideOffset={10} side="right">
					<div
						role="button"
						className="aspect-video relative size-full rounded-sm bg-muted flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
					>
						<p className="text-sm">Create new board</p>
						<span className="text-xs">5 reamining</span>
						<Hint
							sideOffset={40}
							description={`
						Free Workpsaces can have up to 5 open boards. for unlimited boards upgrade this workspace.
					`}
						>
							<HelpCircle className="absolute bottom-2 right-2 size-[14px]" />
						</Hint>
					</div>
				</FormPopover>
			</div>
		</div>
	);
}

export function BoardListSkeleton() {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
			{Array.from({ length: 8 }).map((_, i) => (
				<Skeleton key={i} className="aspect-video size-full p-2" />
			))}
		</div>
	);
}
