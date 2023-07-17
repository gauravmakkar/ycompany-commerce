import { OrdersService } from '$lib/services'
import { error } from '@sveltejs/kit'

export async function load({ locals, cookies }) {
	try {
		const res = await OrdersService.fetchOrders()

    if (res) {
			return res
		}
	} catch (e) {
		throw error(400, e?.message)
	}
	throw error(404, 'Orders not found')
}
