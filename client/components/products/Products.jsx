'use client'

import React, { useEffect, useState } from 'react'
import GlobalApi from '@/api/GlobalApi'
import Axios from '@/lib/Axios'
import AxiosToastError from '@/lib/AxiosToastError'
import Loading from '../Loading'
import ProductCard from './ProductCardAdmin'
import { IoSearchOutline } from 'react-icons/io5'

export default function Products() {
  const [productData, setProductData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPageCount, setTotalPageCount] = useState(1)
  const [search, setSearch] = useState('')

  const fetchProductData = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...GlobalApi.GetProducts,
        params: { page, limit: 6, search: search.trim() }, 
      })
      
      const { data: responseData } = response
      if (responseData.success) {
        setProductData(responseData.data)
        setTotalPageCount(responseData.totalPages)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductData()
  }, [page])

  const handleNext = () => {
    if (productData.length === 6) setPage(prev => prev + 1) 
  }
  const handlePrevious = () => {
    if (page > 1) setPage(prev => prev - 1)
  }

  const handleOnChange = (e) => {
    setSearch(e.target.value)
    setPage(1)
  }

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') fetchProductData()
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(fetchProductData, 300)
    return () => clearTimeout(delayDebounceFn)
  }, [search])

  return (
    <section className="p-4">
      <div className="p-4 bg-white shadow-md flex items-center justify-between gap-4 rounded-md">
        <h2 className="font-semibold text-lg">Products</h2>
        <div className="h-full min-w-32 max-w-64 w-full ml-auto bg-gray-100 px-4 flex items-center gap-3 py-2 rounded border focus-within:border-primary-200">
          <IoSearchOutline size={25} />
          <input
            type="text"
            placeholder="Search product here ..."
            className="h-full w-full outline-none bg-transparent"
            value={search}
            onChange={handleOnChange}
            onKeyDown={handleSearchKeyDown}
          />
        </div>
      </div>
      
      {loading && <Loading />}

      <div className="p-4 bg-gray-100 rounded-md">
        {productData.length === 0 && !loading ? (
          <p className="text-center text-gray-600">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {productData.map((p, index) => (
              <ProductCard key={p.id || index} data={p} fetchProductData={fetchProductData} />
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between my-4">
        <button
          onClick={handlePrevious}
          disabled={page <= 1}
          className={`border px-4 py-1 rounded ${page > 1 ? 'hover:bg-primary-200' : 'opacity-50 cursor-not-allowed'}`}
        >
          Previous
        </button>
        <span className="w-full text-center font-semibold">{page} / {totalPageCount}</span>
        <button
          onClick={handleNext}
          disabled={productData.length < 6} // Disable if fewer than 6 items
          className={`border px-4 py-1 rounded ${productData.length === 6 ? 'hover:bg-primary-200' : 'opacity-50 cursor-not-allowed'}`}
        >
          Next
        </button>
      </div>
    </section>
  )
}