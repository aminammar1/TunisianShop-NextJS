'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import GlobalApi from '@/api/GlobalApi'
import Axios from '@/utils/Axios'
import fetchUserDetails from '@/utils/UserDetails'
import AxiosToastError from '@/utils/AxiosToastError'
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa6'
import { ClipLoader } from 'react-spinners'
import { useDispatch } from 'react-redux'
import { setUser } from '@/store/userSlice'
import toast from 'react-hot-toast'
import GoogleAuth from './GoogleAuth'

export default function Login() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [data, setData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)

      const response = await Axios({
        ...GlobalApi.signin,
        data: data,
      })

      if (response.data.error) {
        return toast.error(response.data.message)
      }

      if (response.data.success) {
        toast.success(response.data.message, { position: 'top-center' })

        setData({
          email: '',
          password: '',
        })
        localStorage.setItem('accessToken', response.data.data.accessToken)
        localStorage.setItem('refreshToken', response.data.data.refreshToken)

        const user = await fetchUserDetails()
        dispatch(setUser(user.data))

        router.push('/')
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded-lg shadow-lg p-8">
        <form className="grid gap-6" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              placeholder="Enter your email"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={data.password}
                placeholder="Enter your password"
                onChange={handleChange}
                className="w-full p-3 outline-none rounded-lg"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer p-3"
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm text-right hover:text-red-500"
            >
              Forgot password?
            </Link>
          </div>
          <button className="w-full py-3 rounded-lg font-semibold  bg-red-600 hover:bg-red-700 text-white transition-colors duration-200 flex justify-center items-center">
            {loading ? <ClipLoader size={24} color={'#fff'} /> : 'Login'}
          </button>
        </form>
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <GoogleAuth />
        <p className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            href="/sign-up"
            className="text-red-600 hover:text-red-500 font-semibold"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  )
}
