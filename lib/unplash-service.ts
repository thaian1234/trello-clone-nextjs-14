import { createApi } from "unsplash-js";

export const unsplash = createApi({
	accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!,
	fetch: fetch,
});

export const getUnplashImages = async () => {
	const resp = await unsplash.photos.getRandom({
		collectionIds: ["317099"],
		count: 9,
	});
	return resp.response as Array<Record<string, any>>;
};
