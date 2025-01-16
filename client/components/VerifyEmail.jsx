'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Axios from '@/utils/Axios'
import GlobalApi from '@/app/api/GlobalApi'

export default function VerifyEmail() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const [message, setMessage] = useState('Verifying your email...')
  const [isVerified, setIsVerified] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!code) {
      setMessage('Verification code is missing.')
      setIsVerified(false)
      setIsLoading(false)
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
      } finally {
        setIsLoading(false)
      }
    }

    verifyEmail()
  }, [code])

  return <> </>
}
