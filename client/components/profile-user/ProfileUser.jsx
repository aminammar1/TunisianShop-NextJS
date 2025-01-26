'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegUserCircle } from 'react-icons/fa'
import Axios from '@/utils/Axios'
import GlobalApi from '@/api/GlobalApi'
import toast from 'react-hot-toast'
import AxiosToastError from '@/utils/AxiosToastError'
import { setUser } from '@/store/userSlice'
import fetchUserDetails from '@/utils/UserDetails'
import { ClipLoader } from 'react-spinners'

export default function ProfileUser() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile || undefined,
  })
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    })
  }, [user])

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const handleMobileChange = (value) => {
    setUserData({ ...userData, mobile: value })
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('avatar', file)

    try {
      setUploading(true)
      const response = await Axios({
        ...GlobalApi.uploadAvatar,
        data: formData,
      })

      if (response.data.success) {
        toast.success('Avatar updated successfully!')
        const userData = await fetchUserDetails()
        dispatch(setUser(userData.data))
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const response = await Axios({
        ...GlobalApi.updateProfilUser,
        data: userData,
      })

      if (response.data.success) {
        toast.success(response.data.message)
        const userData = await fetchUserDetails()
        dispatch(setUser(userData.data))
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4">
      {/** Profile Image Upload */}
      <div className="w-20 h-20 bg-red-500 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
        {user.avatar ? (
          <Image
            alt={user.name}
            src={user.avatar}
            width={500}
            height={500}
            className="w-full h-full object-cover"
            layout="responsive"
          />
        ) : (
          <FaRegUserCircle size={65} />
        )}
      </div>
      <label
        htmlFor="avatar-upload"
        className="text-sm min-w-20 border border-primary-100 hover:border-primary-200 hover:bg-primary-200 px-3 py-1 rounded-full mt-3 cursor-pointer inline-block text-center"
      >
        {uploading ? 'Uploading...' : 'Change Avatar'}
      </label>
      <input
        id="avatar-upload"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={uploading}
      />

      {/** User Info Form */}
      <form className="my-4 grid gap-6" onSubmit={handleSubmit}>
        {/** Floating Label for Name */}
        <div className="relative">
          <input
            type="text"
            id="name"
            placeholder=" "
            className="block w-full p-3 bg-transparent border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent peer"
            value={userData.name}
            name="name"
            onChange={handleInputChange}
            required
          />
          <label
            htmlFor="name"
            className="absolute left-3 top-3 px-1 bg-white text-gray-500 transition-all duration-200 transform -translate-y-6 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
        </div>

        {/** Floating Label for Email */}
        <div className="relative">
          <input
            type="email"
            id="email"
            placeholder=" "
            className="block w-full p-3 bg-transparent border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent peer"
            value={userData.email}
            name="email"
            onChange={handleInputChange}
            required
          />
          <label
            htmlFor="email"
            className="absolute left-3 top-3 px-1 bg-white text-gray-500 transition-all duration-200 transform -translate-y-6 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
        </div>

        {/** Floating Label for Mobile */}
        <div className="relative">
          <input
            id="mobile"
            placeholder=" "
            value={userData.mobile}
            onChange={handleMobileChange}
            className="block w-full p-3 bg-transparent border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent peer"
            required
          />
          <label
            htmlFor="mobile"
            className="absolute left-3 top-3 px-1 bg-white text-gray-500 transition-all duration-200 transform -translate-y-6 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Mobile
          </label>
        </div>

        <button className="w-full py-3 rounded-lg font-semibold bg-red-600 hover:bg-red-700 text-white transition-colors duration-200 flex justify-center items-center">
          {loading ? <ClipLoader size={24} color={'#fff'} /> : 'Submit'}
        </button>
      </form>
    </div>
  )
}
