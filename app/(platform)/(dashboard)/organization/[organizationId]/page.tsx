import { Separator } from "@/components/ui/separator";
import { Info, InfoSkeleton } from "./_components/info";
import { BoardList, BoardListSkeleton } from "./_components/board-list";
import { Suspense } from "react";
import { checkSubcription } from "@/lib/subscription";

export default async function OrganizationPage() {
	const isPro = await checkSubcription();
	return (
		<div className="w-full mb-20">
			<Info isPro={isPro} />
			<Separator className="my-4" />
			<div className="px-2 md:px-4">
				<Suspense fallback={<BoardListSkeleton />}>
					<BoardList />
				</Suspense>
			</div>
		</div>
	);
}

export function OraganizationPageSkeleton() {
	return (
		<div className="w-full mb-20">
			<InfoSkeleton />
			<Separator className="my-4" />
			<div className="px-2 md:px-4">
				<BoardListSkeleton />
			</div>
		</div>
	);
}
