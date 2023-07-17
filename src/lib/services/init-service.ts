import { error } from '@sveltejs/kit'

export const fetchInit = async () => {
	try {
		return await (await fetch('http://localhost:3000/api/init.json')).json() || {}
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}
