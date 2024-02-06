"use client";

import { onCreateCard } from "@/actions/card";
import { createCardSchema } from "@/actions/card/schema";
import { CreateCardInputs } from "@/actions/card/type";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, KeyboardEventHandler, useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface CardFormProps {
	listId: string;
	disableEditing: () => void;
	enableEditing: () => void;
	isEditing: boolean;
}

export function CardForm({
	listId,
	disableEditing,
	enableEditing,
	isEditing,
}: CardFormProps) {
	const params = useParams();
	const {
		register,
		handleSubmit,
		setFocus,
		reset,
		formState: { errors },
	} = useForm<CreateCardInputs>({
		resolver: zodResolver(createCardSchema),
		defaultValues: {
			title: "",
			listId,
			boardId: params.boardId as string,
		},
	});
	const [isPending, startTransition] = useTransition();
	const formRef = useRef<ElementRef<"form">>(null);

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			disableEditing();
			reset();
		}
	};

	useOnClickOutside(formRef, () => {
		disableEditing();
		reset();
	});
	useEventListener("keydown", onKeyDown);

	const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
		e
	) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			formRef.current?.requestSubmit();
			reset();
		}
	};

	const onSubmit = handleSubmit((data) => {
		if (!data) return;

		startTransition(() => {
			onCreateCard(data)
				.then(() => {
					toast.success(`Card "${data.title}" created`);
					disableEditing();
					reset();
				})
				.catch((error: Error) => {
					toast.error(error.message);
				});
		});
	});

	if (isEditing) {
		setTimeout(() => {
			setFocus("title");
		}, 500);

		return (
			<form
				onSubmit={onSubmit}
				ref={formRef}
				className="m-1 py-0.5 space-y-4 px-2.5"
			>
				<Textarea
					{...register("title")}
					onKeyDown={(e) => onTextareaKeyDown(e)}
					placeholder="Enter a title for this card"
					disabled={isPending}
				/>
				{errors.title && (
					<p className="text-sm font-light text-rose-500">
						{errors.title.message}
					</p>
				)}
				<input hidden {...register("listId")} />
				<div className="flex items-center gap-x-1">
					<Button
						variant="primary"
						type="submit"
						className="w-full"
						disabled={isPending}
					>
						Add card
					</Button>
					<Button
						onClick={() => {
							disableEditing();
							reset();
						}}
						disabled={isPending}
						size="sm"
						variant="ghost"
					>
						<X className="size-5" />
					</Button>
				</div>
			</form>
		);
	}

	return (
		<div className="pt-2 px-2">
			<Button
				onClick={enableEditing}
				className="h-auto text-muted-foreground text-sm px-2 py-1.5 w-full justify-start"
				size="sm"
				variant="ghost"
			>
				<Plus className="size-4 mr-2" />
				Add a card
			</Button>
		</div>
	);
}
