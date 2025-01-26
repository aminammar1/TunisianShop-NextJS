'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import GlobalApi from '@/api/GlobalApi'
import toast from 'react-hot-toast'
import Axios from '@/utils/Axios'
import AxiosToastError from '@/utils/AxiosToastError'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { ClipLoader } from 'react-spinners'

export default function ResetPassword() {
  const router = useRouter()
  const [data, setData] = useState({
    newPassword: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const email = useSelector((state) => state.user.email)

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (data.newPassword !== data.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    try {
      setLoading(true)
      const response = await Axios({
        ...GlobalApi.resetPassword,
        data: {
          email,
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword,
        },
      })

      if (response.data.error) {
        return toast.error(response.data.message)
      }
      if (response.data.success) {
        toast.success(response.data.message)
        router.push('/login')
        setData({
          newPassword: '',
          confirmPassword: '',
        })
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
        <h1 className="text-2xl font-bold text-center mb-6">Reset Password</h1>
        <p className="text-center text-gray-600 mb-6">
          Enter your new password below.
        </p>

        <form className="grid gap-6" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <label
              htmlFor="newPassword"
              className="text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
              <input
                type={showPassword ? 'text' : 'password'}
                id="newPassword"
                name="newPassword"
                value={data.newPassword}
                onChange={handleChange}
                placeholder="Enter your new password"
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
                placeholder="Confirm your new password"
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
            {loading ? (
              <ClipLoader size={24} color={'#fff'} />
            ) : (
              'Reset Password'
            )}
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
