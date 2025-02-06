'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import { valideURLConvert } from '@/lib/valideURLConvert'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import CategoryAndProduct from '@/components/CategoryAndProduct'

export default function page() {
  const banner = '/assets/images/Banner.png'
  const router = useRouter()
  const categoryData = useSelector((state) => state.product.allCategory)
  const subCategoryData = useSelector((state) => state.product.allSubCategory)

  
  const handleRedirectProductListpage = (id, cat) => {
    const subcategory = subCategoryData.find((sub) =>
      sub.category.some((c) => c === id)
    )

    if (!subcategory) {
      console.error('Subcategory not found for id:', id)
      return
    }

    const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(
      subcategory.name
    )}-${subcategory._id}`

    router.push(url)
    console.log (url)
  }

  return (
    <section className="bg-white">
      <div className="container mx-auto mt-6">
        <div
          className={`w-full h-full min-h-48 bg-gray-100 rounded ${
            !banner && 'animate-pulse my-2'
          } `}
        >
          {/* Banner for desktop */}
          <Image
            src={banner}
            alt="banner"
            width={1466}
            height={310}
            className="w-full h-full hidden lg:block rounded"
            priority
          />
          {/* Banner for mobile */}
        </div>
      </div>

       {/* Space after Banner */}
       <div className="h-6 "></div>

       {/* Categories Section */}
      <div className="container mx-auto px-4 my-8">
        <h2 className="text-xl font-bold mb-6">Categories</h2>
        <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2">
          {categoryData.map((cat, index) => (
            <div
              key={cat._id + 'displayCategory'}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-cover rounded-lg shadow-md bg-blue-50"
              />
              <p className="text-center mt-2 text-xs md:text-sm lg:text-base font-normal">
                {cat.name}
              </p>
            </div>
          ))}
        </div>
        </div>

      {/***display category product */}
      {categoryData?.map((c, index) => {
        return (
          <CategoryAndProduct
            key={c?._id + 'CategoryAndProductDisplay'}
            id={c?._id}
            name={c?.name}
          />
        )
      })}
    </section>
  )
}
