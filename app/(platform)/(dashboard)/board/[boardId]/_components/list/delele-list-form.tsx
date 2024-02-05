"use client";

import { onDeleteList } from "@/actions/list";
import {
	listFormDeleteInput,
	listFormDeleteSchema,
} from "@/actions/list/schema";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, RefObject, SetStateAction, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface DeleteListFormProps {
	id: string;
	boardId: string;
	closeRef?: RefObject<HTMLButtonElement>;
	setIsSubmitting: Dispatch<SetStateAction<boolean>>;
	isSubmitting: boolean;
}

export function DeleteListForm({
	id,
	boardId,
	isSubmitting,
	setIsSubmitting,
	closeRef,
}: DeleteListFormProps) {
	const { register, handleSubmit } = useForm<listFormDeleteInput>({
		resolver: zodResolver(listFormDeleteSchema),
		defaultValues: {
			id,
			boardId,
		},
	});
	const [_, startTransiton] = useTransition();

	const onSubmit = handleSubmit((data) => {
		if (!data) return;

		setIsSubmitting(true);

		startTransiton(() => {
			onDeleteList(data)
				.then((data) => {
					toast.success(`Delete "${data?.title}" success`);
					closeRef?.current?.click();
				})
				.catch((error: Error) => {
					toast.error(error.message);
				})
				.finally(() => {
					setIsSubmitting(false);
				});
		});
	});

	return (
		<form onSubmit={onSubmit}>
			<input hidden {...register("id")} />
			<input hidden {...register("boardId")} />
			<Button
				className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm text-rose-500/90 hover:text-rose-600"
				variant="ghost"
				disabled={isSubmitting}
			>
				Delete this list...
			</Button>
		</form>
	);
}
