import { InitService } from '$lib/services'

export async function GET({ cookies, request, locals }) {
	let storeOne, settings, popularSearches, megamenu, store
	try {
		const uri = new URL(request.url)
    console.log('Hello')

		const storeRes = await InitService.fetchInit(uri.host)

		storeOne = storeRes.storeOne
		settings = storeRes.settings
		popularSearches = storeRes.popularSearches
		megamenu = storeRes.megamenu

		store = {
			id: storeRes.storeOne._id,
			address: storeRes.storeOne.address,
			alert: storeRes.storeOne.alert,
			close: storeRes.storeOne.close,
			currencyCode: storeRes.storeOne.storeCurrency?.isoCode || 'USD',
			currencySymbol: storeRes.storeOne.storeCurrency?.symbol || '$',
			description: storeRes.storeOne.description,
			dimentionUnit: storeRes.storeOne.dimentionUnit,
			domain: storeRes.storeOne.domain,
			DOMAIN: storeRes.storeOne.DOMAIN,
			email: storeRes.storeOne.websiteEmail,
			IMAGE_CDN_URL: storeRes.storeOne.IMAGE_CDN_URL,
			isBulkOrder: storeRes.storeOne.isBulkOrder,
			isFnb: storeRes.storeOne.isFnb,
			isGDPR: storeRes.storeOne.isGDPR,
			isIndianPincodes: storeRes.storeOne.isIndianPincodes,
			isProductReviewsAndRatings: storeRes.storeOne.isProductReviewsAndRatings,
			isSecureCatalogue: storeRes.storeOne.isSecureCatalogue,
			isWishlist: storeRes.storeOne.isWishlist,
			loginUrl: '/auth/login',
			logo: storeRes.storeOne.logo,
			otpLogin: storeRes.storeOne.otpLogin || true,
			phone: storeRes.storeOne.phone,
			product_image_dimension: storeRes.storeOne.product_image_dimension,
			searchbarText: storeRes.storeOne.searchbarText,
			storePromoVideo: storeRes.storeOne.storePromoVideo,
			title: storeRes.storeOne.title,
			websiteName: storeRes.storeOne.websiteName,
			weightUnit: storeRes.storeOne.weightUnit,
		}
		cookies.set('store', JSON.stringify(store), { path: '/' })
		locals.store = store
	} catch (e) { }

	return new Response(JSON.stringify({ storeOne, settings, popularSearches, megamenu }))
}
