<script>
import { MobileFooter } from '$lib/components'
import Wishlist from './_Wishlist.svelte'

export let data

let seoProps = {
	title: `Wishlist`,
	description: `Wishlist`
}
</script>

<section>
	<div class="mb-20">
		<Wishlist wishlistedProducts="{data.wishlistedProducts}" />
	</div>

	<!-- MOBILE FOOTER -->

	<div class="block lg:hidden">
		<MobileFooter />
	</div>
</section>
