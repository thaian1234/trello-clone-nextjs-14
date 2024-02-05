"use client";

import { onCopyList } from "@/actions/list";
import { listFormCopyInput, listFormCopySchema } from "@/actions/list/schema";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, RefObject, SetStateAction, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface CopyListFormProps {
	id: string;
	boardId: string;
	closeRef?: RefObject<HTMLButtonElement>;
	isSubmitting: boolean;
	setIsSubmitting: Dispatch<SetStateAction<boolean>>;
}

export function CopyListForm({
	id,
	boardId,
	isSubmitting,
	setIsSubmitting,
	closeRef,
}: CopyListFormProps) {
	const { register, handleSubmit } = useForm<listFormCopyInput>({
		resolver: zodResolver(listFormCopySchema),
		defaultValues: {
			id,
			boardId,
		},
	});
	const [_, startTransition] = useTransition();

	const onSubmit = handleSubmit((data) => {
		if (!data) return;

		setIsSubmitting(true);

		startTransition(() => {
			onCopyList(data)
				.then((data) => {
					toast.success(`List "${data?.title}" copied`);
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
				className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
				variant="ghost"
				disabled={isSubmitting}
			>
				Copy list...
			</Button>
		</form>
	);
}
