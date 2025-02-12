'use client'

import React, { useEffect, useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import { TypeAnimation } from 'react-type-animation'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export default function Search() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isSearchPage, setIsSearchPage] = useState(false)
  const [inputValue, setInputValue] = useState(searchParams.get('q') || '')

  useEffect(() => {
    setIsSearchPage(pathname === '/search')
  }, [pathname])

  const redirectToSearchPage = () => {
    router.push('/search')
  }

  // Auto-update the search query as the user types.
  const handleOnChange = (e) => {
    const value = e.target.value
    setInputValue(value)
    router.push(`/search?q=${encodeURIComponent(value)}`)
  }

  return (
    <div className='w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-red-500'>
      <div>
        <button className='flex justify-center items-center h-full p-3 group-focus-within:text-red-500'>
          <IoSearch size={22} />
        </button>
      </div>
      <div className='w-full h-full'>
        {!isSearchPage ? (
          <div
            onClick={redirectToSearchPage}
            className='w-full h-full flex items-center cursor-pointer'
          >
            <TypeAnimation
              sequence={[
                'Search "Pasta"', 1000,
                'Search "Couscous"', 1000,
                'Search "Sugar"', 1000,
                'Search "Rice"', 1000,
                'Search "Chocolate"', 1000,
                'Search "Harissa"', 1000,
                'Search "Egg"', 1000,
                'Search "Chips"'
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          <input
            type='text'
            placeholder='Search ...'
            autoFocus
            value={inputValue}
            className='bg-transparent w-full h-full outline-none'
            onChange={handleOnChange}
          />
        )}
      </div>
    </div>
  )
}
