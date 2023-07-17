import { error } from '@sveltejs/kit'

export const fetchAddresses = async ({domain}) => {
	try {
    let selectedAddress = {}
		let myAddresses = []

		const res = await (await fetch(`${domain}/api/my-addresses.json`)).json();
		selectedAddress = res[0]?._id
		myAddresses = res || []
    return { myAddresses: { data: myAddresses }, selectedAddress, count: res?.count }
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}

export const fetchAddress = async ({id, domain }: {id: string; domain: string}) => {
	try {
		const res = await (await fetch(`${domain}/api/my-addresses.json`)).json();
    return res.find((a)=> a._id===id) || {}
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}

export const saveAddress = async ({domain, ...newAddress}) => {
	try {
	  console.log('will save ', newAddress)
    const res = await (await fetch(`${domain}/api/my-addresses.json`)).json();
    return res[0]
	} catch (err) {
		throw error(err.status, err.message)
	}
}
