import {
	id,
	address,
	alert,
	currencyCode,
	currencySymbol,
	description,
	dimentionUnit,
	domain,
	DOMAIN,
	email,
	loginUrl,
	logo,
	phone,
	searchbarText,
	siteTitle,
	websiteName,
	weightUnit,
	IMAGE_CDN_URL
} from '$lib/config'
import { fetchInit } from './init-service'

export const getStoreData = async ({
	cookieStore,
	cookieMegamenu,
	url,
	cookies,
	server = false,
	sid = null
}: any) => {
	let storeRes: any = {}

	let store = {
		id,
		address,
		alert,
		close: {},
		currencyCode,
		currencySymbol,
		description,
		dimentionUnit,
		domain,
		DOMAIN,
		email,
		IMAGE_CDN_URL: IMAGE_CDN_URL,
		isBulkOrder: false,
		isDeals: false,
		isFnb: false,
		isGDPR: false,
		isIndianPincodes: false,
		isProductReviewsAndRatings: false,
		isSecureCatalogue: false,
		isWishlist: false,
		loginUrl,
		logo,
		otpLogin: false,
		phone,
		product_image_dimension: null,
		searchbarText,
		storePromoVideo: {},
		title: siteTitle,
		websiteName,
		weightUnit,
	}

	let megamenu = null

	if (
		!cookieStore ||
		cookieStore === 'undefined' ||
		!cookieMegamenu ||
		cookieMegamenu == 'undefined'
	) {
		const uri = new URL(url)

		storeRes = await fetchInit()

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
			isDeals: storeRes.storeOne.isDeals,
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
			weightUnit: storeRes.storeOne.weightUnit
		}

		megamenu = storeRes.megamenu

	} else {
		store = JSON.parse(cookieStore)
		megamenu = JSON.parse(cookieMegamenu)
	}

	storeRes.storeOne = store
	storeRes.megamenu = megamenu

	return storeRes
}
