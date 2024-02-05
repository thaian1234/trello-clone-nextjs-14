"use client";

import { List } from "@prisma/client";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
	PopoverClose,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DeleteListForm } from "./delele-list-form";
import { ElementRef, useRef, useState } from "react";
import { CopyListForm } from "./copy-list-form";

interface ActionsProps {
	data: List;
	onAddCard: () => void;
}

export function Actions({ data, onAddCard }: ActionsProps) {
	const closeRef = useRef<ElementRef<"button">>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button className="size-auto p-2" variant="ghost">
					<MoreHorizontal className="size-4" />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="px-0 pt-3 pb-3"
				side="bottom"
				align="start"
			>
				<div className="text-sm font-medium text-center text-neutral-600">
					List actions
				</div>
				<PopoverClose asChild ref={closeRef}>
					<Button
						className="size-auto p-2 absolute top-2 right-2"
						variant="ghost"
					>
						<X className="size-4" />
					</Button>
				</PopoverClose>
				<Button
					onClick={onAddCard}
					className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
					variant="ghost"
					disabled={isSubmitting}
				>
					Add card...
				</Button>
				<CopyListForm
					id={data.id}
					boardId={data.boardId}
					closeRef={closeRef}
					setIsSubmitting={setIsSubmitting}
					isSubmitting={isSubmitting}
				/>
				<Separator />
				<DeleteListForm
					id={data.id}
					boardId={data.boardId}
					closeRef={closeRef}
					setIsSubmitting={setIsSubmitting}
					isSubmitting={isSubmitting}
				/>
			</PopoverContent>
		</Popover>
	);
}
