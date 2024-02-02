import { Skeleton } from "@/components/ui/skeleton";
import {
	ClerkLoaded,
	ClerkLoading,
	OrganizationSwitcher,
	UserButton,
} from "@clerk/nextjs";

export function Actions() {
	return (
		<>
			<ClerkLoading>
				<ActionsSkeleton />
			</ClerkLoading>
			<ClerkLoaded>
				<OrganizationSwitcher
					hidePersonal
					afterCreateOrganizationUrl="/organization/:id"
					afterSelectOrganizationUrl="/organization/:id"
					afterLeaveOrganizationUrl="/select-org"
					appearance={{
						elements: {
							rootBox: {
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							},
						},
					}}
				/>
				<UserButton
					afterSignOutUrl="/"
					appearance={{
						elements: {
							avatarBox: {
								height: 35,
								width: 35,
							},
						},
					}}
				/>
			</ClerkLoaded>
		</>
	);
}

export function ActionsSkeleton() {
	return (
		<>
			<Skeleton className="h-[35px] w-32" />
			<Skeleton className="size-[35px] rounded-full" />
		</>
	);
}
