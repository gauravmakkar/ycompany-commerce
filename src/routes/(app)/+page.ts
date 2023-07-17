import { HomeService } from '$lib/services'
const isServer = import.meta.env.SSR

export async function load({ parent }) {
	const { store, origin } = await parent()

	return {
		streamed: {
			home: HomeService.fetchHome({ origin, storeId: store?.id, server: isServer }),
    },

		origin
	}
}
