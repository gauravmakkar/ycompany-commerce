<script>
import {
	CategoriesMobile,
	CategoriesSlider,
	Hero,
	PickedBanners
} from '$lib/theme-config'
import {
	Footer,
	MobileFooter,
	PopularProductsHome,
} from '$lib/components'
import { onMount } from 'svelte'
import { page } from '$app/stores'
import { TrendingProductsHome } from '$lib/theme-config'
import Cookie from 'cookie-universal'
import dayjs from 'dayjs'
import PincodeInputBox from '$lib/themes/PincodeInputBox.svelte'

const cookies = Cookie()
let today = dayjs(new Date()).toISOString()

export let data
// console.log('$page', $page)

let seoProps = {
	// addressCountry: 'India',
	// addressLocality: 'Semiliguda, Koraput',
	// addressRegion: 'Odisha',
	// alternateJsonHref: '',
	// alternateXml: { title: '', href: '' },
	brand: $page.data.store?.title,
	// breadcrumbs: '',
	caption: $page.data.store?.title,
	category: $page.data.store?.title,
	contentUrl: $page.data.store?.logo,
	createdAt: today,
	// depth: { unitCode: '', value: '' },
	email: `${$page?.data?.store?.email}`,
	// entityMeta: '',
	// facebookPage: '',
	// gtin: '',
	// height: '',
	id: $page?.url?.href,
	image: $page.data.store?.logo,
	logo: $page.data.store?.logo,
	ogSquareImage: { url: '', width: 56, height: 56 },
	openingHours: ['Monday,Tuesday,Wednesday,Thursday,Friday,Saturday 08:00-13:00'],
	// popularity: product.popularity,
	// postalCode: '764036',
	// price: product.price,
	// priceRange: `${product.price}-${product.mrp}`,
	// ratingCount: 1,
	// ratingValue: +product.ratings + 1,
	// sku: product.sku,
	// streetAddress: 'Padmajyoti Marg, Nandapur Road',
	timeToRead: 0,
	updatedAt: today,
	// weight: { unitCode: '', value: '' },
	// width: { unitCode: '', value: '' },
	// wlwmanifestXmlHref: '',
	metaDescription: $page.data.store?.metaDescription,
	// article: false,
	canonical: `${$page?.url.href}`,
	datePublished: today,
	description: $page.data.store?.description,
	dnsPrefetch: `//cdn.jsdelivr.net`,
	// entityMeta: null,
	featuredImage: {
		url: $page.data.store?.logo,
		width: 675,
		height: 380,
		caption: $page.data.store?.title
	},
	lastUpdated: today,
	msapplicationTileImage: $page.data.store?.logo,
	ogImage: { url: $page.data.store?.logo, width: 128, height: 56 },
	ogImageSecureUrl: `${$page?.data?.store?.logo}`,
	ogImageType: 'image/jpeg',
	// productAvailability: `${product.stock}`,
	productBrand: $page.data.store?.title,
	productName: $page.data.store?.title,
	// productPriceAmount: `${product.price}`,
	productPriceCurrency: `${$page?.data?.store?.currencyCode}`,
	slug: `/`,
	// timeToRead: 0,
	title: $page.data.store?.title,
	twitterImage: { url: $page.data.store?.logo }
}

let showPinCodeEntryModal = false

onMount(() => {
	const pin = cookies.get('zip')

	if (pin && pin.toString()?.length === 6) {
		showPinCodeEntryModal = false
	} else {
		showPinCodeEntryModal = true
	}

	// console.log('pin, showPinCodeEntryModal', pin, pin.toString()?.length, showPinCodeEntryModal)
})
</script>


<div class="bg-opacity-25 bg-center bg-repeat min-h-screen">
	<div class="mb-14 lg:mb-0">
		<!-- Categories slider mobile -->

		{#await data.streamed.home then home}
			{#if home?.categories?.length}
				<div class="block sm:hidden">
					<CategoriesMobile loading="{home.isFetching}" categories="{home?.categories}" />
				</div>
			{/if}
		{/await}

		<!-- Main slider banner -->

		{#await data.streamed.home}
			<div class="h-96 w-full bg-zinc-200 animate-pulse"></div>
		{:then home}
			<Hero banners="{home.banners}" />
			<!-- <div class="h-96 w-full bg-red-500 animate-pulse"></div> -->
		{/await}

		<!-- top categories -->

		{#await data.streamed.home}
			<ul class="flex flex-wrap gap-3 justify-center p-3 py-5 md:py-10">
				{#each { length: 10 } as _}
					<li class="h-24 w-24 shrink-0 rounded-full lg:h-28 lg:w-28 bg-zinc-200 animate-pulse">
					</li>
				{/each}
			</ul>
		{:then home}
			{#if home?.categories?.length}
				<div class="hidden sm:block">
					<!-- <CategoriesHome categories="{data.home?.categories}" /> -->

					<CategoriesSlider title="Shop by categories" categories="{home?.categories}" />

					<!-- <h2
						class="p-3 py-5 text-center font-serif text-xl font-medium uppercase tracking-wider sm:px-10 sm:text-2xl md:py-10 md:text-3xl xl:text-4xl">
						TOP COLLECTIONS
					</h2>

					<div class="max-w-screen overflow-x-auto scrollbar-none lg:hidden">
						<div class="flex flex-row">
							{#each data.home?.categories as category}
								{#if category?.img || category?.img}
									<a
										href="/{category.link || category.slug || '##'}"
										aria-label="Click to get the category related products"
										class="shrink-0">
										<LazyImg
											src="{category.img || category.img}"
											alt=""
											width="160"
											height="160"
											aspect_ratio="1:1"
											class="w-40 object-contain" />
									</a>
								{/if}
							{/each}
						</div>
					</div>

					<div class="hidden grid-cols-12 lg:grid">
						{#each data.home?.categories as category}
							{#if category?.img || category?.img}
								<a
									href="/{category.link || category.slug || '##'}"
									aria-label="Click to get the category related products"
									class="col-span-1">
									<LazyImg
										src="{category.img || category.img}"
										alt=""
										width="375"
										aspect_ratio="1:1"
										class="h-full w-full object-contain" />
								</a>
							{/if}
						{/each}
					</div> -->
				</div>
			{/if}
		{/await}

		<!-- Picked banners -->

		{#await data.streamed.home}
			<div class="grid grid-cols-2 items-center gap-2 md:grid-cols-4">
				<div class="col-span-2 h-40 animate-pulse rounded bg-zinc-200 sm:h-60"></div>

				<div class="col-span-2 h-40 animate-pulse rounded bg-zinc-200 sm:h-60"></div>

				<div class="col-span-1 h-40 animate-pulse rounded bg-zinc-200 sm:h-60"></div>

				<div class="col-span-1 h-40 animate-pulse rounded bg-zinc-200 sm:h-60"></div>

				<div class="col-span-2 h-40 animate-pulse rounded bg-zinc-200 sm:h-60"></div>
			</div>
		{:then home}
			{#if home.groupByBanner?.length > 0}
				<PickedBanners banners="{home.groupByBanner}" />
			{/if}
		{/await}

		<!-- Popular products -->

		<PopularProductsHome data="{data}" />

		<!-- Trending products -->

		<TrendingProductsHome data="{data}" />

	</div>

	<div class="block lg:hidden mb-14 lg:mb-0">
		<Footer me="{data.me}" />
	</div>

	<!-- MOBILE FOOTER -->

	<div class="block lg:hidden">
		<MobileFooter />
	</div>
</div>
