import { Plus } from "lucide-react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Actions, ActionsSkeleton } from "./actions";
import { MobileSidebar } from "../sidebar/mobile-sidebar";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

export function Navbar() {
	return (
		<nav className="fixed z-50 top-0 px-4 w-full h-14 border-t shadow-sm bg-white flex items-center gap-x-2">
			<MobileSidebar />
			<div className="flex items-center gap-x-4">
				<div className="hidden md:flex">
					<Logo />
				</div>
				<Button
					variant="primary"
					size="sm"
					className="rounded-sm hidden md:block h-auto py-1.5 px-2"
				>
					Create
				</Button>
				<Button
					variant="primary"
					size="sm"
					className="rounded-sm block md:hidden"
				>
					<Plus className="size-4" />
				</Button>
			</div>

			<div className="ml-auto flex items-center gap-x-2">
				<Suspense fallback={<ActionsSkeleton />}>
					<Actions />
				</Suspense>
			</div>
		</nav>
	);
}
