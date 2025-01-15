'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa6'

export default function ForgotPassword() {
  const router = useRouter()
  const [data, setData] = useState({ email: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const valideValue = Object.values(data).every((item) => item)

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Forgot Password</h1>
        <p className="text-center text-gray-600 mb-6">
          Enter your email to receive a password reset OTP.
        </p>

        <form className="grid gap-6">
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

          <button
            disabled={!valideValue}
            className={`w-full py-3 rounded-lg font-semibold ${
              valideValue
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-red-300 text-white cursor-not-allowed'
            } transition-colors duration-200`}
          >
            Send OTP
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
