'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import AxiosToastError from '@/lib/AxiosToastError'
import Axios from '@/lib/Axios'
import GlobalApi from '@/api/GlobalApi'
import { valideURLConvert } from '@/lib/valideURLConvert'
import CardLoading from './LoadingCard'
import CardProduct from './CardProduct'
import Loading from './Loading'

export default function CategoryAndProduct({ id, name }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const containerRef = useRef()
  const subCategoryData = useSelector((state) => state.product.allSubCategory)
  const loadingSubcategories = useSelector(
    (state) => state.product.loadingCategory
  )
  const loadingCardNumber = new Array(6).fill(null)

  const fetchCategoryWithProduct = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...GlobalApi.ProductByCategory,
        params: { _id: id },
      })

      const { data: responseData } = response

      if (responseData.success) {
        setData(responseData.data)
      }
    } catch (error) {
      //AxiosToastError(error)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategoryWithProduct()
  }, [])

  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 200
    }
  }

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 200
    }
  }

  const handleRedirectProductListpage = () => {
    if (loadingSubcategories || !subCategoryData?.length) {
      return '#' // Return a placeholder URL if loading or no data
    }

    const subcategory = subCategoryData.find((sub) => sub.category.includes(id))

    if (!subcategory) {
      console.error('Subcategory not found for category ID:', id)
      return '#'
    }

    const url = `/productList/${valideURLConvert(
      name
    )}-${id}/${valideURLConvert(subcategory?.name)}-${subcategory?._id}`
    return url
  }

  const redirectURL = handleRedirectProductListpage()

  return (
    <div className="relative">
      <div className="container mx-auto p-6 mb-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <div className="w-2 h-2 bg-red-600 rounded-full mb-1" />
              <div className="w-1 h-8 bg-red-600" />
              <div className="w-2 h-2 bg-red-600 rounded-full mt-1" />
            </div>
            <div>
              <h3 className="font-bold text-2xl md:text-3xl text-gray-900 tracking-wide">
                {name}
              </h3>
              <div className="w-16 h-0.5 bg-red-600 mt-1" />
            </div>
          </div>

          {loadingSubcategories ? (
            <div className="flex items-center gap-3 bg-red-50 rounded-full px-6 py-3 border border-red-200">
              <Loading />
              <span className="text-red-700 font-semibold text-sm">
                Loading...
              </span>
            </div>
          ) : (
            <Link
              href={redirectURL}
              className="group relative flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">See All</span>
              <svg
                className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          )}
        </div>
      </div>

      <div className="relative">
        <div
          className="flex gap-6 md:gap-8 container mx-auto px-6 overflow-x-auto scrollbar-none scroll-smooth pb-6"
          ref={containerRef}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {loading &&
            loadingCardNumber.map((_, index) => (
              <CardLoading key={'CategoryWithProductDisplay123' + index} />
            ))}

          {data.map((p, index) => (
            <CardProduct
              data={p}
              key={p._id + 'CategoryWithProductDisplay' + index}
            />
          ))}
        </div>

        <div className="absolute inset-y-0 left-0 right-0 container mx-auto px-6 hidden lg:flex justify-between items-center pointer-events-none">
          <button
            onClick={handleScrollLeft}
            className="pointer-events-auto z-10 bg-white hover:bg-red-50 shadow-2xl border-2 border-red-100 hover:border-red-300 text-red-600 hover:text-red-700 p-4 rounded-full transition-all duration-300 hover:scale-110 transform"
          >
            <FaAngleLeft className="text-xl" />
          </button>

          <button
            onClick={handleScrollRight}
            className="pointer-events-auto z-10 bg-white hover:bg-red-50 shadow-2xl border-2 border-red-100 hover:border-red-300 text-red-600 hover:text-red-700 p-4 rounded-full transition-all duration-300 hover:scale-110 transform"
          >
            <FaAngleRight className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  )
}
