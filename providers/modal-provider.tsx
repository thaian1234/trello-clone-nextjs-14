"use client";

import { CardModal } from "@/components/modals/card-modal";
import { ProModal } from "@/components/modals/pro-modal";
import { useEffect, useState } from "react";
import { useIsClient } from "usehooks-ts";

export function ModalProvider() {
	const isClient = useIsClient();

	if (!isClient) return null;

	return (
		<>
			<CardModal />
			<ProModal />
		</>
	);
}
