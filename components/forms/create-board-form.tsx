"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { onCreateBoard } from "@/actions/board";
import { ElementRef, RefObject, useTransition } from "react";
import { toast } from "sonner";
import { PickerForm } from "./picker-form";
import { useRouter } from "next/navigation";
import { Loader } from "../ui/loader";
import { useProModal } from "@/hooks/use-pro-modal";

interface CreateBoardFormProps {
	closeRef?: RefObject<HTMLButtonElement>;
}

const formSchema = z.object({
	title: z.string().min(2, {
		message: "Title muse be at least 2 characters",
	}),
	image: z.string().min(1, {
		message: "Please pick one image",
	}),
});

type formInput = z.infer<typeof formSchema>;

export function CreateBoardForm({ closeRef }: CreateBoardFormProps) {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const proModal = useProModal((state) => state);

	const form = useForm<formInput>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			image: "",
		},
	});

	const onSetValueImage = (imageValue: string) => {
		form.setValue("image", imageValue);
	};

	function onSubmit(values: formInput) {
		startTransition(() => {
			onCreateBoard(values.title, values.image)
				.then((data) => {
					toast.success("Board created");
					closeRef?.current?.click();
					router.push(`/board/${data?.id}`);
				})
				.catch((error: Error) => {
					toast.error(error.message);
					proModal.onOpen();
				});
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="image"
					render={({ field: { onChange, value } }) => (
						<FormItem>
							<FormControl>
								<PickerForm
									id="image"
									onSetValueImage={onSetValueImage}
									isPending={isPending}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input
									{...field}
									disabled={isPending}
									className="text-sm"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					variant="primary"
					className="w-full"
					type="submit"
					disabled={isPending}
				>
					{isPending && <Loader className="text-blue-600" />}
					Submit
				</Button>
			</form>
		</Form>
	);
}
