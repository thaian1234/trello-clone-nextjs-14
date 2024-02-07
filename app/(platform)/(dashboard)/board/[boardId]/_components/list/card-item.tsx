"use client";

import { Card } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";
import { useCardModal } from "@/hooks/use-card-modal";

interface CardItemProps {
	data: Card;
	index: number;
}

export function CardItem({ data, index }: CardItemProps) {
	const { onOpen } = useCardModal((state) => state);

	return (
		<Draggable draggableId={data.id} index={index}>
			{(provided) => (
				<div
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					role="button"
					onClick={() => {
						onOpen(data.id);
					}}
					className="truncate border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm hover:font-medium hover:scale-[102%]"
				>
					{data.title}
				</div>
			)}
		</Draggable>
	);
}
