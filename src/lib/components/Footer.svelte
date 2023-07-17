<script lang="ts">
  import {page} from '$app/stores'
  export let me
</script>

<footer class="w-full justify-center bg-zinc-50 p-3 text-sm sm:p-10">
  <div class="container mx-auto max-w-6xl">
    <div
      class="flex flex-col sm:flex-row items-center justify-center sm:justify-between text-sm text-zinc-500 gap-5 md:justify-between">
      <p class="text-center sm:text-left flex flex-col sm:flex-row gap-1">
				<span>
					© Copyright 2023 {$page.data.store?.websiteName}
				</span>
      </p>

      <div class="flex items-center justify-center gap-4">
        <a
          href="/contact-us"
          aria-label="Click to visit this page"
          class="font-bold uppercase text-primary-500 transition duration-300 hover:text-primary-700">
          Contact Us
        </a>

      </div>
    </div>
  </div>
</footer>
