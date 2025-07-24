'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Axios from '@/lib/Axios'
import GlobalApi from '@/api/GlobalApi'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import AxiosToastError from '@/lib/AxiosToastError'
import Loading from '@/components/Loading'
import CardProduct from '@/components/CardProduct'
import { useSelector } from 'react-redux'
import { valideURLConvert } from '@/lib/valideURLConvert'

export default function Page() {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [totalPage, setTotalPage] = useState(1)
  const params = useParams()
  const allSubCategory = useSelector((state) => state.product.allSubCategory)
  const [displaySubCategory, setDisplaySubCategory] = useState([])
  const categoryArray = params?.category?.split('-') || []
  const categoryId = categoryArray.slice(-1)[0] || ''
  const subCategoryArray = params?.subcategory?.split('-') || []
  const subCategoryName =
    subCategoryArray.slice(0, subCategoryArray.length - 1).join(' ') || ''
  const subCategoryId = subCategoryArray.slice(-1)[0] || ''

  const fetchProduct = async () => {
    try {
      if (!categoryId || !subCategoryId) return
      setLoading(true)
      const response = await Axios({
        ...GlobalApi.GetProductByCategoryAndSubCategory,
        params: { categoryId, subCategoryId, page, limit: 8 },
      })
      const { data: responseData } = response
      if (responseData.success) {
        if (page === 1) {
          setData(responseData.data)
        } else {
          setData((prev) => [...prev, ...responseData.data])
        }
        setTotalPage(responseData.totalPage)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const filteredSubCategories = allSubCategory.filter((sub) =>
      sub.category.some((el) => el === categoryId)
    )
    setDisplaySubCategory(filteredSubCategories)
  }, [categoryId, allSubCategory])

  useEffect(() => {
    fetchProduct()
  }, [categoryId, subCategoryId, page])

  return (
    <section className="sticky top-24 lg:top-20">
      <div className="container sticky top-24 mx-auto grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]">
        {/* SubCategory */}
        <div className="min-h-[88vh] max-h-[88vh] overflow-y-scroll grid gap-1 shadow-md scrollbarCustom bg-white py-2">
          {displaySubCategory.map((s) => {
            const categoryId = s.category[0] || 'UnknownID'
            const categoryName = 'CategoryName'
            const link = `/productList/${valideURLConvert(
              categoryName
            )}-${categoryId}/${valideURLConvert(s.name)}-${s._id}`
            return (
              <Link
                key={s._id}
                href={link}
                className={`w-full p-2 lg:flex items-center lg:w-full lg:h-16 box-border lg:gap-4 border-b 
                                hover:bg-red-200 cursor-pointer
                                ${subCategoryId === s._id ? 'bg-red-300' : ''}
                              `}
              >
                <div className="w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded box-border relative">
                  <Image
                    src={s.image}
                    alt="subCategory"
                    width={56}
                    height={56}
                    className="w-14 lg:h-14 lg:w-12 h-full object-scale-down"
                  />
                </div>
                <p className="-mt-6 lg:mt-0 text-xs text-center lg:text-left lg:text-base">
                  {s.name}
                </p>
              </Link>
            )
          })}
        </div>
        {/* Display Product */}
        <div className="sticky top-20">
          <div className="bg-white shadow-md p-4 z-10">
            <h3 className="font-semibold">{subCategoryName}</h3>
          </div>
          <div>
            <div className="min-h-[80vh] max-h-[80vh] overflow-y-auto relative">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4">
                {data.map((p, index) => (
                  <CardProduct data={p} key={`${p._id}_product_${index}`} />
                ))}
              </div>
            </div>
            {loading && <Loading />}
          </div>
        </div>
      </div>
    </section>
  )
}
