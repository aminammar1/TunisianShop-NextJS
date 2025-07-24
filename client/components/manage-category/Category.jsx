'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import UploadCategory from './uploadCategory'
import Loading from '../Loading'
import NoData from '../NoData'
import Axios from '@/lib/Axios'
import GlobalApi from '@/api/GlobalApi'
import AxiosToastError from '@/lib/AxiosToastError'
import EditCategory from './EditCategory'
import CofirmBox from '../ConfirmeBox'
import toast from 'react-hot-toast'
import { setAllCategory } from '@/store/ProductSlice'
import { useDispatch } from 'react-redux'

export default function Category() {
  const [openUploadCategory, setOpenUploadCategory] = useState(false)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [categoryData, setCategoryData] = useState([])
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({
    name: '',
    image: '',
  })
  const [openConfimBoxDelete, setOpenConfirmBoxDelete] = useState(false)
  const [deleteCategory, setDeleteCategory] = useState({
    _id: '',
  })

  const fetchCategory = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...GlobalApi.GetCategories,
      })
      const { data: responseData } = response

      if (responseData.success) {
        setCategoryData(responseData.data)
        dispatch(setAllCategory(responseData.data))
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  const handleDeleteCategory = async () => {
    try {
      const response = await Axios({
        ...GlobalApi.deleteCategory,
        data: deleteCategory,
      })
      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)
        fetchCategory()
        setOpenConfirmBoxDelete(false)
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  return (
    <section className="">
      <div className="p-2 bg-white  flex items-center justify-between">
        <h2 className="font-semibold">Category</h2>
        <button
          onClick={() => setOpenUploadCategory(true)}
          className="text-md border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded-md"
        >
          Add Category
        </button>
      </div>
      {!categoryData[0] && !loading && <NoData />}
      <div className="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {categoryData.map((category) => {
          return (
            <div
              key={category._id}
              className="w-32 h-56 flex flex-col rounded shadow-md overflow-hidden"
            >
              {/* Image container with fixed height */}
              <div className="h-40 w-full relative">
                <Image
                  alt={category.name}
                  src={category.image}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Button area with fixed height */}
              <div className="h-16 flex items-center gap-2 p-1">
                <button
                  onClick={() => {
                    setOpenEdit(true)
                    setEditData(category)
                  }}
                  className="flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setOpenConfirmBoxDelete(true)
                    setDeleteCategory(category)
                  }}
                  className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          )
        })}
      </div>
      {loading && <Loading />}
      {openUploadCategory && (
        <UploadCategory
          fetchData={fetchCategory}
          close={() => setOpenUploadCategory(false)}
        />
      )}
      {openEdit && (
        <EditCategory
          data={editData}
          close={() => setOpenEdit(false)}
          fetchData={fetchCategory}
        />
      )}
      {openConfimBoxDelete && (
        <CofirmBox
          close={() => setOpenConfirmBoxDelete(false)}
          cancel={() => setOpenConfirmBoxDelete(false)}
          confirm={handleDeleteCategory}
        />
      )}
    </section>
  )
}
