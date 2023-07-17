import { error } from '@sveltejs/kit'

export const fetchOrders = async () => {
	try {
		const res = await (await fetch('http://localhost:3000/api/my-orders.json')).json()

		return {
			data: res.data || [],
			count: res.count,
			pageSize: res.pageSize,
			noOfPage: res.noOfPage,
			page: res.page
		}
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}

export const fetchOrder = async () => {
	try {
    const res = await (await fetch('http://localhost:3000/api/my-orders.json')).json()

		const order =  res.data[0]
		return order;
	} catch (e) {
	  console.log('error', e)
		throw error(e.status, e.data?.message || e.message)
	}
}

export const fetchTrackOrder = async () => {
	try {
		const res= await (await fetch('http://localhost:3000/api/order-tracking.json')).json()
    return res.data || []
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}

export const paySuccessPageHit = async () => {
	try {
		let res: any = {}

		//TODO: Logic Here

		return res || {}
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}

export const codCheckout = async () => {
	try {
    let res: any = {}

    //TODO: Logic Here
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}

export const cashfreeCheckout = async () => {
	try {
		let res: any = {}

    //TODO: Logic Here

		return res || {}
	} catch (e) {
		throw error(e.status, e.message?.message || e.message)
	}
}

export const razorpayCheckout = async () => {
	try {
    let res: any = {}

    //TODO: Logic Here

		return res || {}
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}

export const razorpayCapture = async () => {
	try {
    let res: any = {}

    //TODO: Logic Here

		return res || {}
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}

export const stripeCheckoutService = async () => {
	try {
    let res: any = {}

    //TODO: Logic Here

		return res || {}
	} catch (e) {
		throw error(e.status, e)
	}
}
