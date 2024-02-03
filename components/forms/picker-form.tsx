"use client";

import { getUnplashImages } from "@/lib/unplash-service";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { defaultImages } from "@/constant/images";
import Link from "next/link";
import { Loader } from "../ui/loader";
import { useFormContext } from "react-hook-form";

interface PickerFormProps {
	id: string;
	isPending: boolean;
	onSetValueImage: (imageValue: string) => void;
}

export function PickerForm({
	id,
	isPending,
	onSetValueImage,
}: PickerFormProps) {
	const [selectedImageId, setSelectedImageId] = useState(null);
	const {
		data: images,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["images", id],
		queryFn: () => getUnplashImages(),
	});
	const lastImages = isError || !images ? defaultImages : images;

	if (isLoading)
		return (
			<div className="p-6 flex items-center justify-center">
				<Loader className="text-pink-600" />
			</div>
		);

	return (
		<div className="relative">
			<div className="grid grid-cols-3 gap-2 mb-2">
				{lastImages?.map((image) => (
					<div
						key={image.id}
						className={cn(
							"cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
							isPending &&
								"opacity-50 hover:opacity-50 cursor-auto"
						)}
						onClick={() => {
							if (isPending || isLoading) return;

							setSelectedImageId(image.id);
							onSetValueImage(
								`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`
							);
						}}
					>
						<Image
							src={image?.urls.thumb}
							fill
							alt="Unsplash image"
							className="object-cover rounded-sm"
							sizes="100%"
						/>
						{selectedImageId === image.id && (
							<div className="absolute inset-y-0 size-full bg-black/30 flex items-center justify-center">
								<Check className="size-4 text-white" />
							</div>
						)}
						<Link
							target="_blank"
							href={image.links.html}
							className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"
						>
							{image.user.name}
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}
