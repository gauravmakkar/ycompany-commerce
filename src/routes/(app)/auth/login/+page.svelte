<script>
import { browser } from '$app/environment'
import { scale } from 'svelte/transition'
import { goto, invalidateAll } from '$app/navigation'
import { page } from '$app/stores'
import { toast } from '$lib/utils'
import { UserService } from '$lib/services'
import Cookie from 'cookie-universal'
import { LazyImg, Error } from '$lib/components'
import { PrimaryButton } from '$lib/ui'
const cookies = Cookie()

const IS_DEV = import.meta.env.DEV

export let data

const seoProps = {
	title: 'Login with email/phone',
	description: 'Login with email/phone'
}

let email = $page?.url?.searchParams.get('email')
let err
let isEmail = false
let isMobile = false
let loading = false
let maxlength = null
let password = IS_DEV ? 'sakshipuri' : ''
let phone = IS_DEV ? '9910990882' : ''
let ref = $page?.url?.searchParams.get('ref')
let showPassword = false
let type = 'password'
let value = email ? email : IS_DEV ? 'sakshi02@nagarro.com' : null


function togglePassword() {
	showPassword = !showPassword
	if (type === 'password') {
		type = 'text'
	} else type = 'password'
}

const verifyIsMobileNum = () => {
	err = null

  isEmail = true
  isMobile = false
  maxlength = null
}

async function submit() {
	err = null

  try {
    loading = true

    const res = await UserService.loginService({
      email: value,
      password: password
    })

    const me = {
      email: res.email,
      phone: res.phone,
      firstName: res.firstName,
      lastName: res.lastName,
      avatar: res.avatar,
      role: res.role,
      verified: res.verified,
      active: res.active
    }

    await cookies.set('me', me, { path: '/' })
    // $page.data.me = me
    await invalidateAll()
    let r = ref || '/'
    if (browser) goto(r)
  } catch (e) {
    toast(e.body, 'error')
    err = e?.body || e
  } finally {
    loading = false
  }
}
</script>


<div class="flex w-full max-w-md flex-col rounded-2xl border bg-white p-10 shadow-2xl">
	<a href="/" aria-label="Go to home" class="mx-auto mb-8 block max-w-max">
		{#if $page.data.store?.logo}
			<LazyImg
				src="{$page?.data?.store?.logo}"
				alt="logo"
				height="64"
				aspect_ratio="4:1"
				class="max-h-16 w-40 object-contain object-center" />
		{:else}
			<h1
				class="bg-gradient-to-b from-primary-500 to-primary-700 bg-clip-text text-3xl font-extrabold text-transparent underline decoration-zinc-800">
				{#if $page.data.store?.websiteName}
					{$page.data.store?.websiteName}
				{/if}
			</h1>
		{/if}
	</a>

	<h1 class="mb-8 w-full text-center text-2xl font-semibold text-primary-500">Log in</h1>

	<Error err="{err}" />


		<form class="mb-8 flex flex-col gap-5" on:submit|preventDefault="{submit}">
			<!-- Email or mobile number -->

			<label>
				<!-- Heading -->

				<h6 class="mb-1">
					Email or mobile number
				</h6>

				<div class="relative w-full rounded bg-white">
					<!-- Enter email or mobile number -->
          <input
						type="text"
						placeholder="Enter email or mobile number"
						bind:value="{value}"
						maxlength="{maxlength}"
						autofocus
						required
						class="w-full p-3 rounded border border-zinc-200 focus:border-primary-500 focus:outline-none"
						on:input="{verifyIsMobileNum}" />
				</div>


			</label>

			<!-- Email password -->


				<div transition:scale="{{ duration: 100 }}">
					<div class="mb-1 flex items-center justify-between gap-2">
						<label for="password" class="flex-1">Password</label>

						<a
							href="/auth/forgot-password"
							tabindex="-1"
							class="max-w-max text-xs text-zinc-500 focus:outline-none hover:underline">
							Forgot Password
						</a>
					</div>

					<div class="relative w-full rounded bg-white">
						{#if type === 'text'}
							<input
								id="password"
								type="text"
								placeholder="Enter email or mobile number"
								bind:value="{password}"
								required
								class="w-full rounded border border-zinc-200 py-3 pl-3 pr-12 focus:border-primary-500 focus:outline-none" />
						{:else if type === 'password'}
							<input
								id="password"
								type="password"
								placeholder="Enter email or mobile number"
								bind:value="{password}"
								required
								class="w-full rounded border border-zinc-200 py-3 pl-3 pr-12 focus:border-primary-500 focus:outline-none" />
						{/if}

						<button
							type="button"
							tabindex="-1"
							class="absolute inset-y-0 right-0 flex cursor-pointer items-center justify-center px-3"
							on:click="{togglePassword}">
							{#if showPassword}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="h-5 w-5">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
									></path>
								</svg>
							{:else}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="h-5 w-5">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
									></path>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
								</svg>
							{/if}
						</button>
					</div>
				</div>


			<!-- Submit -->

			<PrimaryButton type="submit" loading="{loading}" disabled="{loading}" class="w-full">
					Log in
			</PrimaryButton>
		</form>


</div>
