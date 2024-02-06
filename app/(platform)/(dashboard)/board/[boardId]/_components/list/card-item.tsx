"use client";

import { Card } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";

interface CardItemProps {
	data: Card;
	index: number;
}

export function CardItem({ data, index }: CardItemProps) {
	return (
		<Draggable draggableId={data.id} index={index}>
			{(provided) => (
				<div
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					role="button"
					className="truncate border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm hover:font-medium hover:scale-[102%]"
				>
					{data.title}
				</div>
			)}
		</Draggable>
	);
}
