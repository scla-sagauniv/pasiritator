export function load({ url }) {
	const userId = url.searchParams.get('userId');
	const ins = url.searchParams.get('ins');

	return { ins: ins, userId: userId};
}
