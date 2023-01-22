export const prerender = false;
export const ssr = false;
export const csr = true;

export function load({ url }) {
	const userId = url.searchParams.get('userId');
	const ins = url.searchParams.get('ins');

	return { ins: ins, userId: userId };
}
