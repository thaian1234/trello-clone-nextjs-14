import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";
import { BoardNavbar } from "./_components/navbar";

const getBoardById = cache(async (boardId: string, orgId: string) => {
	return await db.board.findUnique({
		where: {
			id: boardId,
			orgId,
		},
	});
});

export async function generateMetadata({
	params,
}: {
	params: {
		boardId: string;
	};
}) {
	const { orgId } = auth();

	if (!orgId) {
		return {
			title: "Board",
		};
	}

	const board = await getBoardById(params.boardId, orgId);

	return {
		title: board?.title || "Board",
	};
}

export default async function BoardIdLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: {
		boardId: string;
	};
}) {
	const { orgId } = auth();

	if (!orgId) redirect("/select-org");

	const board = await getBoardById(params.boardId, orgId);

	if (!board) notFound();

	return (
		<div
			className="relative h-full bg-no-repeat bg-cover bg-center"
			style={{ backgroundImage: `url(${board.imageFullUrl})` }}
		>
			<BoardNavbar board={board} />
			<div className="absolute inset-0 bg-black/10" />
			<main className="relative pt-28 h-full">{children}</main>
		</div>
	);
}
