'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import { valideURLConvert } from '@/lib/valideURLConvert'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import CategoryAndProduct from '@/components/CategoryAndProduct'
import NewsLetter from '@/components/NewsLetter'
import Footer from '@/components/footer/Footer'
import Chatbot from '@/components/Chatbot'
import { motion } from 'framer-motion'
import Loading from '@/components/Loading'

export default function HomePage() {
  const banner = '/assets/images/Banner.png'
  const mobileBanner = '/assets/images/mobileBanner.png'
  const router = useRouter()
  const categoryData = useSelector((state) => state.product.allCategory)
  const subCategoryData = useSelector((state) => state.product.allSubCategory)
  const loadingSubcategories = useSelector(
    (state) => state.product.loadingCategory
  )

  const handleRedirectProductListpage = (id, cat) => {
    if (loadingSubcategories) {
      return // Prevent navigation while loading
    }

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
    <motion.section
      className="bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto ">
        {/* Banner Section */}
        <div
          className={`w-full h-full min-h-48 bg-blue-100 rounded ${
            !banner && 'animate-pulse my-2'
          } `}
        >
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
      <div className="container mx-auto px-6 my-16">
        <div className="flex items-center justify-center mb-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-0.5 bg-red-600"></div>
              <div className="w-3 h-3 bg-red-600 rotate-45"></div>
              <div className="w-12 h-0.5 bg-red-600"></div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-wide">
              Shop by Category
            </h2>
            <p className="text-lg text-red-600 font-medium mt-2">
              Discover Our Products
            </p>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
        >
          {loadingSubcategories
            ? Array(6)
                .fill(null)
                .map((_, index) => (
                  <motion.div
                    key={`loading-category-${index}`}
                    className="group flex flex-col items-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.15 }}
                  >
                    <div className="relative w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
                      <div className="absolute inset-0 bg-red-50 rounded-2xl animate-pulse" />
                      <div className="absolute inset-1 bg-white rounded-xl animate-pulse opacity-70" />
                      <div className="absolute top-1 right-1 w-3 h-3 bg-red-200 rounded-full animate-pulse" />
                    </div>
                    <div className="mt-4 h-4 w-20 bg-red-100 animate-pulse rounded-full" />
                  </motion.div>
                ))
            : categoryData.map((cat, index) => (
                <motion.div
                  key={cat._id}
                  className="group flex flex-col items-center cursor-pointer"
                  onClick={() =>
                    handleRedirectProductListpage(cat._id, cat.name)
                  }
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl group-hover:from-red-100 group-hover:to-red-200 transition-all duration-300 shadow-md group-hover:shadow-xl" />
                    <div className="absolute inset-1.5 rounded-xl overflow-hidden bg-white shadow-inner">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute top-1 right-1 w-3 h-3 bg-red-600 rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <p className="mt-4 text-sm md:text-base font-semibold text-gray-800 group-hover:text-red-600 transition-colors duration-300 text-center max-w-24 md:max-w-28 lg:max-w-32 leading-tight">
                    {cat.name}
                  </p>
                  <div className="w-8 h-0.5 bg-red-600 mt-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </motion.div>
              ))}
        </motion.div>
      </div>

      {/* Category Products */}
      <div className="bg-gradient-to-b from-red-50/30 via-white to-red-50/30 py-20">
        {categoryData?.map((c, index) => (
          <motion.div
            key={c._id}
            className="my-20 px-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
          >
            <CategoryAndProduct id={c._id} name={c.name} />
          </motion.div>
        ))}
      </div>

      {/* Subcategory Loading Indicator */}
      {loadingSubcategories && (
        <div className="container mx-auto px-6 my-8 flex justify-center">
          <motion.div
            className="flex items-center gap-4 bg-white rounded-full px-8 py-4 shadow-xl border border-red-100"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative">
              <Loading />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full animate-ping" />
            </div>
            <span className="text-gray-800 font-semibold">
              Loading categories...
            </span>
          </motion.div>
        </div>
      )}

      {/* Newsletter Section */}
      <div className="container mx-auto px-6 my-16 flex flex-col items-center">
        <div className="max-w-4xl w-full bg-white rounded-xl p-8">
          <NewsLetter />
        </div>
        <div className="w-full border-t-2 border-red-600 mt-6"></div>
      </div>

      {/* Footer Section */}
      <Footer />

      {/* Chatbot Component */}
      <Chatbot />
    </motion.section>
  )
}
