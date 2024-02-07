"use client";

import { CardModal } from "@/components/modals/card-modal";
import { useEffect, useState } from "react";
import { useIsClient } from "usehooks-ts";

export function ModalProvider() {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<>
			<CardModal />
		</>
	);
}
