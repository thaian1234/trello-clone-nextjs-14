import { Separator } from "@/components/ui/separator";
import { Info } from "../_components/info";
import { ActivityList, ActivitySkeleton } from "./_components/activity-list";
import { Suspense } from "react";
import { checkSubcription } from "@/lib/subscription";

export default async function ActivityPage() {
	const isPro = await checkSubcription();
	return (
		<div className="w-full">
			<Info isPro={isPro} />
			<Separator className="my-2" />
			<Suspense fallback={<ActivitySkeleton />}>
				<ActivityList />
			</Suspense>
		</div>
	);
}
