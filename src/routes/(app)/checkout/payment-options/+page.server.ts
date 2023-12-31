import { redirect } from '@sveltejs/kit'
import { AddressService, CartService, PaymentMethodService } from '$lib/services'

export const prerender = false

export async function load({ params, parent, locals, url, request, cookies }) {
	const { me } = locals

	if (!me) {
		const redirectUrl = `${locals.store?.loginUrl || '/auth/login'}?ref=${url?.pathname}`
		throw redirect(307, redirectUrl)
	}

	const cart: any = await CartService.fetchRefreshCart({cookies: cookies, domain: locals.origin})

	locals.cart = cart

	try {
		const id = url.searchParams.get('address')

		const address = await AddressService.fetchAddress({
			id,
      domain: locals.origin
		})

		const paymentMethods = await PaymentMethodService.fetchPaymentMethods({
			storeId: locals.store.id,
			server: true,
			sid: cookies.get('connect.sid')
		})

		return { paymentMethods, address, addressId: id, me, cart }
	} catch (e) {
		if (e) {
			throw redirect(307, '/checkout/address')
		}
	}
}
