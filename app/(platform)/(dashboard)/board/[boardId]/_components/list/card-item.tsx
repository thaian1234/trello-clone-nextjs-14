"use client";

import { Card } from "@prisma/client";

interface CardItemProps {
	data: Card;
	index: number;
}

export function CardItem({ data, index }: CardItemProps) {
	return (
		<div
			role="button"
			className="truncate border-transparent hover:-translate-y-1 hover:scale-[102%] transform-gpu transition py-2 px-3 text-sm bg-white rounded-md shadow-sm hover:font-medium"
		>
			{data.title}
		</div>
	);
}
