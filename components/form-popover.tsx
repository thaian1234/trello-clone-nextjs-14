"use client";

import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { CreateBoardForm } from "./forms/create-board-form";
import { ElementRef, useRef } from "react";

interface FormPopoverProps {
	children: React.ReactNode;
	side?: "left" | "right" | "top" | "bottom";
	align?: "start" | "center" | "end";
	sideOffset?: number;
}

export function FormPopover({
	children,
	side,
	sideOffset,
	align,
}: FormPopoverProps) {
	const closeRef = useRef<ElementRef<"button">>(null);

	return (
		<Popover>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent
				align={align}
				side={side}
				sideOffset={sideOffset}
				className="w-80 pt-3"
			>
				<div className="text-sm font-medium text-center text-neutral-600 pb-4">
					Create board
				</div>
				<PopoverClose asChild ref={closeRef}>
					<Button
						className="size-auto p-2 absolute top-2 right-2 text-neutral-600"
						variant="ghost"
					>
						<X className="size-3" />
					</Button>
				</PopoverClose>
				<CreateBoardForm closeRef={closeRef} />
			</PopoverContent>
		</Popover>
	);
}
