'use client'

import React, { useEffect, useState } from 'react'
import UploadSubCategory from './UploadSubCategory'
import EditSubCategory from './EditSubCategory'
import Axios from '@/lib/Axios'
import GlobalApi from '@/api/GlobalApi'
import AxiosToastError from '@/lib/AxiosToastError'
import DisplayTable from '../DisplayTable'
import ViewImage from '../ViewImage'
import { MdDelete } from 'react-icons/md'
import { HiPencil } from 'react-icons/hi'
import CofirmBox from '../ConfirmeBox'
import toast from 'react-hot-toast'
import { createColumnHelper } from '@tanstack/react-table';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setAllSubCategory } from '@/store/ProductSlice'


export default function SubCategory() {
  const dispatch = useDispatch()
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false)
  const [data, setData] = useState([])
  const columnHelper = createColumnHelper()
  const [ImageURL, setImageURL] = useState('')
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({
    _id: '',
  })
  const [deleteSubCategory, setDeleteSubCategory] = useState({
    _id: '',
  })
  const [openDeleteConfirmBox, setOpenDeleteConfirmBox] = useState(false)
  const allCategory = useSelector((state) => state.product.allCategory)

  const fetchSubCategory = async () => {
    try {
      
      const response = await Axios({
        ...GlobalApi.GetSubCategories,
      })
      const { data: responseData } = response

      if (responseData.success) {
        setData(responseData.data)
        dispatch (setAllSubCategory(responseData.data))
        
      }
    } catch (error) {
      console.log(error)
    }
    }

  useEffect(() => {
    fetchSubCategory()
  }, [])

  const column = [
    columnHelper.accessor('name', {
      header: 'Name',
    }),
    columnHelper.accessor('image', {
      header: 'Image',
      cell: ({ row }) => {
        console.log('row')
        return (
          <div className="flex justify-center items-center">
            <img
              src={row.original.image}
              alt={row.original.name}
              className="w-8 h-8 cursor-pointer"
              onClick={() => {
                setImageURL(row.original.image)
              }}
            />
          </div>
        )
      },
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      cell: ({ row }) => {
        const categories = row.original.category || []; // Fallback to an empty array
        return (
          <>
            {categories.map((categoryId, index) => {
              const category = allCategory.find((cat) => cat._id === categoryId);
              return (
                <p key={categoryId + 'table'} className="px-1 inline-block">
                  {category ? category.name : "Unknown Category"}
                </p>
              );
            })}
          </>
        );
      },
    }),
    columnHelper.accessor('_id', {
      header: 'Action',
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => {
                setOpenEdit(true)
                setEditData(row.original)
              }}
              className="p-2 bg-green-100 rounded-full hover:text-green-600"
            >
              <HiPencil size={20} />
            </button>
            <button
              onClick={() => {
                setOpenDeleteConfirmBox(true)
                setDeleteSubCategory(row.original)
              }}
              className="p-2 bg-red-100 rounded-full text-red-500 hover:text-red-600"
            >
              <MdDelete size={20} />
            </button>
          </div>
        )
      },
    }),
  ]

  const handleDeleteSubCategory = async () => {
    try {
      const response = await Axios({
        ...GlobalApi.deleteSubCategory,
        data: deleteSubCategory,
      })

      const { data: responseData } = response
      if (responseData.success) {
        toast.success(responseData.message)
        fetchSubCategory()
        setOpenDeleteConfirmBox(false)
        setDeleteSubCategory({ _id: '' })
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section className="">
      <div className="p-2 bg-white  flex items-center justify-between">
        <h2 className="font-semibold">Sub Category</h2>
        <button
          onClick={() => setOpenAddSubCategory(true)}
          className="text-md border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded-md"
        >
          Add Sub Category
        </button>
      </div>

      <div className="overflow-auto w-full max-w-[95vw]">
        <DisplayTable data={data} column={column} />
      </div>

      {openAddSubCategory && (
        <UploadSubCategory
          close={() => setOpenAddSubCategory(false)}
          fetchData={fetchSubCategory}
        />
      )}

      {ImageURL && <ViewImage url={ImageURL} close={() => setImageURL('')} />}

      {openEdit && (
        <EditSubCategory
          data={editData}
          close={() => setOpenEdit(false)}
          fetchData={fetchSubCategory}
        />
      )}

      {openDeleteConfirmBox && (
        <CofirmBox
          cancel={() => setOpenDeleteConfirmBox(false)}
          close={() => setOpenDeleteConfirmBox(false)}
          confirm={handleDeleteSubCategory}
        />
      )}
    </section>
  )
}
