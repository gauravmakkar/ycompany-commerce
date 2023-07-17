import { error } from '@sveltejs/kit'
import { getAPI } from '$lib/utils/api'
import { getBySid } from '$lib/utils/server'
import type { AllProducts, Error, Product } from '$lib/types'
const isServer = import.meta.env.SSR

// Search product

export const searchProducts = async ({
	origin,
	query,
	searchData,
	storeId,
	server = false,
	sid = null
}: any) => {
	try {
		let products: Product[] = []
		let count = 0
		let facets = ''
		let pageSize = 0
		let category = ''
		let err = ''

    const res = await (await fetch('http://localhost:3000/api/products.json')).json()
    console.log('here....')
		products = res.data.map((p) => {
			const p1 = { ...p._source }
			p1.id = p._id
			return p1
		})
		count = res?.count
		facets = res?.facets
		pageSize = res?.pageSize
		err = !res?.estimatedTotalHits ? 'No result Not Found' : null

		return { products, count, facets, pageSize, err }
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}

// Fetch all products

export const fetchProducts = async (d) => {
	try {
	  console.log('hello')
		const res = await (await fetch('http://localhost:3000/api/products.json')).json()
    return res?.data || []
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}

export const fetchReels = async ({
	origin,
	storeId,
	slug,
	id,
	server = false,
	sid = null
}: any) => {
	try {
		let res: AllProducts | {} = {}

		if (isServer) {
			res = await getBySid(`reels?store=${storeId}`, sid)
		} else {
			res = await getAPI(`reels?store=${storeId}`, origin)
		}
		res.data = res.data.map((d) => {
			return { ...d, muted: false }
		})
		return res || {}
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}

// Fetch single product

export const fetchProduct = async ({
	slug,
	id
}) => {
	try {
		const products = await (await fetch('http://localhost:3000/api/products.json')).json()
    const res = products.data.find((product)=> product.slug === slug || product._id === id)
		return res || {}
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}

// Fetch products more requirements

export const fetchProduct2 = async ({
	origin,
	slug,
	storeId,
	id,
	server = false,
	sid = null
}: any) => {
	try {
    const response = await (await fetch('http://localhost:3000/api/products.json')).json()
    const res = response.data.find((product)=> product.slug === slug || product._id === id)
    return res || {}
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}

function findNode(value, key, currentNode) {
  let i,
    currentChild,
    result;

  if (value == currentNode[key]) {
    return currentNode;
  } else {

    // Use a for loop instead of forEach to avoid nested functions
    // Otherwise "return" will not work properly
    for (i = 0; i < currentNode.children.length; i += 1) {
      currentChild = currentNode.children[i];

      // Search in the current child
      result = findNode(value, key, currentChild);

      // Return the result if the node has been found
      if (result !== false) {
        return result;
      }
    }

    // The node has not been found and we have no more options
    return false;
  }
}

// Fetch products based on category

export const fetchProductsOfCategory = async ({
	categorySlug,
	origin,
	query,
	server = false,
	sid = null,
	storeId,
	zip,
}: any) => {
	try {
		let products: Product[] = []
		let count = 0
		let facets = ''
		let pageSize = 0
		let category = ''
		let err = ''

    let res = await (await fetch('http://localhost:3000/api/products.json')).json()
    const categories = await (await fetch('http://localhost:3000/api/master-categories.json')).json()
    let cat
    categories.data.forEach((c)=> {
      if(!cat && c.children && c.children.length>0){
        cat = findNode(categorySlug, 'slug', c)
      }else if(!cat){
        if(c.slug === categorySlug){
          cat = c
        }
      }
    });
		res.data = res.data.filter((p)=> {
		  return cat ? (p.categories.includes(cat._id) || findNode(p.categories[0], '_id', cat)): true
    })
    let params = new URLSearchParams(query);
		let entries = params.entries();
    const filters= Object.fromEntries(entries);
    if(filters.genders){
      const genders = filters.genders.split(',')
      res.data = res.data.filter((p)=> genders.includes(p.gender))
    }
    if(filters.discount){
      const discounts = filters.discount.split(',')
      res.data = res.data.filter((p)=> p.discount >= discounts[0])
    }
    if(filters.q){
      res.data = res.data.filter((p)=> p.name.toLowerCase().includes(filters.q.toLowerCase()))
    }

    products = res?.data?.map((p) => {
			const p1 = { ...p }
			p1.id = p._id
			return p1
		})

		count = products.length
    facets = res?.facets
    facets.all_aggs.doc_count= products.length
    facets.all_aggs.discount.doc_count= products.filter((p)=> p.discount > 0).length
    facets.all_aggs.discount.doc_count= products.filter((p)=> p.discount > 0).length
    facets.all_aggs.discount.all.buckets = facets.all_aggs.discount.all.buckets.map((bucket)=>{
      bucket.doc_count = products.filter((p)=> p.discount > bucket.from).length
      return bucket
    })
		pageSize = products.length
		category = res?.category
		err = !res?.estimatedTotalHits ? 'No result Not Found' : null

		return { products, count, facets, pageSize, category, err }
	} catch (e) {
	  console.log('error', e)
		return {}
	}
}

// Fetch next product

export const fetchNextPageProducts = async ({
	origin,
	storeId,
	categorySlug,
	server = false,
	nextPage,
	searchParams = {},
	sid = null
}: any) => {
	try {
		let nextPageData = []
		let res: any = {}

		if (isServer) {
			res = await getBySid(
				`es/products?categories=${categorySlug}&store=${storeId}&page=${nextPage}&${searchParams}`,
				sid
			)
		} else {
			res = await getAPI(
				`es/products?categories=${categorySlug}&store=${storeId}&page=${nextPage}&${searchParams}`,
				origin
			)
		}
		nextPageData = res?.data?.map((p) => {
			const p1 = { ...p._source }
			p1.id = p._id
			return p1
		})

		return {
			nextPageData: nextPageData || [],
			count: res.count,
			estimatedTotalHits: res.estimatedTotalHits,
			facets: res.facets
		}
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}

// Fetch related products

export const fetchRelatedProducts = async ({
	origin,
	storeId,
	categorySlug,
	pid,
	server = false,
	sid = null
}: any) => {
	try {
		let relatedProductsRes: any = {}

		if (isServer) {
			relatedProductsRes = await getBySid(
				`es/products?categories=${categorySlug}&store=${storeId}`,
				sid
			)
		} else {
			relatedProductsRes = await getAPI(
				`es/products?categories=${categorySlug}&store=${storeId}`,
				origin
			)
		}

		const relatedProducts = relatedProductsRes?.data.filter((p) => {
			return p._id !== pid
		})

		return relatedProducts || []
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}
