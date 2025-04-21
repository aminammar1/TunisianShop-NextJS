'use client'

import { Suspense } from 'react'
import ForgotPassword from '@/components/ForgotPassword'

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
      <ForgotPassword />
    </Suspense>
  )
}
