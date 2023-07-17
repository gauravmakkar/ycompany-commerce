<script>
import MyOrder from './_MyOrder.svelte'

const seoProps = {
	title: 'Orders ',
	description: 'Orders '
}

export let data
</script>

<section>
	<MyOrder orders="{data}" />
</section>
