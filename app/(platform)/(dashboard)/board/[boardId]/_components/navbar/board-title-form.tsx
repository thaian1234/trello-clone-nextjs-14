"use client";

import { onUpdateBoard } from "@/actions/board";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Board } from "@prisma/client";
import { ElementRef, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface BoardTitleFormProps {
	board: Board;
}

type BoardTitleInput = {
	title: string;
};

export function BoardTitleForm({ board }: BoardTitleFormProps) {
	const [isEditing, setIsEditing] = useState(false);
	const formRef = useRef<ElementRef<"form">>(null);

	const { register, handleSubmit, setFocus, getValues } =
		useForm<BoardTitleInput>({
			defaultValues: {
				title: board.title,
			},
		});
	const [isPending, startTransition] = useTransition();
	const title = getValues("title");

	const enableEditing = () => {
		setIsEditing(true);
		setTimeout(() => {
			setFocus("title");
		}, 1000);
	};

	const disabledEditing = () => {
		setIsEditing(false);
	};

	const onSubmit = handleSubmit((values) => {
		if (values.title === title) return;
		if (values.title.length <= 2)
			return toast.error("Title must at least 2 charactors");

		startTransition(() => {
			onUpdateBoard(board.id, values.title)
				.then(() => {
					toast.success(`Board "${board.title}" updated`);
					disabledEditing();
				})
				.catch(() => {
					toast.error("Something went wrong");
				});
		});
	});

	const onBlur = () => {
		formRef.current?.requestSubmit();
	};

	if (isEditing) {
		return (
			<form
				onSubmit={onSubmit}
				ref={formRef}
				className="flex items-center gap-x-2"
			>
				<Input
					{...register("title")}
					// ref={inputRef}
					onBlur={onBlur}
					className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
					type="text"
					disabled={isPending}
				/>
			</form>
		);
	}

	return (
		<Button
			onClick={enableEditing}
			variant="transparent"
			className="font-bold text-lg size-auto p-1 px-2"
		>
			{title}
		</Button>
	);
}
