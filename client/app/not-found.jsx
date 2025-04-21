'use client'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

// Move the component using useSearchParams inside the main component
export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', paddingTop: 100 }}>
      <h1>404 - Page Not Found</h1>
      <Suspense fallback={<p>Loading search params...</p>}>
        <SearchParamsComponent />
      </Suspense>
    </div>
  )
}

// Define the component after it's used
function SearchParamsComponent() {
  const searchParams = useSearchParams()
  const q = searchParams ? searchParams.get('q') : null
  return <p>Query: {q}</p>
}
