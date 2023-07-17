import { error } from '@sveltejs/kit'

export const fetchCountries = async () => {
	try {

	  return await (await fetch('http://localhost:3000/api/countries.json')).json()
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}

