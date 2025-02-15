'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function page() {
  const searchParams = useSearchParams()
  const text = searchParams.get('text') || 'Payment'

  return (
    <div className="m-2 w-full max-w-md bg-green-200 p-4 py-5 rounded mx-auto flex flex-col justify-center items-center gap-5">
      <p className="text-green-800 font-bold text-lg text-center">
        {text} Successfully
      </p>
      <Link
        href="/"
        className="border border-green-900 text-green-900 hover:bg-green-900 hover:text-white transition-all px-4 py-1"
      >
        Go To Home
      </Link>
    </div>
  )
}
