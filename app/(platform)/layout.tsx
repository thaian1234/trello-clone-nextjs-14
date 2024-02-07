import ReactQueryProvider from "@/providers/react-query-provider";

import { ModalProvider } from "@/providers/modal-provider";
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
				<ModalProvider />
				{children}
			</ReactQueryProvider>
		</ClerkProvider>
	);
}
