'use client'

import { useEffect } from 'react'

export default function ErrorPage({
                                      error,
                                      reset,
                                  }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col items-center p-3">
            <h2 className="text-3xl text-red-700 mb-5">Something went wrong!</h2>
            {error && <p>Error: {error.message}</p>}
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
                className="py-2 px-3 bg-purple-700 text-white mt-5"
            >
                Try again
            </button>
        </div>
    )
}