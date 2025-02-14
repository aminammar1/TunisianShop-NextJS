'use client'

import { useState } from 'react'
import { Mail } from 'lucide-react'

export default function NewsLetter() {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Submitting email:', email)
  }

  return (
    <div className="w-full max-w-5xl mx-auto rounded-xl p-10 bg-white">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center md:space-x-6 space-y-6 md:space-y-0"
      >
        <div className="flex items-center space-x-4">
          <Mail className="text-red-500" size={80} />
          <span className="font-extrabold text-xl whitespace-nowrap">
            Subscribe to the Newsletter
          </span>
        </div>
        <div className="flex-1 flex">
          <input
            type="email"
            placeholder="Your Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 p-4 bg-gray-200 rounded-l-xl border border-gray-300 outline-none text-xl focus:outline-none focus:border-red-500 transition-colors"
            required
          />
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 transition-colors text-white px-8 py-4 rounded-r-xl font-bold text-xl "
          >
            Subscribe
          </button>
        </div>
      </form>
    </div>
  )
}
