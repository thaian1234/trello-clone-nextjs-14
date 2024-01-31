import { Sidebar } from "../_components/sidebar";

export default function OrganizationLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="pt-20 md:pt-24 px-4 max-w-6xl xl:max-w-screen-2xl mx-auto">
			<div className="flex gap-x-7">
				<aside className="w-64 shrink-0 hidden md:block">
					<Sidebar />
				</aside>
				{children}
			</div>
		</main>
	);
}
