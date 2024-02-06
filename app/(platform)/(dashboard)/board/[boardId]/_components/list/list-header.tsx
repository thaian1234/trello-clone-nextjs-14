"use client";

import { onUpdateList } from "@/actions/list";
import {
	listFormUpdateInput,
	listFormUpdateSchema,
} from "@/actions/list/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { List } from "@prisma/client";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { Actions } from "./actions";

interface ListHeaderProps {
	data: List;
	onAddCard: () => void;
}

export function ListHeader({ data, onAddCard }: ListHeaderProps) {
	const params = useParams();
	const [isEditing, setIsEditing] = useState(false);
	const [isPending, startTransition] = useTransition();

	const {
		register,
		handleSubmit,
		setFocus,
		getValues,
		formState: { errors },
	} = useForm<listFormUpdateInput>({
		resolver: zodResolver(listFormUpdateSchema),
		defaultValues: {
			boardId: params.boardId as string,
			title: data.title,
			id: data.id,
		},
	});
	const formRef = useRef<ElementRef<"form">>(null);
	const title = getValues("title");

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
			formRef.current?.requestSubmit();
		}
	};

	const onBlur = () => {
		formRef.current?.requestSubmit();
	};

	const onSubmit = handleSubmit((data) => {
		if (data.title === title) {
			disableEditing();
			return;
		}

		startTransition(() => {
			onUpdateList(data)
				.then(() => {
					disableEditing();
				})
				.catch((error: Error) => {
					toast.error(error.message);
				});
		});
	});

	useEventListener("keydown", onKeyDown);
	// useOnClickOutside(formRef, disableEditing);

	return (
		<div className="pt-2 px-2 text-sm font-semibold flex justify-between items-center gap-x-2 ">
			{isEditing ? (
				<form
					onSubmit={onSubmit}
					ref={formRef}
					className="flex-1 px-[2px] "
				>
					<input hidden {...register("id")} />
					<input hidden {...register("boardId")} />
					<Input
						{...register("title")}
						className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input transition truncate bg-transparent focus:bg-white"
						onBlur={onBlur}
						disabled={isPending}
					/>
					{errors.title && (
						<p className="text-sm pt-2 font-light text-rose-500">
							{errors.title.message}
						</p>
					)}
					<input type="submit" hidden />
				</form>
			) : (
				<div
					onClick={enableEditing}
					className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent"
				>
					{title}
				</div>
			)}
			<Actions data={data} onAddCard={onAddCard} />
		</div>
	);
}
