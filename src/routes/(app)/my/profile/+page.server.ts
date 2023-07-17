import { error, redirect } from '@sveltejs/kit'
import dayjs from 'dayjs'

export async function load({ cookies, locals }) {
	const { me, store } = locals
	let profile = {}
  try {
		const data = await (await fetch(`${locals.origin}/api/my-profile.json`)).json()
		data.dob = data.dob ? dayjs(data.dob).format('YYYY-MM-DD') : null
    profile = data || {
			email: me.email,
			firstName: me.firstName || '',
			lastName: me.lastName || ''
		}
	} catch (e) {
		if (e.status === 401) {
			throw redirect(307, store.loginUrl)
		}
		throw error(e.status, e.message)
	} finally {
	}

	if (profile) {
		return { profile, store: store }
	}

	throw redirect(307, store.loginUrl)
}
