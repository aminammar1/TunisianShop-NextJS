'use client'

import { useState } from 'react'
import { useForm } from "react-hook-form"
import Axios from "@/lib/Axios"
import GlobalApi from "@/api/GlobalApi"
import toast from "react-hot-toast"
import AxiosToastError from "@/lib/AxiosToastError"
import { IoClose } from "react-icons/io5"
import { useGlobalContext } from "@/providers/GlobalProvider"
import { ClipLoader } from 'react-spinners'


export default function EditAddressDetails({ close  , data}) {
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            _id : data._id,
            userId : data.userId,
            street: data.street,
            city: data.city,
            state: data.state,
            zip: data.zip,
            country: data.country,
            mobile: data.mobile,
        }
    })
    const { fetchAddress } = useGlobalContext()

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            const response = await Axios({
                ...GlobalApi.UpdateAdress,
                data: {
                    _id : data._id,
                    userId : data.userId,
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
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <section className='bg-black fixed top-0 left-0 right-0 bottom-0 z-50 bg-opacity-70 h-screen overflow-auto'>
            <div className='bg-white p-4 w-full max-w-lg mt-8 mx-auto rounded'>
                <div className='flex justify-between items-center gap-4'>
                    <h2 className='font-semibold'>Edit Address</h2>
                    <button onClick={close} className='hover:text-red-500'>
                        <IoClose  size={25}/>
                    </button>
                </div>
                <form className='mt-4 grid gap-4' onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid gap-1'>
                        <label htmlFor='street'>street :</label>
                        <input
                            type='text'
                            id='street' 
                            className='border bg-gray-50 p-2 rounded focus:outline-none focus:ring focus:ring-red-400 '
                            {...register("street",{required : true})}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='city'>City :</label>
                        <input
                            type='text'
                            id='city' 
                            className='border bg-gray-50 p-2 rounded focus:outline-none focus:ring focus:ring-red-400'
                            {...register("city",{required : true})}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='state'>State :</label>
                        <input
                            type='text'
                            id='state' 
                            className='border bg-gray-50 p-2 rounded focus:outline-none focus:ring focus:ring-red-400'
                            {...register("state",{required : true})}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='zip'>Zip :</label>
                        <input
                            type='text'
                            id='pincode' 
                            className='border bg-gray-50 p-2 rounded focus:outline-none focus:ring focus:ring-red-400' 
                            {...register("zip",{required : true})}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='country'>Country :</label>
                        <input
                            type='text'
                            id='country' 
                            className='border bg-gray-50 p-2 rounded focus:outline-none focus:ring focus:ring-red-400'
                            {...register("country",{required : true})}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <label htmlFor='mobile'>Mobile No. :</label>
                        <input
                            type='text'
                            id='mobile' 
                            className='border bg-gray-50 p-2 rounded focus:outline-none focus:ring focus:ring-red-400'
                            {...register("mobile",{required : true})}
                        />
                    </div>
    
                    <button type='submit' className='bg-red-600 hover:bg-red-800 w-full text-white rounded-md py-2 font-semibold mt-4' disabled  = {loading} > {loading ? <ClipLoader size={24} color="#fff" /> : 'Submit' }</button>
                </form>
            </div>
        </section>
      ) 
}    