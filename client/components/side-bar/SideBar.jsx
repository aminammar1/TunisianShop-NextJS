'use client'

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation' 
import { logout } from '@/store/userSlice'
import Axios from '@/lib/Axios'
import toast from 'react-hot-toast'
import AxiosToastError from '@/lib/AxiosToastError'
import GlobalApi from '@/api/GlobalApi'
import isAdmin from '@/lib/AdminVerify'
import {
  HiOutlineUser,
  HiOutlineFolder,
  HiOutlineUpload,
  HiOutlineTag,
  HiOutlineShoppingCart,
  HiOutlineLogout,
  HiOutlineHome,
} from 'react-icons/hi'

export default function Sidebar({ close }) {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const pathname = usePathname()

  const handleLogout = async () => {
    try {
      const response = await Axios({ ...GlobalApi.signout })
      if (response.data.success) {
        if (close) {
          close()
        }
        dispatch(logout())
        localStorage.clear()
        toast.success('Logout successful')
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  const handleClose = () => {
    if (close) {
      close()
    }
  }

  return (
    <div className="h-full p-3 space-y-2 w-60 dark:bg-gray-50 dark:text-gray-800">
      <div className="flex items-center p-2 space-x-4">
        <Image
          src={user.avatar || '/assets/images/profile.png'}
          alt="User Avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <h2 className="text-md font-semibold">{user.name || 'Guest'}</h2>
          <span className="flex items-center space-x-1 text-md dark:text-gray-600">
            {user.role || 'User'}
          </span>
        </div>
      </div>
      <div className="divide-y dark:divide-gray-300">
        <ul className="pt-2 pb-4 space-y-1 text-sm">
          <li className="dark:text-gray-900">
            <Link
              href="/dashboard/profile"
              className={`flex items-center p-2 space-x-3 rounded-md hover:bg-gray-300 ${
                pathname === '/dashboard/profile' ? 'bg-gray-300 text-gray-900' : ''
              }`} 
              onClick={handleClose}
            >
              <HiOutlineUser className="w-5 h-5" />
              <span>Profile</span>
            </Link>
          </li>
          {isAdmin(user.role) && (
            <>
              <li>
                <Link
                  href="/dashboard/category"
                  className={`flex items-center p-2 space-x-3 rounded-md hover:bg-gray-300 ${
                    pathname === '/dashboard/category' ? 'bg-gray-300 text-gray-900' : ''
                  }`}
                  onClick={handleClose}
                >
                  <HiOutlineFolder className="w-4 h-4" />
                  <span>Manage Categories</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/subcategory"
                  className={`flex items-center p-2 space-x-3 rounded-md hover:bg-gray-300 ${
                    pathname === '/dashboard/subcategory' ? 'bg-gray-300 text-gray-900' : ''
                  }`}
                  onClick={handleClose}
                >
                  <HiOutlineTag className="w-4 h-4" />
                  <span>Manage Subcategories</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/upload-product"
                  className={`flex items-center p-2 space-x-3 rounded-md hover:bg-gray-300 ${
                    pathname === '/dashboard/upload-product' ? 'bg-gray-300 text-gray-900' : ''
                  }`}
                  onClick={handleClose}
                >
                  <HiOutlineUpload className="w-4 h-4" />
                  <span>Upload Product</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/product"
                  className={`flex items-center p-2 space-x-3 rounded-md hover:bg-gray-300 ${
                    pathname === '/dashboard/product' ? 'bg-gray-300 text-gray-900' : ''
                  }`}
                  onClick={handleClose}
                >
                  <HiOutlineShoppingCart className="w-4 h-4" />
                  <span>Product</span>
                </Link>
              </li>
            </>
          )}
        </ul>

        <ul className="pt-4 pb-2 space-y-1 text-sm">
          <li>
            <Link
              href="/dashboard/myorders"
              className={`flex items-center p-2 space-x-3 rounded-md hover:bg-gray-300 ${
                pathname === '/dashboard/myorders' ? 'bg-gray-300 text-gray-900' : ''
              }`}
              onClick={handleClose}
            >
              <HiOutlineShoppingCart className="w-4 h-4" />
              <span>My Orders</span>
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/address"
              className={`flex items-center p-2 space-x-3 rounded-md hover:bg-gray-300 ${
                pathname === '/dashboard/address' ? 'bg-gray-300 text-gray-900' : ''
              }`}
              onClick={handleClose}
            >
              <HiOutlineHome className="w-4 h-4" />
              <span>Saved Addresses</span>
            </Link>
          </li>
        </ul>

        {/* Logout Button */}
        <div className="pt-4 pb-2 space-y-1 text-sm">
          <button
            onClick={handleLogout}
            className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-300"
          >
            <HiOutlineLogout className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  )
}
