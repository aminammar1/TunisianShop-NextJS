'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Search from '../search/Search'
import Image from 'next/image'
import UserMenu from '../user-menu/UserMenu'
//import useMobile from "../hooks/useMobile";
//import { DisplayPrice } from "../utils/DisplayPrice";
import DisplayCartItem from '../display-card/DisplayCartItem'
import { useSelector } from 'react-redux'
//import {useGlobalContext} from "../provider/GlobalProvider";
import { FaRegCircleUser } from 'react-icons/fa6'
import { BsCart3 } from 'react-icons/bs'
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go'

export default function Header() {
  //const [isMobile] = useMobile();
  //const isSearchPage = location.pathname === "/search";
  const [openUserMenu, SetopenUserMenu] = useState(false)
  const [openCart, SetopenCart] = useState(false)
  const router = useRouter()
  const user = useSelector((state) => state?.user)

  const handleCloseUserMenu = () => {
    SetopenUserMenu(false)
  }

  const redirectToLoginPage = () => {
    router.push('/login')
  }
  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white">
      {/* comment  */}
      <div className="container mx-auto flex items-center px-2 justify-between">
        {/*Logo */}
        <div className="h-full">
          <Link href="/" className="h-full flex justify-center items-center">
            <Image
              src="/assets/images/logo.png"
              width={170}
              height={60}
              alt="logo"
              className="hidden lg:block"
            />
            <Image
              src="/assets/images/logo.png"
              width={120}
              height={60}
              alt="logo"
              className="lg:hidden"
            />
          </Link>
        </div>
        {/*Search */}
        <div className="hidden lg:block">
          <Search />
        </div>

        {/*login  and my cart  */}
        <div className="">
          {/** mobile version
          <button
            className="text-neutral-600 lg:hidden"
            onClick={handleMobileUser}
          >
            <FaRegCircleUser size={26} />
          </button> **/}

          {/** desktop version */}
          <div className="hidden lg:flex items-center gap-10">
            {user?._id ? (
              <div className="relative">
                <div
                  onClick={() => SetopenUserMenu((preve) => !preve)}
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
                  <div className="absolute top-12 right-0">
                    <div className="bg-white rounded p-4 min-w-52 lg:shadow-lg">
                      <UserMenu close={handleCloseUserMenu} />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={redirectToLoginPage} className="text-lg px-2">
                Login
              </button>
            )}

            <button
              onClick={() => SetopenCart(true)}
              className="flex items-center gap-2 bg-red-700 hover:bg-red-900 px-3 py-2 rounded text-white"
            >
              {/** <add to cart  /> **/}
              <div className="animate-bounce">
                <BsCart3 size={26} />
              </div>
              <div className="font-bold text-sm">
                {' '}
                <p> My Cart</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
