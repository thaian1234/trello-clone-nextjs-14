import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";
import { cn } from "@/lib/utils";
import { textFont } from "@/fonts/globalFont";
import { headingFont } from "@/fonts/headingFont";

export default function MarketingPage() {
	return (
		<div className="flex items-center justify-center flex-col">
			<div
				className={cn(
					"flex items-center justify-center flex-col",
					headingFont.className
				)}
			>
				<div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
					<Medal className="size-6 mr-2" />
					No 1 task managment
				</div>
				<h1 className="text-3xl md:text-6xl text-center text-neutral-500 mb-6">
					Taskify helps team move
				</h1>
				<div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white p-4 rounded-md  w-fit">
					work forward.
				</div>
			</div>
			<div
				className={cn(
					"text-sm md:text-xl text-muted-foreground/80 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
					textFont.className
				)}
			>
				Collaborate, manage projects, and react new productivity peaks.
				From high rises to the home office, the way your team works is
				unique - accomplish it all with Taskify.
			</div>
			<Button variant="primary" className="mt-6" size="lg" asChild>
				<Link href="/sign-up">Get Taskify for free</Link>
			</Button>
		</div>
	);
}
