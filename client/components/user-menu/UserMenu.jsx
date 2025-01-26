'use client'

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { HiOutlineExternalLink } from 'react-icons/hi'
import { logout } from '@/store/userSlice'
import Axios from '@/utils/Axios'
import toast from 'react-hot-toast'
import AxiosToastError from '@/utils/AxiosToastError'
import GlobalApi from '@/api/GlobalApi'
import isAdmin from '@/utils/AdminVerify'

export default function UserMenu({ close }) {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...GlobalApi.signout,
      })
      if (response.data.success) {
        if (close) {
          close()
        }
        dispatch(logout())
        localStorage.clear()
        toast.success('Logout successful')
        router.replace('/')
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
    <div className="bg-white shadow-sm rounded-lg w-64 p-3 divide-y divide-gray-200">
      <div className="flex items-center space-x-3 pb-3">
        <Image
          src={user.avatar || '/assets/images/profile.png'}
          alt="User Avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex-1 truncate">
          <div className="text-sm font-semibold text-gray-800">
            {user.name || 'Guest'}
          </div>
          <div className="text-xs text-gray-500 truncate">
            {user.email || 'No email provided'}
          </div>
        </div>
      </div>

      <div className="py-3">
        <nav className="space-y-1">
          <Link
            href="/dashboard/profile"
            className="px-2 py-1 rounded-md hover:bg-gray-100 text-gray-700 flex items-center justify-between"
            onClick={handleClose}
          >
            Profile
            <HiOutlineExternalLink className="w-4 h-4 text-gray-500" />
          </Link>

          {isAdmin(user.role) && (
            <>
              <Link
                href="/dashboard/category"
                className="block px-2 py-1 rounded-md hover:bg-gray-100 text-gray-700"
                onClick={handleClose}
              >
                Manage Categories
              </Link>
              <Link
                href="/dashboard/subcategory"
                className="block px-2 py-1 rounded-md hover:bg-gray-100 text-gray-700"
                onClick={handleClose}
              >
                Manage Subcategories
              </Link>
              <Link
                href="/dashboard/upload-product"
                className="block px-2 py-1 rounded-md hover:bg-gray-100 text-gray-700"
                onClick={handleClose}
              >
                Upload Product
              </Link>
              <Link
                href="/dashboard/product"
                className="block px-2 py-1 rounded-md hover:bg-gray-100 text-gray-700"
                onClick={handleClose}
              >
                View Products
              </Link>
            </>
          )}

          <Link
            href="/dashboard/myorders"
            className="block px-2 py-1 rounded-md hover:bg-gray-100 text-gray-700"
            onClick={handleClose}
          >
            My Orders
          </Link>
          <Link
            href="/dashboard/address"
            className="block px-2 py-1 rounded-md hover:bg-gray-100 text-gray-700"
            onClick={handleClose}
          >
            Saved Addresses
          </Link>
        </nav>
      </div>

      <div className="pt-3">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center px-3 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
