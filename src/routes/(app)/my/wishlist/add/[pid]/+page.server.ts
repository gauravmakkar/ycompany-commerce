import { WishlistService } from '$lib/services'
import { redirect } from '@sveltejs/kit'

export async function load({ locals, cookies, params, request }) {
	const pid = params.pid
	const storeId = locals.store?.id
	const sid = locals.sid
  const wishlistIds= cookies.get('wishlist')? cookies.get('wishlist').split(',') : []
	const isExistInWishlist = await WishlistService.checkWishlist({pid, wishlistIds})

	if (!isExistInWishlist) {
		await WishlistService.toggleWishlistService({
			pid: pid,
			vid: pid,
			storeId,
			sid,
			origin: locals.origin,
			server: true
		})
	}
	throw redirect(307, '/my/wishlist')
}
