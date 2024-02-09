import { Separator } from "@/components/ui/separator";
import { Info } from "../_components/info";
import { ActivityList, ActivitySkeleton } from "./_components/activity-list";
import { Suspense } from "react";

export default function ActivityPage() {
	return (
		<div className="w-full">
			<Info />
			<Separator className="my-2" />
			<Suspense fallback={<ActivitySkeleton />}>
				<ActivityList />
			</Suspense>
		</div>
	);
}
