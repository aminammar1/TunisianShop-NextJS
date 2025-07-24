'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { IoClose } from 'react-icons/io5'
import UploadImage from '@/lib/UploadImage'
import Axios from '@/lib/Axios'
import GlobalApi from '@/api/GlobalApi'
import AxiosToastError from '@/lib/AxiosToastError'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

export default function EditSubCategory({ close, data, fetchData }) {
  const [subcategory, setSubCategory] = useState({
    _id: data._id,
    name: data.name,
    image: data.image,
    category: data.category || [],
  })
  const [uploading, setUploading] = useState(false)
  const allCategory = useSelector((state) => state.product.allCategory)

  const handleChange = (e) => {
    setSubCategory({ ...subcategory, [e.target.name]: e.target.value })
  }

  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0]
    if (!file) {
      return
    }
    setUploading(true)
    const response = await UploadImage(file)
    const { data: ImageResponse } = response
    setUploading(false)

    setSubCategory((preve) => {
      return {
        ...preve,
        image: ImageResponse.data.url,
      }
    })
  }

  const handleRemoveCategorySelected = (categoryId) => {
    const index = subcategory.category.findIndex((el) => el._id === categoryId)
    subcategory.category.splice(index, 1)
    setSubCategory((preve) => {
      return {
        ...preve,
      }
    })
  }

  const handleSubmitSubCategory = async (e) => {
    e.preventDefault()
    try {
      const response = await Axios({
        ...GlobalApi.updateSubCategory,
        data: subcategory,
      })
      const { data: ResponseData } = response

      if (ResponseData.success) {
        toast.success(ResponseData.message)
        if (close) {
          close()
        }
        if (fetchData) {
          fetchData()
        }
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section className="fixed top-0 right-0 bottom-0 left-0 bg-neutral-800 bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white p-4 rounded">
        <div className="flex items-center justify-between gap-3">
          <h1 className="font-semibold">Edit Sub Category</h1>
          <button onClick={close}>
            <IoClose size={25} />
          </button>
        </div>
        <form className="my-3 grid gap-3" onSubmit={handleSubmitSubCategory}>
          <div className="grid gap-1">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              value={subcategory.name}
              onChange={handleChange}
              className="p-3 bg-blue-50 border outline-none focus-within:border-primary-200 rounded "
            />
          </div>
          <div className="grid gap-1">
            <p>Image</p>
            <div className="flex flex-col lg:flex-row items-center gap-3">
              <div className="border h-36 w-full lg:w-36 bg-blue-50 flex items-center justify-center relative">
                {!subcategory.image ? (
                  <p className="text-sm text-neutral-400">No Image</p>
                ) : (
                  <Image
                    alt="subCategory"
                    src={subcategory.image}
                    fill
                    className="object-scale-down"
                  />
                )}
              </div>
              <label htmlFor="uploadSubCategoryImage">
                <div className="px-4 py-1 border border-primary-100 text-primary-200 rounded hover:bg-primary-200 hover:text-neutral-900 cursor-pointer  ">
                  Upload Image
                </div>
                <input
                  type="file"
                  id="uploadSubCategoryImage"
                  className="hidden"
                  onChange={handleUploadSubCategoryImage}
                />
              </label>
            </div>
          </div>
          <div className="grid gap-1">
            <label>Select Category</label>
            <div className="border focus-within:border-primary-200 rounded">
              {/*display value**/}
              <div className="flex flex-wrap gap-2">
                {subcategory.category.map((categoryId, index) => {
                  const category = allCategory.find(
                    (cat) => cat._id === categoryId
                  )
                  return (
                    <div
                      key={categoryId + 'selectedValue'}
                      className="bg-white shadow-md px-1 m-1 flex items-center gap-2"
                    >
                      {category ? category.name : 'Unknown Category'}
                      <div
                        className="cursor-pointer hover:text-red-600"
                        onClick={() => handleRemoveCategorySelected(categoryId)}
                      >
                        <IoClose size={20} />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/*select category**/}
              <select
                className="w-full p-2 bg-transparent outline-none border"
                onChange={(e) => {
                  const value = e.target.value
                  const categoryDetails = allCategory.find(
                    (el) => el._id == value
                  )

                  setSubCategory((preve) => {
                    return {
                      ...preve,
                      category: [...preve.category, categoryDetails],
                    }
                  })
                }}
              >
                <option value={''}>Select Category</option>
                {allCategory.map((category, index) => {
                  return (
                    <option
                      value={category?._id}
                      key={category._id + 'subcategory'}
                    >
                      {category?.name}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>

          <button
            className={`px-4 py-2 border
                            ${
                              subcategory?.name &&
                              subcategory?.image &&
                              subcategory?.category[0]
                                ? 'bg-primary-200 hover:bg-primary-100'
                                : 'bg-gray-200'
                            }    
                            font-semibold
                        `}
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  )
}
