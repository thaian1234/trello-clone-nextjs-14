"use client";

import { onUpdateCard } from "@/actions/card";
import { updateCardSchema } from "@/actions/card/schema";
import { UpdateCardInputs } from "@/actions/card/type";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { CardWithList } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { AlignLeft } from "lucide-react";
import { Playfair_Display } from "next/font/google";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface DescriptionProps {
	data: CardWithList;
}

export function Description({ data }: DescriptionProps) {
	const queryClient = useQueryClient();
	const params = useParams();
	const [isEditing, setIsEditing] = useState(false);
	const [isPending, startTransition] = useTransition();
	const {
		register,
		handleSubmit,
		setFocus,
		getValues,
		formState: { errors },
	} = useForm<UpdateCardInputs>({
		resolver: zodResolver(updateCardSchema),
		defaultValues: {
			boardId: params.boardId as string,
			description: data.description || undefined,
			title: data.title,
			id: data.id,
		},
	});
	const description = getValues("description");

	const formRef = useRef<ElementRef<"form">>(null);

	const enableEditing = () => {
		setIsEditing(true);
		setTimeout(() => {
			setFocus("description");
		});
	};

	const disableEditing = () => {
		setIsEditing(false);
	};

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			disableEditing();
		}
	};

	useEventListener("keydown", onKeyDown);
	useOnClickOutside(formRef, disableEditing);

	const onSubmit = handleSubmit((data) => {
		startTransition(() => {
			onUpdateCard(data)
				.then(() => {
					queryClient.invalidateQueries({
						queryKey: ["card", data.id],
					});
					queryClient.invalidateQueries({
						queryKey: ["card-logs", data?.id],
					});
					toast.success(`Success`);
					disableEditing();
				})
				.catch((error: Error) => {
					toast.error(error.message);
				});
		});
	});

	return (
		<div
			onClick={enableEditing}
			className="flex items-start gap-x-4 w-full"
		>
			<AlignLeft className="size-5 mt-0.5 text-neutral-700" />
			<div className="w-full">
				<p className="font-semibold text-neutral-700 mb-2">
					Description
				</p>
				{isEditing ? (
					<form
						onSubmit={onSubmit}
						ref={formRef}
						className="space-y-2"
					>
						<Textarea
							{...register("description")}
							disabled={isPending}
						/>
						{errors.description && (
							<p className="text-sm font-light text-rose-500 mt-2">
								{errors.description.message}
							</p>
						)}
						<div className="flex items-center justify-start gap-x-2 mt-2">
							<Button
								disabled={isPending}
								type="submit"
								variant="primary"
							>
								Save
							</Button>
							<Button
								type="button"
								onClick={() => {
									setTimeout(() => {
										disableEditing();
									});
								}}
								disabled={isPending}
								size="sm"
								variant="ghost"
							>
								Cancel
							</Button>
						</div>
					</form>
				) : (
					<div
						role="button"
						className="min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
					>
						{description || "Add a more detailed description"}
					</div>
				)}
			</div>
		</div>
	);
}

export function DescriptionSkeleton() {
	return (
		<div className="flex items-start gap-x-3 w-full">
			<Skeleton className="size-6 bg-neutral-200" />
			<div className="w-full space-y-6">
				<Skeleton className="w-25 h-6 bg-neutral-200" />
				<Skeleton className="w-full h-[78px] bg-neutral-200" />
			</div>
		</div>
	);
}
