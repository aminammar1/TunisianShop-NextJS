'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { DisplayPrice } from '@/lib/DisplayPrice'
import Link from 'next/link'
import { valideURLConvert } from '@/lib/valideURLConvert'
import { pricewithDiscount } from '@/lib/PriceWithDiscount'
import AddToCartButton from './AddToCartButton'

export default function CardProduct({ data }) {
  const url = `/product/${valideURLConvert(data.name)}-${data._id}`

  return (
    <Link
      href={url}
      className="group relative bg-white rounded-2xl p-5 min-w-52 lg:min-w-64 border border-red-100 hover:border-red-300 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-12 h-12 bg-red-600 rounded-bl-2xl opacity-5 group-hover:opacity-10 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 w-8 h-8 bg-red-600 rounded-tr-2xl opacity-5 group-hover:opacity-10 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="relative w-full h-36 lg:h-44 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-red-50 mb-4 group-hover:from-red-50 group-hover:to-gray-50 transition-all duration-300">
          <div className="absolute inset-2">
            <Image
              src={data.image[0]}
              alt={data.name}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          {Boolean(data.discount) && (
            <div className="absolute top-2 right-2 bg-red-600 text-white px-2.5 py-1 text-xs font-bold rounded-full shadow-md">
              -{data.discount}%
            </div>
          )}
          {data.stock === 0 && (
            <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center rounded-xl backdrop-blur-sm">
              <div className="bg-red-600 text-white px-4 py-2 rounded-full font-bold text-sm">
                Out of Stock
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div>
            <h3 className="font-bold text-base lg:text-lg text-gray-900 line-clamp-2 group-hover:text-red-700 transition-colors duration-300 leading-tight min-h-[2.5rem]">
              {data.name}
            </h3>
            <div className="w-8 h-0.5 bg-red-600 mt-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </div>

          <div className="text-sm text-red-600 font-semibold bg-red-50 px-3 py-1 rounded-full w-fit">
            {data.unit}
          </div>

          <div className="flex items-end justify-between gap-4 pt-2">
            <div className="flex flex-col">
              {Boolean(data.discount) && (
                <span className="text-xs text-gray-400 line-through mb-1">
                  {DisplayPrice(data.price)}
                </span>
              )}
              <span className="font-bold text-xl lg:text-2xl text-red-600">
                {DisplayPrice(pricewithDiscount(data.price, data.discount))}
              </span>
            </div>

            <div className="flex-shrink-0">
              {data.stock === 0 ? (
                <div className="px-4 py-2 bg-gray-100 text-gray-500 text-sm rounded-full font-semibold border">
                  Unavailable
                </div>
              ) : (
                <div onClick={(e) => e.preventDefault()}>
                  <AddToCartButton data={data} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
