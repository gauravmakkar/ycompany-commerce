<script>
import { page } from '$app/stores'
import { toast } from '$lib/utils'
import { Error } from '$lib/components'
import { TextboxFloating, TextareaFloating, PrimaryButton } from '$lib/ui'

let seoProps = {
	title: `Contact Us`,
	description: `Contact Us`
}

let fullName
let email
let phone
let message
let loading = false
let err

async function submitContactInformation() {
	try {
		err = null
		loading = true

		toast('You have successfully contacted with us', 'success')

		fullName = null
		email = null
		phone = null
		message = null
	} catch (e) {
		err = e
	} finally {
		loading = false
	}
}
</script>

<section class="min-h-screen px-3 py-5 sm:p-10">
	<div class="container mx-auto w-full max-w-6xl">
		<!-- Contact Us -->

		<div class="mb-5 text-center sm:mb-10">
			<h1 class="mb-2 font-serif text-2xl font-medium md:text-3xl lg:text-4xl">Contact Us</h1>

			<p class="text-sm text-zinc-500">Any queation or remarks? Just write us a message!</p>
		</div>

		<div class="grid grid-cols-1 rounded-xl border shadow-lg xl:grid-cols-3">
			<div class="col-span-1 m-2 overflow-hidden rounded-xl bg-primary-500 p-5 text-white sm:p-10">
				<h2 class="mb-2 text-xl font-semibold sm:text-2xl">Contact Information</h2>

				<p class="mb-5 text-sm text-zinc-200 sm:text-base">
					Fill up the form and our Team will get back to you within 24 hours.
				</p>

				{#if $page.data.store?.phone || $page.data.store?.email || $page.data.store?.address}
					<ul class="mb-5 flex flex-col gap-4">
						{#if $page.data.store?.phone}
							<li class="flex gap-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="mt-0.5 h-6 w-6"
									viewBox="0 0 20 20"
									fill="currentColor">
									<path
										d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
									></path>
								</svg>

								<p class="flex-1">{$page.data.store?.phone}</p>
							</li>
						{/if}

						{#if $page.data.store?.email}
							<li class="flex gap-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="mt-0.5 h-6 w-6"
									viewBox="0 0 20 20"
									fill="currentColor">
									<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
									></path>
									<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
								</svg>

								<p class="flex-1">{$page.data.store?.email}</p>
							</li>
						{/if}

						{#if $page.data.store?.address}
							<li class="flex gap-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="mt-0.5 h-6 w-6"
									viewBox="0 0 20 20"
									fill="currentColor">
									<path
										fill-rule="evenodd"
										d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
										clip-rule="evenodd"></path>
								</svg>

								<p class="flex-1">
									{@html $page.data.store?.address}
								</p>
							</li>
						{/if}
					</ul>
				{/if}

			</div>

			<form
				on:submit|preventDefault="{submitContactInformation}"
				class="col-span-1 flex flex-col gap-5 p-5 sm:p-10 xl:col-span-2">
				<Error err="{err}" />

				<TextboxFloating
					type="text"
					label="Full Name"
					required
					class="col-span-1 w-full"
					bind:value="{fullName}" />

				<div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
					<TextboxFloating
						type="text"
						label="Email"
						required
						class="col-span-1 w-full"
						bind:value="{email}" />

					<TextboxFloating
						type="tel"
						label="Phone"
						required
						class="col-span-1 w-full"
						bind:value="{phone}" />
				</div>

				<TextareaFloating
					label="Write your message here..."
					class="w-full"
					required
					bind:value="{message}" />

				<div class="flex justify-end">
					<PrimaryButton type="submit" loading="{loading}" class="px-10 uppercase">
						submit
					</PrimaryButton>
				</div>
			</form>
		</div>
	</div>
</section>
