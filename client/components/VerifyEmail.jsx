'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Axios from '@/utils/Axios'
import GlobalApi from '@/app/api/GlobalApi'

export default function VerifyEmail() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const code = searchParams.get('code')
  const [message, setMessage] = useState('Verifying your email...')
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    if (!code) {
      setMessage('Verification code is missing.')
      setIsVerified(false)
      return
    }

    const verifyEmail = async () => {
      try {
        const response = await Axios({
          ...GlobalApi.verifyEmail,
          data: { code },
        })

        if (response.data.success) {
          setMessage('Email verified successfully!')
          setIsVerified(true)
        } else {
          setMessage(response.data.message || 'Email verification failed.')
          setIsVerified(false)
        }
      } catch (error) {
        setMessage(
          error.response?.data?.message ||
            'An error occurred while verifying your email.'
        )
        setIsVerified(false)
      }
    }

    verifyEmail()
  }, [code])

  useEffect(() => {
    if (isVerified !== null) {
      const timer = setTimeout(() => {
        router.push('/login')
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isVerified, router])

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">{message}</h1>
        <div className="flex justify-center">
          {!isVerified && (
            <svg
              className="w-12 h-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
          {isVerified && (
            <svg
              className="w-12 h-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  )
}
