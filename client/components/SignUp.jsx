'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa6'

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
        <p className="text-center text-gray-600 mb-6">Welcome to Hantoui.TN</p>

        <form className="grid gap-6">
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
              autoFocus
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

          <button
            disabled={!valideValue}
            className={`w-full py-3 rounded-lg font-semibold ${
              valideValue
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-red-300 text-white cursor-not-allowed'
            } transition-colors duration-200`}
          >
            Register
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
