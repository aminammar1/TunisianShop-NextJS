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

export default function CategoryAndProduct({ id, name }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const containerRef = useRef()
  const subCategoryData = useSelector((state) => state.product.allSubCategory)
  const loadingCardNumber = new Array(6).fill(null)

        const fetchCategoryWithProduct = async () => {
          try {
            setLoading(true)
            const response = await Axios({
              ...GlobalApi.ProductByCategory, params: { _id: id }, })

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
          
          const subcategory = subCategoryData.find((sub) => sub.category.includes(id))
          
          const url = `/productList/${valideURLConvert(name)}-${id}/${valideURLConvert(subcategory?.name)}-${subcategory?._id}`
          return url
        }

        const redirectURL = handleRedirectProductListpage()
        

  return (
    <div>
      <div className="container mx-auto p-4 flex items-center justify-between gap-4">
            <h3 className="font-semibold text-lg md:text-xl">{name}</h3>
                <Link
                  href={redirectURL}
                  className="text-red-600 hover:text-red-400"
                >
                  See All
                </Link>
     </div>
      
      <div className="relative flex items-center ">
            <div
              className=" flex gap-4 md:gap-6 lg:gap-8 container mx-auto px-4 overflow-x-scroll scrollbar-none scroll-smooth"
              ref={containerRef}
            >
          {loading &&
            loadingCardNumber.map((_, index) => {
              return (
                <CardLoading key={'CategoryWithProductDisplay123' + index} />
              )
            })}

          {data.map((p, index) => {
            return (
              <CardProduct
                data={p}
                key={p._id + 'CategoryWithProductDisplay' + index}
              />
            )
          })}
        </div>
          <div className="w-full left-0 right-0 container mx-auto  px-2  absolute hidden lg:flex justify-between">
              <button
                onClick={handleScrollLeft}
                className="z-10 relative bg-white hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full"
              >
                <FaAngleLeft />
              </button>
               
                <button
                  onClick={handleScrollRight}
                  className="z-10 relative  bg-white hover:bg-gray-100 shadow-lg p-2 text-lg rounded-full"
                >
                  <FaAngleRight />
                </button>
        </div>
      </div>
    </div>
  )
}
