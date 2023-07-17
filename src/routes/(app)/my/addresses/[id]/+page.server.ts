import { AddressService, CountryService } from '$lib/services'

export const prerender = false

export async function load({ cookies, locals, params, url }) {
	const { store } = locals
	const { id } = params
	// const prescriptionId = url.searchParams.get('prescription')
	let address = {}
	let countries = []
	let states = []

	if (id === 'new') {
		address = { id: 'new', country: null, state: null }
	} else {
		address = await AddressService.fetchAddress({
			id,
      domain: locals.origin
		})
	}

	countries = await CountryService.fetchCountries()

	if (address?.country) {
    const country = countries.find((a)=> a.code === address.country)
    states = country.states
	}

	return { address, countries, states }
}
