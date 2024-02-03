"use client";

import { Button } from "@/components/ui/button";
import { ListWrapper } from "./list-wrapper";
import { Plus, X } from "lucide-react";
import { ElementRef, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { listFormInput, listFormSchema } from "@/actions/list/schema";
import { onCreateList } from "@/actions/list";

export function ListForm() {
	const params = useParams();
	const {
		register,
		handleSubmit,
		setFocus,
		reset,
		formState: { errors },
	} = useForm<listFormInput>({
		resolver: zodResolver(listFormSchema),
		defaultValues: {
			title: "",
			boardId: params.boardId as string,
		},
	});

	const [isPending, startTransition] = useTransition();
	const [isEditing, setIsEditing] = useState(false);
	const formRef = useRef<ElementRef<"form">>(null);

	const enableEditing = () => {
		setIsEditing(true);
		setTimeout(() => {
			setFocus("title");
		}, 500);
	};

	const disableEditing = () => {
		setIsEditing(false);
	};

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			disableEditing();
		}
	};

	const onSubmit = handleSubmit((data) => {
		startTransition(() => {
			onCreateList(data)
				.then(() => {
					toast.success(`List "${data.title}" created`);
					reset();
					disableEditing();
				})
				.catch((error: Error) => {
					toast.error(error.message);
				});
		});
	});

	useEventListener("keydown", onKeyDown);
	useOnClickOutside(formRef, disableEditing);

	if (isEditing) {
		return (
			<ListWrapper>
				<form
					onSubmit={onSubmit}
					ref={formRef}
					className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
				>
					<Input
						{...register("title")}
						className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
						placeholder="Enter list title..."
						disabled={isPending}
					/>
					{errors.title && (
						<p className="text-red-500 text-xs">
							{errors.title.message}
						</p>
					)}
					<input hidden {...register("boardId")} />
					{errors.boardId && (
						<p className="text-red-500 text-xs">
							{errors.boardId.message}
						</p>
					)}

					<div className="flex items-center gap-x-1">
						<Button
							type="submit"
							className="w-full"
							variant="primary"
							size="sm"
							disabled={isPending}
						>
							Add list
						</Button>
						<Button
							onClick={disableEditing}
							size="sm"
							variant="ghost"
							disabled={isPending}
						>
							<X className="size-5" aria-label="delete" />
						</Button>
					</div>
				</form>
			</ListWrapper>
		);
	}

	return (
		<ListWrapper>
			<Button
				variant="ghost"
				className="w-full rounded-md bg-white/90 hover:bg-white/60 flex justify-start"
				onClick={enableEditing}
			>
				<Plus className="size-4 mr-2" />
				Add a list
			</Button>
		</ListWrapper>
	);
}
