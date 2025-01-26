'use client'

import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import AxiosToastError from '@/utils/AxiosToastError'
import { ClipLoader } from 'react-spinners'
import Axios from '@/utils/Axios'
import GlobalApi from '@/api/GlobalApi'

export default function VerifyOtp() {
  const router = useRouter()
  const inputRefs = useRef([])
  const [data, setData] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)

  const email = useSelector((state) => state.user.email)

  const handleChange = (index, value) => {
    const newData = [...data]
    newData[index] = value
    setData(newData)

    if (value && index < 5) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const otp = data.join('')
    if (otp.length !== 6) {
      toast.error('Please enter a valid OTP')
      return
    }

    try {
      setLoading(true)

      const response = await Axios({
        ...GlobalApi.verifyOtp,
        data: { email, otp },
      })
      if (response.data.error) {
        return toast.error(response.data.message)
      }
      if (response.data.success) {
        toast.success(response.data.message)
        router.push('/reset-password')
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
        <h1 className="text-2xl font-bold text-center mb-6">Verify OTP</h1>
        <p className="text-center text-gray-600 mb-6">
          Enter the 6-digit OTP sent to your email: <strong>{email}</strong>
        </p>

        <form className="grid gap-6" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <label htmlFor="otp" className="text-sm font-medium text-gray-700">
              Enter Your OTP
            </label>
            <div className="flex items-center gap-3 justify-between">
              {data.map((element, index) => (
                <input
                  key={`otp-${index}`}
                  type="text"
                  id="otp"
                  ref={(el) => (inputRefs.current[index] = el)}
                  maxLength={1}
                  value={element}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="w-full max-w-16 p-3 border border-gray-300 rounded-lg text-center font-semibold focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold bg-red-600 hover:bg-red-700 text-white transition-colors duration-200 flex justify-center items-center"
          >
            {loading ? <ClipLoader size={24} color={'#fff'} /> : 'Verify OTP'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Didn't receive the OTP?{' '}
          <Link
            href="/forgot-password"
            className="text-red-600 hover:text-red-500 font-semibold"
          >
            Resend
          </Link>
        </p>
      </div>
    </section>
  )
}
