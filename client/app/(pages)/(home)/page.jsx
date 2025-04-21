'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import { valideURLConvert } from '@/lib/valideURLConvert'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import CategoryAndProduct from '@/components/CategoryAndProduct'
import NewsLetter from '@/components/NewsLetter'
import Footer from '@/components/footer/Footer'
import { motion } from 'framer-motion'

export default function HomePage() {
  const banner = '/assets/images/Banner.png'
  const mobileBanner = '/assets/images/mobileBanner.png'
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

    const url = `/productList/${valideURLConvert(cat)}-${id}/${valideURLConvert(
      subcategory.name
    )}-${subcategory._id}`

    router.push(url)
  }

  return (
    <motion.section className="bg-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="container mx-auto ">
        {/* Banner Section */}
        <div className={`w-full h-full min-h-48 bg-blue-100 rounded ${!banner && "animate-pulse my-2" } `}>
          {/* Desktop Banner */}
          <Image
            src={banner}
            alt="banner"
            width={1466}
            height={310}
            className="w-full h-full hidden lg:block"
            priority
          />
          {/* Mobile Banner */}
          
          <div className="relative w-full h-48 lg:hidden">
          <Image
            src={mobileBanner}
            alt="banner"
            fill
            className="object-cover"
            priority
          />
        </div>
          </div>
        </div>

      {/* Categories Section */}
      <div className="container mx-auto px-6 my-12">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Categories</h2>
        <motion.div 
          className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {categoryData.map((cat) => (
            <div
              key={cat._id}
              className="flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-105"
              onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-cover rounded-lg bg-blue-50"
              />
              <p className="mt-2 text-xs md:text-sm lg:text-base font-normal text-gray-700">
                {cat.name}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Category Products */}
      {categoryData?.map((c) => (
        <motion.div key={c._id} className="my-12 px-6" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <CategoryAndProduct id={c._id} name={c.name} />
        </motion.div>
      ))}

      {/* Newsletter Section */}
      <div className="container mx-auto px-6 my-16 flex flex-col items-center">
        <div className="max-w-4xl w-full bg-white rounded-xl p-8">
          <NewsLetter />
        </div>
        <div className="w-full border-t-2 border-red-600 mt-6"></div>
      </div>

      {/* Footer Section */}
      <Footer />
    </motion.section>
  )
}