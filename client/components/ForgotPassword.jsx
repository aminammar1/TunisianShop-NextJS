'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import GlobalApi from '@/app/api/GlobalApi'
import toast from 'react-hot-toast'
import Axios from '@/utils/Axios'
import AxiosToastError from '@/utils/AxiosToastError'
import { useRouter } from 'next/navigation'
import { ClipLoader } from 'react-spinners'
import { useDispatch } from 'react-redux'
import { setUser } from '@/store/userSlice'

export default function ForgotPassword() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [data, setData] = useState({ email: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)

      const response = await Axios({
        ...GlobalApi.forgotPassword,
        data: data,
      })

      if (response.data.error) {
        return toast.error(response.data.message)
      }

      if (response.data.success) {
        toast.success(response.data.message)

        dispatch(setUser({ email: data.email }))

        router.push('/verify-otp')

        setData({ email: '' })
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
        <h1 className="text-2xl font-bold text-center mb-6">Forgot Password</h1>
        <p className="text-center text-gray-600 mb-6">
          Enter your email to receive a password reset OTP.
        </p>

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
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <button className="w-full py-3 rounded-lg font-semibold  bg-red-600 hover:bg-red-700 text-white transition-colors duration-200 flex justify-center items-center">
            {loading ? <ClipLoader size={24} color={'#fff'} /> : 'Send OTP'}
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
