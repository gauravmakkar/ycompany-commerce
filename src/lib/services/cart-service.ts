import { del, getAPI, post } from '$lib/utils/api'
import { error } from '@sveltejs/kit'
import { getBySid, postt } from '$lib/utils/server'
const isServer = import.meta.env.SSR

export const fetchRefreshCart = async ({ cookies, domain }) => {
	try {
    const products = await (await fetch(`${domain}/api/products.json`)).json()
    const existingCart = cookies.get('cart') ? JSON.parse(cookies.get('cart')) : {}
    const returnObj = {
      cartId: '1234',
      items: [],
      qty: 0,
      tax: 0,
      subtotal: 0,
      total: 0,
      currencySymbol: "₹",
      discount: {
        amount: 0,
        code: ''
      },
      savings: 0,
      selfTakeout: false,
      shipping: {
        charge: 0
      },
      unavailableItems: [],
      formattedAmount: {
        subtotal: '',
        total: ''
      }
    }
    Object.keys(existingCart).forEach((productId) => {
      const product = products.data.find((p) => p._id === productId)
      product.formattedItemAmount={
        price: returnObj.currencySymbol+product.price,
        mrp: returnObj.currencySymbol+product.mrp
      }
      product.qty= existingCart[productId].qty;
      product.pid= product._id;
      returnObj.items.push(product)
      returnObj.qty = returnObj.qty + existingCart[productId].qty
      returnObj.subtotal = returnObj.subtotal + existingCart[productId].qty * product.price
      returnObj.total = returnObj.total + existingCart[productId].qty * product.price
      returnObj.savings = returnObj.savings + existingCart[productId].qty * product.mrp - existingCart[productId].qty * product.price
      returnObj.formattedAmount = {
        subtotal: returnObj.currencySymbol + returnObj.subtotal,
        total: returnObj.currencySymbol + returnObj.total
      }
    })
    return returnObj
	} catch (err) {
		return {}
		// const e = err as Error
		// throw error(e.status, e.data?.message)
	}
}
export const fetchMyCart = async ({ origin, storeId, server = false, sid = null }) => {
	try {
		let res = {}

		if (isServer) {
			res = await getBySid(`carts/my?store=${storeId}`, sid)
		} else {
			res = await getAPI(`carts/my?store=${storeId}`, origin)
		}

		return res || {}
	} catch (e) {
		throw error(e.status, e.message)
	}
}

export const addToCartService = async ({
	pid,
	vid,
	qty,
	customizedImg = null,
	customizedData = null,
	origin,
	options = null,
	storeId,
	server = false,
	sid = null,
	cookies
}) => {
	try {
		let res = {}
		if (isServer) {
			res = await postt(
				`carts/add-to-cart`,
				{
					pid,
					vid,
					qty,
					customizedImg,
					store: storeId,
					customizedData,
					options
				},
				cookies
			)
		} else {
			res = await post(
				`carts/add-to-cart`,
				{
					pid,
					vid,
					qty,
					customizedImg,
					store: storeId,
					customizedData,
					options
				},
				origin
			)
		}
		return res || {}
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}

