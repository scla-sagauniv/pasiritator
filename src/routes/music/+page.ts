export function load({ url }) {
	const userId = url.searchParams.get('userId') || '/music';
	return {
		props: {
			userId
		}
	};
}
