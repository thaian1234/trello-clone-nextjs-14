import type { Metadata } from "next";
import "./globals.css";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { textFont } from "@/fonts/globalFont";

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: [
		{
			url: "/logo.svg",
			href: "/logo.svg",
		},
	],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={cn(
					"bg-background font-sans antialiased",
					textFont.variable
				)}
			>
				{children}
			</body>
		</html>
	);
}
