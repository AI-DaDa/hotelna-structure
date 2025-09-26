"use client"

import { useState } from 'react'
import Loading from '../loading'

export default function LoaderTestPage() {
  const [showLoader, setShowLoader] = useState(false)

  return (
    <div className="min-h-screen bg-black">
      {showLoader && <Loading />}

      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#d5b15f] mb-8">
            Loader Test Page
          </h1>

          <button
            onClick={() => setShowLoader(true)}
            className="px-8 py-4 bg-[#d5b15f] text-black font-semibold rounded-lg hover:bg-[#c4a24f] transition-colors mr-4"
          >
            Show Loader
          </button>

          <button
            onClick={() => setShowLoader(false)}
            className="px-8 py-4 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
          >
            Hide Loader
          </button>
        </div>
      </div>
    </div>
  )
}
