'use client'

import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import UploadImage from '@/lib/UploadImage'
import toast from 'react-hot-toast'
import Axios from '@/lib/Axios'
import GlobalApi from '@/api/GlobalApi'
import AxiosToastError from '@/lib/AxiosToastError'
import { ClipLoader } from 'react-spinners'

export default function UploadCategory({ close, fetchData }) {
  const [data, setData] = useState({
    name: '',
    image: '',
  })

  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleOnChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0]

    if (!file) {
      return
    }
    setUploading(true)
    const response = await UploadImage(file)
    const { data: ImageResponse } = response
    
    setUploading(false)

    setData((preve) => {
      return {
        ...preve,
        image: ImageResponse.data.url,
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const response = await Axios({
        ...GlobalApi.AddCategory,
        data,
      })
      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)
        close()
        fetchData()
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center">
      <div className="bg-white max-w-4xl w-full p-4 rounded">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Category</h1>
          <button onClick={close} className="w-fit block ml-auto">
            <IoClose size={25} />
          </button>
        </div>
        <form className="my-3 grid gap-2" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label id="categoryName">Name</label>
            <input
              type="text"
              id="categoryName"
              placeholder="Enter category name"
              value={data.name}
              name="name"
              onChange={handleOnChange}
              className="bg-white-50 p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent rounded"
            />
          </div>
          <div className="grid gap-1">
            <p>Image</p>
            <div className="flex gap-4 flex-col lg:flex-row items-center">
              <div className="border bg-gray-100 h-36 w-full lg:w-36 flex items-center justify-center rounded">
                {data.image ? (
                  <img
                    alt="category"
                    src={data.image}
                    className="w-full h-full object-scale-down"
                  />
                ) : (
                  <p className="text-sm text-neutral-500">No Image</p>
                )}
              </div>
              <label htmlFor="uploadCategoryImage">
              
                <div
                  className={`
                            ${
                              !data.name
                                ? 'bg-gray-300'
                                : 'border-primary-200 hover:bg-primary-100'
                            }  
                                px-4 py-2 rounded cursor-pointer border font-medium
                            `}
                >
                  {uploading ? 'Uploading...' : 'Upload Image'}
                </div>

                <input
                  disabled={!data.name}
                  onChange={handleUploadCategoryImage}
                  type="file"
                  id="uploadCategoryImage"
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <button
            className={`
                    ${
                      data.name && data.image
                        ? 'bg-red-600 hover:bg-red-900'
                        : 'bg-red-600 '
                    }
                    py-2     
                    rounded-md
                    text-white
                    `}
          >
            {loading ? <ClipLoader size={24} color={'#fff'} /> : 'Add Category' }
          </button>
        </form>
      </div>
    </section>
  )
}
