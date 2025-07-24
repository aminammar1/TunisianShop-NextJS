'use client'
import React from 'react'
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
  FaGoogle,
  FaRss,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaFax,
} from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-white-100 text-gray-800 pt-10 pb-6">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0">
        {/* Left Section: Logo and Language Selector */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-red-600">Hanouti.Tn</h2>
          <div className="mt-3 text-sm">
            <label htmlFor="language-select" className="mr-2 font-medium">Select Language:</label>
            <select
              id="language-select"
              className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none"
            >
              <option value="en">English (US)</option>
              <option value="ar">Arabic</option>
              <option value="fr">French</option>
            </select>
          </div>
        </div>

        {/* Center Section: Contact Information */}
        <div className="text-center md:text-left space-y-3">
          <div className="flex items-center space-x-3">
            <FaMapMarkerAlt className="text-red-600" />
            <span>5000 Monastir, Tunisia</span>
          </div>
          <div className="flex items-center space-x-3">
            <FaPhoneAlt className="text-red-600" />
            <span>123456789</span>
          </div>
          <div className="flex items-center space-x-3">
            <FaFax className="text-red-600" />
            <span>(123) 456-7890</span>
          </div>
        </div>

        {/* Right Section: Social Media Icons */}
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Social Media</h3>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-red-600 text-xl hover:text-red-700">
              <FaFacebookF />
            </a>
            <a href="#" className="text-red-600 text-xl hover:text-red-700">
              <FaTwitter />
            </a>
            <a href="#" className="text-red-600 text-xl hover:text-red-700">
              <FaLinkedinIn />
            </a>
            <a href="#" className="text-red-600 text-xl hover:text-red-700">
              <FaYoutube />
            </a>
            <a href="#" className="text-red-600 text-xl hover:text-red-700">
              <FaInstagram />
            </a>
            <a href="#" className="text-red-600 text-xl hover:text-red-700">
              <FaGoogle />
            </a>
            <a href="#" className="text-red-600 text-xl hover:text-red-700">
              <FaRss />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 mt-8"></div>

      {/* Bottom Section: Links and Copyright */}
      <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm">
        <nav className="flex flex-wrap justify-center gap-4">
          <a href="/about" className="hover:text-red-600">ABOUT US</a>
          <a href="/contact" className="hover:text-red-600">CONTACT US</a>
          <a href="/help" className="hover:text-red-600">HELP</a>
          <a href="/privacy-policy" className="hover:text-red-600">PRIVACY POLICY</a>
          <a href="/disclaimer" className="hover:text-red-600">DISCLAIMER</a>
        </nav>
        <p className="mt-4 md:mt-0">&copy; 2025 - Mohamed-amine-ammar</p>
      </div>
    </footer>
  )
}
