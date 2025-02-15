'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import AddAddress from '../AddAddress'
import { MdDelete } from 'react-icons/md'
import { MdEdit } from 'react-icons/md'
import EditAddressDetails from './EditAddressDetails'
import Axios from '@/lib/Axios'
import GlobalApi from '@/api/GlobalApi'
import toast from 'react-hot-toast'
import AxiosToastError from '@/lib/AxiosToastError'
import { useGlobalContext } from '@/providers/GlobalProvider'

export default function Address() {
  const addressList = useSelector((state) => state.address.addressList)
  const [openAddress,setOpenAddress] = useState(false)
  const [OpenEdit,setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({})
  const { fetchAddress } = useGlobalContext()

  const handleDeleteAddress = async (id) => {
    try {
      const response = await Axios({
        ...GlobalApi.DeleteAdress,
        data: {
          _id: id,
        },
      })

      const { data: responseData } = response
      if (responseData.success) {
        toast.success(responseData.message)
        fetchAddress()
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }



  return (
    <div className=''>
        <div className='bg-white shadow-lg px-2 py-2 flex justify-between gap-4 items-center '>
            <h2 className='font-semibold text-ellipsis line-clamp-1'>Address</h2>
            <button onClick={()=>setOpenAddress(true)} className='border border-primary-200 text-primary-200 px-3 hover:bg-primary-200 hover:text-black py-1 rounded-full'>
                Add Address
            </button>
        </div>
        <div className='bg-gray-50 p-2 grid gap-4'>
              {
                addressList.map((address,index)=>{
                  return(
                    
                      <div key={index} className={`border rounded p-3 flex gap-3 bg-white ${!address.status && 'hidden'}`}>
                          <div className='w-full'>
                            <p>{address.street}</p>
                            <p>{address.city}</p>
                            <p>{address.state}</p>
                            <p>{address.country} - {address.zip}</p>
                            <p>{address.mobile}</p>
                          </div>
                          <div className=' grid gap-10'>
                            <button onClick={()=>{
                              setOpenEdit(true)
                              setEditData(address)
                            }} className='bg-green-200 p-1 rounded  hover:text-white hover:bg-green-600'>
                              <MdEdit/>
                            </button>
                            <button onClick={()=>
                              handleDeleteAddress(address._id)
                            } className='bg-red-200 p-1 rounded hover:text-white hover:bg-red-600'>
                              <MdDelete size={20}/>  
                            </button>
                          </div>
                      </div>
                  )
                })
              }
              <div onClick={()=>setOpenAddress(true)} className='h-16 bg-red-600 border-2 border-dashed flex justify-center items-center cursor-pointer text-white'>
                Add address
              </div>
        </div>

        {
          openAddress && (
            <AddAddress close={()=>setOpenAddress(false)}/>
          )
        }

        {
          OpenEdit && (
            <EditAddressDetails data={editData} close={()=>setOpenEdit(false)}/>
          )
        }
    </div>
  )
}

