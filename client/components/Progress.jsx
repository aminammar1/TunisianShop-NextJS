'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default function ProgressBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    NProgress.start()
    const timer = setTimeout(() => {
      NProgress.done()
    }, 300) // Small delay for smooth effect

    return () => clearTimeout(timer)
  }, [pathname, searchParams])

  return null
}
