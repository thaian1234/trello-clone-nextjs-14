"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";
import { NavItem, NavItemSkeleton, Organization } from "./nav-item";

interface SidebarProps {
	storageKey?: string;
}

export function Sidebar({ storageKey = "t-sidebar-state" }: SidebarProps) {
	const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
		storageKey,
		{}
	);
	const { organization: activeOrganization, isLoaded: isLoadedOrg } =
		useOrganization();
	const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
		userMemberships: {
			infinite: true,
		},
	});

	const defaultAccordianValue: string[] = Object.keys(expanded).reduce(
		(acc: string[], key: string) => {
			if (expanded[key]) {
				acc.push(key);
			}

			return acc;
		},
		[]
	);

	const onExpand = (id: string) => {
		setExpanded((curr) => ({ ...curr, [id]: !expanded[id] }));
	};

	if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
		return <NavbarSkeleton />;
	}

	return (
		<>
			<div className="font-medium text-xs flex items-center mb-1">
				<span className="pl-4">Workspaces</span>
				<Button
					variant="ghost"
					size="icon"
					type="button"
					asChild
					className="ml-auto"
				>
					<Link href="/select-org">
						<Plus className="size-4" />
					</Link>
				</Button>
			</div>

			<Accordion
				type="multiple"
				defaultValue={defaultAccordianValue}
				className="space-y-2"
			>
				{userMemberships.data.map(({ organization }) => (
					<NavItem
						key={organization.id}
						isActive={activeOrganization?.id === organization.id}
						isExpanded={expanded[organization.id]}
						onExpand={onExpand}
						organization={organization as Organization}
					/>
				))}
			</Accordion>
		</>
	);
}

export function NavbarSkeleton() {
	return (
		<>
			<div className="flex items-center justify-between mb-2">
				<Skeleton className="h-10 w-[50%]" />
				<Skeleton className="size-10" />
			</div>
			<div className="space-y-4">
				<NavItemSkeleton />
				<NavItemSkeleton />
				<NavItemSkeleton />
			</div>
		</>
	);
}
