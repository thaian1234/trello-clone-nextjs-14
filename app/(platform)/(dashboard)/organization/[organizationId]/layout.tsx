import { startCase } from "lodash";

import { ReactNode } from "react";
import { OrgControl } from "./_components/org-control";
import { auth } from "@clerk/nextjs";

export async function generateMetadata() {
	const { orgSlug } = auth();

	return {
		title: startCase(orgSlug || "organization"),
	};
}

export default function OrganizationIdLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<>
			<OrgControl />
			{children}
		</>
	);
}
