import { error } from '@sveltejs/kit'

export const fetchHome = async () => {
	try {
		let banners = []
		let categories = {}
		let groupByBanner = {}
		let heroBanners = []
		let res: any = {}

		res = await (await fetch('http://localhost:3000/api/home.json')).json()

		if (res?.banners?.data?.length) {
			banners = res?.banners?.data

			heroBanners =
				res?.banners?.data &&
				res?.banners?.data.filter((b) => {
					return b.type === 'hero'
				})
		}

		if (res?.groupByBanner?.length) {
			groupByBanner = res?.groupByBanner
		}

		if (res?.categories?.data?.length) {
			categories = res?.categories?.data
		}

		return {
			banners,
			brands: res?.brands,
			categories,
			html: res?.html,
			groupByBanner,
			heroBanners,
			trending: res?.trending,
			youMayLike: res?.youMayLike
		}
	} catch (e) {
		throw error(e.status, e.data?.message || e.message || e)
	}
}
