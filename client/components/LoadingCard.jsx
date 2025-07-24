import React from 'react'

const CardLoading = () => {
  return (
    <div className="relative bg-white rounded-2xl p-5 min-w-52 lg:min-w-64 border border-red-100 shadow-md overflow-hidden">
      <div className="absolute top-0 right-0 w-12 h-12 bg-red-100 rounded-bl-2xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-8 h-8 bg-red-100 rounded-tr-2xl animate-pulse" />
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-red-50/50 to-transparent" />

      <div className="relative z-10 space-y-4">
        <div className="w-full h-36 lg:h-44 bg-gradient-to-br from-red-50 to-gray-100 rounded-xl animate-pulse relative">
          <div className="absolute top-2 right-2 w-10 h-5 bg-red-200 rounded-full animate-pulse" />
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <div className="h-5 bg-gradient-to-r from-red-100 to-gray-200 rounded-lg animate-pulse" />
            <div className="h-5 w-3/4 bg-gradient-to-r from-red-100 to-gray-200 rounded-lg animate-pulse" />
            <div className="w-8 h-0.5 bg-red-200 animate-pulse rounded-full" />
          </div>

          <div className="h-6 w-20 bg-red-100 rounded-full animate-pulse" />

          <div className="flex items-end justify-between gap-4 pt-2">
            <div className="space-y-1">
              <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
              <div className="h-7 w-24 bg-red-200 rounded-lg animate-pulse" />
            </div>
            <div className="h-10 w-20 bg-red-100 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardLoading
