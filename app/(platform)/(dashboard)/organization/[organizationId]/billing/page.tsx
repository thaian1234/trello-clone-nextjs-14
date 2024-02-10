import { checkSubcription } from "@/lib/subscription";
import { Info } from "../_components/info";
import { Separator } from "@/components/ui/separator";
import { SubcriptionButton } from "./_components/subcription-button";

export default async function BillingPage() {
	const isPro = await checkSubcription();

	return (
		<div className="w-full">
			<Info isPro={isPro} />
			<Separator className="my-2" />
			<SubcriptionButton isPro={isPro} />
		</div>
	);
}
