<style>
.frosted {
	backdrop-filter: blur(12px);
	background-color: hsla(0, 0%, 100%, 0.3);
}
</style>

<script>
import { CtrlS, SingleImageUpload } from '$lib/components'
import { page } from '$app/stores'
import { put } from '$lib/utils/api'
import { toast } from '$lib/utils'
import { WhiteButton } from '$lib/ui'
import Cookie from 'cookie-universal'
import dayjs from 'dayjs'
import Skeleton from '$lib/ui/Skeleton.svelte'
import Textbox from '$lib/ui/Textbox.svelte'

export let data

const seoProps = {
	title: 'Dashboard - Edit Profile ',
	description: 'Edit the profile credentials'
}

const cookies = Cookie()

let loading = false
let formChanged = false
let err = ''

function saveImage(detail) {
	data.profile.avatar = detail
	saveProfile()
}

function removeImage(detail) {
	data.profile.avatar = ''
	saveProfile()
}

async function saveProfile() {
	try {
		loading = true

		let e = { ...data.profile }
		e.company = 1
		e.store = data.store?.id

		toast('Saving Profile Info...', 'warning')

		if (e.dob) e.dob = dayjs(e.dob).format('YYYY-MM-DDTHH:mm')
		else e.dob = null
		// delete e.phone

		data.profile = e

		if (data.profile) {
			data.profile.dob = data.profile.dob ? dayjs(data.profile.dob).format('YYYY-MM-DD') : null
			formChanged = false
			toast('Profile Info Saved.', 'success')
		}

		await cookies.set('me', data.profile, { path: '/' })


	} catch (e) {
		err = e
		toast(e, 'error')
	} finally {
		loading = false
	}
}
</script>

<section>
	<header class="mb-5 flex flex-wrap items-start justify-between gap-4">
		<div>
			<div class="flex flex-wrap items-center gap-2">
				<h2 class="text-2xl capitalize sm:text-3xl">Profile</h2>
			</div>

			<!-- <p class="mt-2 text-sm text-zinc-500"></p> -->
		</div>

		<!--  Back button -->

		<div class="flex flex-wrap items-center gap-2">
			<a href="/my" class="block">
				<WhiteButton hideLoading class="group text-xs">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-5 w-5 transform transition duration-300 group-hover:-translate-x-2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"
						></path>
					</svg>

					<div class="flex flex-col gap-0.5 text-left">
						<span class="hidden text-xs font-normal text-zinc-500 sm:block"> Prev </span>

						<span>Dashboard</span>
					</div>
				</WhiteButton>
			</a>
		</div>
	</header>

	<div class="max-w-3xl">
		{#if loading}
			<div class="flex flex-col gap-5">
				<Skeleton />
				<Skeleton />
				<Skeleton />
			</div>
		{:else if data.profile}
			<div>
				<form class="mb-5 flex flex-col gap-4 sm:mb-10" on:submit|preventDefault="{saveProfile}">
					<div>
						<div
							class="frosted flex flex-col gap-4 rounded-lg border border-zinc-200 p-4 shadow-lg md:p-6">
							<div class="flex flex-wrap items-center gap-2">
								<SingleImageUpload
									class=""
									avatar
									folder="avatar/{(data.profile?.phone || data.profile?.email)?.replace('+', '')}"
									images="{data.profile.avatar}"
									loading="{loading}"
									on:save="{({ detail }) => saveImage(detail)}"
									on:remove="{({ detail }) => removeImage(detail)}" />

								<div class="w-full max-w-md">
									{#if data.profile.email}
										<span class="mb-1 text-sm font-medium sm:text-lg lg:text-xl">
											{data.profile.email} <br />
										</span>
									{/if}

									<!-- <span class="text-xs capitalize sm:text-sm">
									Role : <b>{data.profile.role || '_'}</b>
								</span> -->
								</div>
							</div>

							<div class="flex flex-wrap gap-2">
								<h6 class="w-52 shrink-0 font-medium">First Name</h6>

								<div class="w-full max-w-md">
									<Textbox
										type="text"
										placeholder="Enter First Name"
										bind:value="{data.profile.firstName}"
										on:input="{() => (formChanged = true)}" />
								</div>
							</div>

							<div class="flex flex-wrap gap-2">
								<h6 class="w-52 shrink-0 font-medium">Last Name</h6>

								<div class="w-full max-w-md">
									<Textbox
										type="text"
										placeholder="Enter Last Name"
										bind:value="{data.profile.lastName}"
										on:input="{() => (formChanged = true)}" />
								</div>
							</div>

							<!-- <div class="flex flex-wrap gap-2">
							<h6 class="w-52 shrink-0 font-medium">Date Of Birth</h6>

							<div class="w-full max-w-md">
								<Textbox
									type="date"
									placeholder="Enter Date Of Birth"
									bind:value="{data.profile.dob}"
									on:input="{() => (formChanged = true)}" />
							</div>
						</div> -->

							<div class="flex flex-wrap gap-2">
								<h6 class="w-52 shrink-0 font-medium">Phone</h6>

								<div class="w-full max-w-md">
									<Textbox
										type="text"
										placeholder="Eg: +91000000000"
										maxlength="13"
										bind:value="{data.profile.phone}"
										on:input="{() => (formChanged = true)}" />
								</div>
							</div>
						</div>
					</div>
				</form>

			</div>
		{/if}
	</div>

	<CtrlS
		loading="{loading}"
		loadingMessage="Updating Profile"
		formChanged="{formChanged}"
		on:save="{() => saveProfile()}" />
</section>
