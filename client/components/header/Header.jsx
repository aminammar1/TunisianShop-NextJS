'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Search from '../search-button/Search'
import UserMenu from '../user-menu/UserMenu'
import { useSelector } from 'react-redux'
import { BsCart3 } from 'react-icons/bs'
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go'
import { FiMenu } from 'react-icons/fi'
import DisplayCartItem from '../DisplayCart'
import { useGlobalContext } from '@/providers/GlobalProvider'
import { DisplayPrice } from '@/lib/DisplayPrice'

export default function Header() {
  const [openUserMenu, SetopenUserMenu] = useState(false)
  const [openCart, SetopenCart] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openMobileMenu, setOpenMobileMenu] = useState(false)
  const router = useRouter()
  const user = useSelector((state) => state?.user)
  const cartItem = useSelector((state) => state.cartItem.cart)
  const { totalPrice, totalQty } = useGlobalContext()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white transition-all duration-300 ${
        isScrolled ? 'h-28 shadow-lg' : 'h-24 lg:h-20'
      }`}
    >
      <div className="container mx-auto flex items-center px-2 justify-between relative">
        <div className="h-full flex items-center">
          <Link href="/" className="hidden lg:flex items-center space-x-2">
            <span className="text-3xl font-extrabold tracking-tight">
              <span className="text-yellow-400">Hanouti</span>
              <span className="text-red-600">.Tn</span>
            </span>
          </Link>

          <Link href="/" className="flex lg:hidden items-center space-x-1">
            <span className="text-xl font-bold tracking-tight">
              <span className="text-yellow-400">Hanouti</span>
              <span className="text-red-600">.Tn</span>
            </span>
          </Link>
        </div>
        <div className="hidden lg:block">
          <Search />
        </div>
        <div className="hidden lg:flex items-center gap-10">
          {user?._id ? (
            <div className="relative">
              <div
                onClick={() => SetopenUserMenu((prev) => !prev)}
                className="flex select-none items-center gap-1 cursor-pointer"
              >
                <p> Account </p>
                {openUserMenu ? (
                  <GoTriangleUp size={20} />
                ) : (
                  <GoTriangleDown size={20} />
                )}
              </div>
              {openUserMenu && (
                <div className="absolute top-12 right-0 bg-white rounded p-4 min-w-52 lg:shadow-lg">
                  <UserMenu close={() => SetopenUserMenu(false)} />
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => router.push('/login')}
              className="text-lg px-2"
            >
              Login
            </button>
          )}
          <button
            onClick={() => SetopenCart(true)}
            className="flex items-center gap-2 bg-red-700 hover:bg-red-900 px-3 py-2 rounded text-white"
          >
            <div className="animate-bounce">
              <BsCart3 size={26} />
            </div>
            <div className="font-bold text-sm">
              {cartItem[0] ? (
                <div>
                  <p>{totalQty} Items</p>
                  <p>{DisplayPrice(totalPrice)}</p>
                </div>
              ) : (
                <p>My Cart</p>
              )}
            </div>
          </button>
        </div>
        {/* Mobile menu icon moved to the right */}
        <button
          className="ml-2 flex lg:hidden items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-600 absolute right-2"
          onClick={() => setOpenMobileMenu((prev) => !prev)}
          aria-label="Open menu"
        >
          <FiMenu size={28} />
        </button>
      </div>
      {/* Mobile menu dropdown */}
      {openMobileMenu && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-40">
          <div className="w-64 bg-white h-full shadow-lg p-6 flex flex-col gap-6 fixed right-0 top-0 bottom-0 animate-slide-in-right">
            <button
              className="self-end mb-4 text-gray-700 hover:text-red-600"
              onClick={() => setOpenMobileMenu(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
            <div className="flex flex-col gap-4">
              {user?._id ? (
                <div className="flex flex-col gap-2">
                  <span className="font-semibold text-gray-800">Account</span>
                  <UserMenu close={() => setOpenMobileMenu(false)} />
                </div>
              ) : (
                <button
                  onClick={() => {
                    router.push('/login')
                    setOpenMobileMenu(false)
                  }}
                  className="text-lg px-2 text-left"
                >
                  Login
                </button>
              )}
              <button
                onClick={() => {
                  SetopenCart(true)
                  setOpenMobileMenu(false)
                }}
                className="flex items-center gap-2 bg-red-700 hover:bg-red-900 px-3 py-2 rounded text-white"
              >
                <BsCart3 size={26} />
                <span className="font-bold text-sm">
                  {cartItem[0]
                    ? `${totalQty} Items - ${DisplayPrice(totalPrice)}`
                    : 'My Cart'}
                </span>
              </button>
              <div>
                <Search />
              </div>
            </div>
          </div>
        </div>
      )}
      {openCart && <DisplayCartItem close={() => SetopenCart(false)} />}
    </header>
  )
}
