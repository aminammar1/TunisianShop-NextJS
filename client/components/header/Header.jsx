'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Search from '../search-button/Search'
import Image from 'next/image'
import UserMenu from '../user-menu/UserMenu'
import { useSelector } from 'react-redux'
import { FaRegCircleUser } from 'react-icons/fa6'
import { BsCart3 } from 'react-icons/bs'
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go'
import DisplayCartItem from '../DisplayCart'
import { useGlobalContext } from '@/providers/GlobalProvider'
import { DisplayPrice } from '@/lib/DisplayPrice'

export default function Header() {
  const [openUserMenu, SetopenUserMenu] = useState(false)
  const [openCart, SetopenCart] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  const user = useSelector((state) => state?.user)
  const cartItem = useSelector(state => state.cartItem.cart)
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
    <header className={`sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white transition-all duration-300 ${isScrolled ? 'h-28 shadow-lg' : 'h-24 lg:h-20'}`}>
      <div className="container mx-auto flex items-center px-2 justify-between">
        <div className="h-full">
          <Link href="/" className="h-full flex justify-center items-center">
            <Image
              src="/assets/images/logo.png"
              width={170}
              height={60}
              alt="logo"
              className="hidden lg:block"
              priority
            />
            <Image
              src="/assets/images/logo.png"
              width={120}
              height={60}
              alt="logo"
              className="lg:hidden"
              priority
            />
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
            <button onClick={() => router.push('/login')} className="text-lg px-2">
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
      </div>
      {openCart && <DisplayCartItem close={() => SetopenCart(false)} />}
    </header>
  )
}
