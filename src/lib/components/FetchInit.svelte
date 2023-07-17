<script>
import { onMount } from 'svelte'
import Cookie from 'cookie-universal'
import { page } from '$app/stores'

const cookies = Cookie()

onMount(async () => {
  const response = await fetch(`${$page.data.store.domain}/api/init.json`)

	const res = await response.json()

	const { storeOne } = res

	cookies.set('store', JSON.stringify(storeOne), { path: '/' })
})
</script>
