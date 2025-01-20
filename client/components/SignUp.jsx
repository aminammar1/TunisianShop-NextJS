'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Axios from '@/utils/Axios'
import AxiosToastError from '@/utils/AxiosToastError'
import GlobalApi from '@/app/api/GlobalApi'
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa6'
import { ClipLoader } from 'react-spinners'

export default function SignUp() {
  const router = useRouter()
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    try {
      setLoading(true)
      const response = await Axios({
        ...GlobalApi.signup,
        data: data,
      })
      if (response.data.error) {
        return toast.error(response.data.message)
      }
      if (response.data.success) {
        toast.success(response.data.message, { position: 'top-center' })
        setData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        })
        router.push('/login')
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
        <p className="text-center text-black-600 font-bold mb-6">
          Welcome to Hantoui.TN
        </p>

        <form className="grid gap-6" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
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
              onChange={handleChange}
              placeholder="Enter your email"
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
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full p-3 outline-none rounded-lg"
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer p-3"
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full p-3 outline-none rounded-lg"
              />
              <div
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="cursor-pointer p-3"
              >
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>

          <button className="w-full py-3 rounded-lg font-semibold  bg-red-600 hover:bg-red-700 text-white transition-colors duration-200 flex justify-center items-center">
            {loading ? <ClipLoader size={24} color={'#fff'} /> : 'Register'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-red-600 hover:text-red-500 font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  )
}
