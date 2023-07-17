import type { RequestEvent } from '@sveltejs/kit'

export const fetchCart = async (event: RequestEvent) => {
	try {
		const cartId: string | undefined = event.cookies.get('cartId')
		const cartQty: string | undefined = event.cookies.get('cartQty')
		if (cartId) event.locals.cartId = cartId
		if (cartQty) event.locals.cartQty = +cartQty

	} catch (e) {
		return null
	}
}
