"use client";

import { ListWithCards } from "@/types";

import {
	DragDropContext,
	Droppable,
	OnDragEndResponder,
} from "@hello-pangea/dnd";
import { ListForm } from "./list-form";
import { useEffect, useState, useTransition } from "react";
import { ListItem } from "./list-item";
import { onUpdateListOrder } from "@/actions/list-order";
import { UpdateListOrderInputs } from "@/actions/list-order/types";
import { toast } from "sonner";
import { UpdateCardOrderInputs } from "@/actions/card-order/types";
import { onUpdateCardOrder } from "@/actions/card-order";

interface ListContainerProps {
	data: ListWithCards[];
	boardId: string;
}

export function ListContainer({ data, boardId }: ListContainerProps) {
	const [orderedData, setOrderedData] = useState(data);
	const [isUpdatingListOrder, startUpdateListOrderTransition] =
		useTransition();
	const [isUpdatingCardOrder, startUpdateCardOrderTransition] =
		useTransition();

	function reorder<T>(list: T[], startIndex: number, endIndex: number) {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);

		return result;
	}

	useEffect(() => {
		setOrderedData(data);
	}, [data]);

	const handleUpdateListOrder = (data: UpdateListOrderInputs) => {
		startUpdateListOrderTransition(() => {
			onUpdateListOrder(data)
				.then(() => {
					toast.success("List reordered");
				})
				.catch((error: Error) => {
					toast.error(error.message);
				});
		});
	};
	const handleUpdateCardOrder = (data: UpdateCardOrderInputs) => {
		startUpdateListOrderTransition(() => {
			onUpdateCardOrder(data)
				.then(() => {
					toast.success("Card reordered");
				})
				.catch((error: Error) => {
					toast.error(error.message);
				});
		});
	};

	const onDragEnd: OnDragEndResponder = (result) => {
		const { destination, source, type } = result;

		// If dropped in the same position
		if (
			!destination ||
			(destination.droppableId === source.droppableId &&
				destination.index === source.index)
		) {
			return;
		}

		// If user moves a list
		if (type === "list") {
			const items = reorder(
				orderedData,
				source.index,
				destination.index
			).map((item, index) => ({ ...item, order: index }));

			setOrderedData(items);
			//TODO: Triger server action
			handleUpdateListOrder({ items, boardId });
		}

		// If user moves a card
		if (type === "card") {
			let newOrderedData = [...orderedData];

			// Source and destination list
			const sourceList = newOrderedData.find(
				(list) => list.id === source.droppableId
			);
			const destList = newOrderedData.find(
				(list) => list.id === destination.droppableId
			);

			if (!sourceList || !destList) return;

			//Check if cards exists on the sourceList
			if (!sourceList.cards) {
				sourceList.cards = [];
			}

			//Check if cards exists on the destList
			if (!destList.cards) {
				destList.cards = [];
			}

			//Moving the card in the same list
			if (source.droppableId === destination.droppableId) {
				const reorderedCards = reorder(
					sourceList.cards,
					source.index,
					destination.index
				);

				reorderedCards.forEach((card, idx) => {
					card.order = idx;
				});

				sourceList.cards = reorderedCards;
				setOrderedData(newOrderedData);

				//TODO: Trigger server actions
				handleUpdateCardOrder({ items: reorderedCards, boardId });

				//User moves the card to another list
			} else {
				// Remove card from the source list
				const [movedCard] = sourceList.cards.splice(source.index, 1);

				//Assign the new listId to the moved card
				movedCard.listId = destination.droppableId;

				//Add card to the destination  list
				destList.cards.splice(destination.index, 0, movedCard);

				sourceList.cards.forEach((card, idx) => {
					card.order = idx;
				});

				//Update the order for reach card in the destination list
				destList.cards.forEach((card, idx) => {
					card.order = idx;
				});

				setOrderedData(newOrderedData);
				//TODO: trigger server actions
				handleUpdateCardOrder({ items: destList.cards, boardId });
			}
		}
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="lists" type="list" direction="horizontal">
				{(provided) => (
					<ol
						{...provided.droppableProps}
						ref={provided.innerRef}
						className="flex gap-x-3 h-full"
					>
						{orderedData.map((list, index) => {
							return (
								<ListItem
									key={list.id}
									index={index}
									data={list}
								/>
							);
						})}
						{provided.placeholder}
						<ListForm />
						<div className="flex-shrink-0 w-1" />
					</ol>
				)}
			</Droppable>
		</DragDropContext>
	);
}
