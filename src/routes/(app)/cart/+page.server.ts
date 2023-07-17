import { error, fail, redirect } from '@sveltejs/kit'
import type { Action, Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url, request, locals, cookies, depends }) => {
	depends('cart:my')
	let loading = false
	try {
		loading = true
    const products = await (await fetch(`${locals.origin}/api/products.json`)).json()
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
    locals.cart = returnObj
    locals.cartId = returnObj.cartId
    locals.cartQty = returnObj.qty
    cookies.set('cartId', returnObj.cartId, {path: '/'})
    cookies.set('cartQty', String(returnObj.qty), {path: '/'})
  } catch (e) {
		if (e?.status === 401) {
			throw redirect(307, '/auth/login')
		}
		throw error(400, e?.body?.message || e)
	} finally {
		loading = false
	}

	return { loadingCart: loading, cart: locals.cart }
}

const add: Action = async ({request, cookies, locals}) => {
  const data = await request.formData()
  const pid = data.get('pid')
  const qty = +data.get('qty')
  if (typeof pid !== 'string' || !pid) {
    return fail(400, {invalid: true})
  }
  const products = await (await fetch(`${locals.origin}/api/products.json`)).json()
  const existingCart = cookies.get('cart') ? JSON.parse(cookies.get('cart')) : {}
  existingCart[pid] = {qty: (existingCart[pid] ? existingCart[pid].qty : 0) + qty}
  if (existingCart[pid].qty === 0 || qty === -9999999) {
    delete existingCart[pid]
  }
  cookies.set('cart', JSON.stringify(existingCart));

  try {
    if (existingCart) {
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

      locals.cart = returnObj
      locals.cartId = returnObj.cartId
      locals.cartQty = returnObj.qty
      cookies.set('cartId', returnObj.cartId, {path: '/'})
      cookies.set('cartQty', String(returnObj.qty), {path: '/'})
      return returnObj
    } else {
      return {}
    }
  } catch (e) {
    return {}
  }
}

export const actions: Actions = { add }
