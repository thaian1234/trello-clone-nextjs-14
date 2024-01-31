"use client";

import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useIsClient } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Sidebar } from ".";

export function MobileSidebar() {
	const pathname = usePathname();
	const isClient = useIsClient();
	const { onOpen, onClose, isOpen } = useMobileSidebar((state) => state);

	useEffect(() => {
		onClose();
	}, [pathname, onClose]);

	if (!isClient) return null;

	return (
		<>
			<Button
				onClick={onOpen}
				className="block md:hidden border-pink-300 border"
				variant="ghost"
				size="sm"
			>
				<Menu className="size-4" />
			</Button>
			<Sheet open={isOpen} onOpenChange={onClose}>
				<SheetContent side="left" className="p-2 pt-10">
					<Sidebar storageKey="t-sidebar-mobile-state" />
				</SheetContent>
			</Sheet>
		</>
	);
}
