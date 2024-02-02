import * as React from "react";

import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";

const loaderVariants = cva("animate-spin mr-3 text-black", {
	variants: {
		size: {
			default: "size-6",
			sm: "size-4",
			md: "size-7",
			lg: "size-10",
			xl: "size-16",
		},
	},
	defaultVariants: {
		size: "default",
	},
});

export interface LoaderProps
	extends VariantProps<typeof loaderVariants>,
		React.HTMLAttributes<HTMLDivElement> {}

const Loader = ({ className, size }: LoaderProps) => {
	return <Loader2 className={cn(loaderVariants({ size, className }))} />;
};

Loader.displayName = "Loader";

export { Loader, loaderVariants };
