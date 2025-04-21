'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function SearchParamsDebug() {
    const q = useSearchParams().get('q')
    return <p>Query: {q}</p>
    }

    export default function NotFound() {
    return (
        <div style={{ textAlign: 'center', paddingTop: 100 }}>
        <h1>404 - Page Not Found</h1>
        <Suspense fallback={null}>
            <SearchParamsDebug />
        </Suspense>
        </div>
    )
    }
