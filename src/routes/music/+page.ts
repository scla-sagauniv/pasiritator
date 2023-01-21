export function load({ url }) {
	const userId = url.searchParams.get('userId');

	return { userId: userId };
}
