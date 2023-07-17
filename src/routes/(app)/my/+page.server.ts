import { OrdersService, WishlistService } from '$lib/services'
import { error } from '@sveltejs/kit'

export async function load({ cookies, locals }) {
	try {
		const orders = await OrdersService.fetchOrders()

		const wishlists = await WishlistService.fetchWishlist({
			sid: cookies.get('connect.sid'),
			storeId: locals.store?.id
		})

		return { orders, wishlists }

	} catch (e) {
		throw error(400, e?.message)
	}
}
