import ReactQueryProvider from "@/providers/react-query-provider";
import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "sonner";

export default function PlatformLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<ReactQueryProvider>
				<Toaster />
				{children}
			</ReactQueryProvider>
		</ClerkProvider>
	);
}
