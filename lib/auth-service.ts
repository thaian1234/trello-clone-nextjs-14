import { currentUser } from "@clerk/nextjs";

export const getSelf = async () => {
	const self = await currentUser();

	if (!self) {
		throw new Error("Unauthorized");
	}

	return self;
};
