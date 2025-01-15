'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function VerifyOtp() {
  const router = useRouter()
  const [data, setData] = useState(['', '', '', '', '', ''])
  const validateValue = data.every((value) => value)

  const handleChange = (index, value) => {
    const newData = [...data]
    newData[index] = value
    setData(newData)
  }

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Verify OTP</h1>
        <p className="text-center text-gray-600 mb-6">
          Enter the 6-digit OTP sent to your email.
        </p>

        <form className="grid gap-6">
          <div className="grid gap-2">
            <label htmlFor="otp" className="text-sm font-medium text-gray-700">
              Enter Your OTP
            </label>
            <div className="flex items-center gap-3 justify-between">
              {data.map((element, index) => (
                <input
                  key={'otp' + index}
                  type="text"
                  id="otp"
                  maxLength={1}
                  value={element}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="w-full max-w-16 p-3 border border-gray-300 rounded-lg text-center font-semibold focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              ))}
            </div>
          </div>

          <button
            disabled={!validateValue}
            className={`w-full py-3 rounded-lg font-semibold ${
              validateValue
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-red-300 text-white cursor-not-allowed'
            } transition-colors duration-200`}
          >
            Verify OTP
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
