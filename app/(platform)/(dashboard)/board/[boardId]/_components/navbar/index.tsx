import { Board } from "@prisma/client";
import { BoardTitleForm } from "./board-title-form";
import { Actions } from "./actions";

interface BoardNavbarProps {
	board: Board;
}

export async function BoardNavbar({ board }: BoardNavbarProps) {
	return (
		<div className="w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white">
			<BoardTitleForm board={board} />
			<div className="ml-auto">
				<Actions id={board.id} />
			</div>
		</div>
	);
}
