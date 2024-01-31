import type { Metadata } from "next";
import { Poppins as FontPoppins } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";
import { cn } from "@/lib/utils";
import ReactQueryProvider from "@/providers/react-query-provider";
import { siteConfig } from "@/config/site";

export const fontPoppins = FontPoppins({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	variable: "--font-poppins",
});

export const headingFont = localFont({
	src: "../public/fonts/font.woff2",
});

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
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					"bg-background font-sans antialiased",
					fontPoppins.variable
				)}
			>
				<ReactQueryProvider>{children}</ReactQueryProvider>
			</body>
		</html>
	);
}
