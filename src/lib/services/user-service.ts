import {error} from '@sveltejs/kit'

export const loginService = async ({
                                     email,
                                     password,
                                   }: any) => {
  try {
    return await (await fetch('http://localhost:3000/api/my-profile.json')).json()
  } catch (e) {
    if (e.status === 401) e.message = 'email or password is invalid'
    throw error(e.status, e.data?.message || e.message)
  }
}


export const logoutService = async () => {
  try {
    console.log('User Logout')
    return null
  } catch (e) {
    throw error(e?.status || 500, e.data?.message || e.message)
  }
}


