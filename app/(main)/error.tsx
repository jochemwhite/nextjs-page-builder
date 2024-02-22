'use client' // Error components must be Client Components
 
import Image from 'next/image'
import { useEffect } from 'react'
 
export default function Error({
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
    <div className='flex flex-col justify-center items-center h-full'>
      <h2>Something went wrong!</h2>
      <p>
        errorMessage: {error.message}
      </p>
      <Image className='rounded-full mt-8' src='/memes/jochemslam.gif' alt='Error' width={250} height={250} />
    </div>
  )
}