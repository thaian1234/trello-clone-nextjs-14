import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";

import { cn } from "@/lib/utils";

const headingFont = localFont({
	src: "../public/fonts/font.woff2",
});

export function Logo() {
	return (
		<Link href="/">
			<div className="hidden hover:opacity-75 transition items-center gap-x-2 md:flex ">
				<Image src="/logo.svg" alt="Logo" height={35} width={35} />
				<p
					className={cn(
						"text-lg text-neutral-700",
						headingFont.className
					)}
				>
					Taskify
				</p>
			</div>
		</Link>
	);
}
