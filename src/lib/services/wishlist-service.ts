import { error } from '@sveltejs/kit'
import Cookie from 'cookie-universal'
const isServer = import.meta.env.SSR
const cookies = Cookie()
export const fetchWishlist = async ({wishlistIds}: any) => {
  try {
    let response
    if(isServer){
      response= wishlistIds
    }else{
      response= cookies.get('wishlist')? cookies.get('wishlist').split(',') : []
    }
    const products = await (await fetch('http://localhost:3000/api/products.json')).json()
    const wishlist = response.map((wish, index) => {
      const w: any = {}
      w._id = index
      w.active= true
      w.product = products.data.find((p) => p._id === wish)
      return w
    })
    return wishlist || []
  } catch (e) {
    throw error(e.status, e.data?.message || e.message)
  }
}

export const checkWishlist = async ({ pid, wishlistIds}) => {
	try {
	  let response
    if(isServer){
      response= wishlistIds
    }else{
      response= cookies.get('wishlist')? cookies.get('wishlist').split(',') : []
    }
    return !!response.includes(pid)
  } catch (e) {
		return false
	}
}

export const toggleWishlistService = async ({pid}) => {
	try {
    const currentWishlist = cookies.get('wishlist')? cookies.get('wishlist').split(','): []
    const exists = !!currentWishlist.find((c)=> c === pid)
		let update = currentWishlist
    let value
		if(exists){
      update = currentWishlist.filter((i)=> i!==pid)
      value= false;
    }else{
		  value= true;
		  update.push(pid)
    }
		await cookies.set('wishlist', update.join(','))
    return value
	} catch (e) {
	  throw error(e.status, e.data?.message || e.message)
	}
}
