import { writable } from 'svelte/store'

export const geoLocation = writable({
	selectedPrediction: null,
	locality: null,
	city: null,
	state: null,
	country: null,
	lat: 0,
	lng: 0
})
export const settings = writable({})
export const loginUrl = writable('/auth/login')
export const loadingDelayed = writable(false)

