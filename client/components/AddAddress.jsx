'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Axios from '@/lib/Axios'
import GlobalApi from '@/api/GlobalApi'
import toast from 'react-hot-toast'
import AxiosToastError from '@/lib/AxiosToastError'
import { IoClose } from 'react-icons/io5'
import { useGlobalContext } from '@/providers/GlobalProvider'
import { ClipLoader } from 'react-spinners'

export default function AddAddress({ close }) {
  const { register, handleSubmit, reset } = useForm()
  const { fetchAddress } = useGlobalContext()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const response = await Axios({
        ...GlobalApi.CreateAdress,
        data: {
          street: data.street,
          city: data.city,
          state: data.state,
          zip: data.zip,
          country: data.country,
          mobile: data.mobile,
        },
      })

      const { data: responseData } = response
      if (responseData.success) {
        toast.success(responseData.message)
        // Close modal and refresh addresses
        if (close) {
          close()
          reset()
          fetchAddress()
        }
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    // Modal overlay
    <section className="fixed inset-0 z-50 bg-black bg-opacity-70 h-screen w-screen overflow-auto flex justify-center items-start py-8">
      {/* Modal container */}
      <div className="bg-white w-full max-w-lg rounded shadow-md p-4 relative">
        {/* Header section with title & close button */}
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg">Add Address</h2>
          <button onClick={close} className="hover:text-red-500">
            <IoClose size={25} />
          </button>
        </div>

        {/* Form */}
        <form className="mt-4 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          {['street', 'city', 'state', 'zip', 'country', 'mobile'].map(
            (field) => (
              <div key={field}>
                <label htmlFor={field} className="capitalize block mb-1">
                  {field}:
                </label>
                <input
                  type="text"
                  id={field}
                  className="border bg-gray-50 p-2 rounded w-full focus:outline-none focus:ring focus:ring-red-400"
                  {...register(field, { required: true })}
                />
              </div>
            )
          )}

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <ClipLoader size={24} color="#fff" /> : 'Add Address'}
          </button>
        </form>
      </div>
    </section>
  )
}
