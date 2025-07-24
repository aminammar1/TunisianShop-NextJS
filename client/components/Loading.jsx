import React from 'react'

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <div role="status" className="relative">
        <div className="w-5 h-5 border-3 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        <div
          className="absolute inset-0 w-5 h-5 border-3 border-transparent border-t-purple-500 rounded-full animate-spin"
          style={{ animationDirection: 'reverse', animationDuration: '1s' }}
        ></div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export default Loading
