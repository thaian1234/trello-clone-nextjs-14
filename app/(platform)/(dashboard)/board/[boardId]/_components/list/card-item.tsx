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
					className="truncate border-transparent hover:-translate-y-1 hover:scale-[102%] transform-gpu transition py-2 px-3 text-sm bg-white rounded-md shadow-sm hover:font-medium"
				>
					{data.title}
				</div>
			)}
		</Draggable>
	);
}
