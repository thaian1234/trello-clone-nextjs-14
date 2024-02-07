"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/types";
import { Layout } from "lucide-react";
import { ElementRef, useRef, useTransition } from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { UpdateCardInputs } from "@/actions/card/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCardSchema } from "@/actions/card/schema";
import { onUpdateCard } from "@/actions/card";
import { toast } from "sonner";

interface HeaderProps {
	data: CardWithList;
}

export function Header({ data }: HeaderProps) {
	const queryClient = useQueryClient();
	const params = useParams();
	const [isPending, startTransition] = useTransition();

	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<UpdateCardInputs>({
		resolver: zodResolver(updateCardSchema),
		defaultValues: {
			boardId: params.boardId as string,
			description: data.description || undefined,
			id: data.id,
			title: data.title,
		},
	});
	const formRef = useRef<ElementRef<"form">>(null);
	const title = getValues("title");

	const onBlur = () => {
		formRef.current?.requestSubmit();
	};

	const onSubmit = handleSubmit((data) => {
		if (title === data.title) return;

		startTransition(() => {
			onUpdateCard(data)
				.then((data) => {
					queryClient.invalidateQueries({
						queryKey: ["card", data?.id],
					});
					toast.success(`Renamed to "${data?.title}"`);
				})
				.catch((error: Error) => {
					toast.error(error.message);
				});
		});
	});

	return (
		<div className="flex items-start justify-center gap-x-4 mb-6 w-full">
			<Layout className="size-5 translate-y-2 text-neutral-700" />
			<div className="w-full flex flex-col gap-y-2">
				<form onSubmit={onSubmit} ref={formRef}>
					<Input
						{...register("title")}
						className="font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-2 w-[90%] focus-visible:bg-white focus-visible:border-input truncate"
						onBlur={onBlur}
						defaultValue={title}
						disabled={isPending}
					/>
					{errors.title && (
						<p className="text-sm font-normal text-rose-500">
							{errors.title.message}
						</p>
					)}
				</form>
				<p className="text-sm text-muted-foreground">
					in list <span className="underline">{data.list.title}</span>
				</p>
			</div>
		</div>
	);
}

export function HeaderSkelton() {
	return (
		<div className="flex items-start gap-x-3 mb-6">
			<Skeleton className="size-6 mt-1 bg-neutral-200" />
			<div>
				<Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
				<Skeleton className="w-12 h-4 bg-neutral-200" />
			</div>
		</div>
	);
}
