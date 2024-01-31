import { Skeleton } from "@/components/ui/skeleton";
import { OrganizationSwitcher, UserButton, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export async function Actions() {
	const user = await currentUser();

	if (!user) return redirect("/sign-in");

	return (
		<>
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
