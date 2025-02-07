'use client'

import React, { useState, useEffect } from 'react'
import Axios from '@/lib/Axios'
import GlobalApi from '@/api/GlobalApi'
import AxiosToastError from '@/lib/AxiosToastError'
import Loading from './Loading'
import { useSelector } from 'react-redux'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import toast from 'react-hot-toast'
import { useGlobalContext } from '@/providers/GlobalProvider'

export default function AddToCartButton({ data }) {
  const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext()
  const user = useSelector((state) => state.user)
  const cartItem = useSelector((state) => state.cartItem.cart)
  const [loading, setLoading] = useState(false)
  const [isAvailableCart, setIsAvailableCart] = useState(false)
  const [quantity, setQuantity] = useState(0)
  const [cartItemDetails, setCartItemsDetails] = useState()

  const handleADDTocart = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user?._id) {
      toast.error('Please sign in to add items to your cart.')
      return
    }

    try {
      setLoading(true)
      const response = await Axios({
        ...GlobalApi.AddToCart,
        data: { productId: data._id },
      })
      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)
        if (fetchCartItem) {
          fetchCartItem()
        }
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!data) return

    const checkingitem = cartItem.some(
      (item) => item.productId?._id === data._id
    )
    setIsAvailableCart(checkingitem)

    const product = cartItem.find((item) => item.productId?._id === data._id)
    setQuantity(product?.quantity || 0)
    setCartItemsDetails(product)
  }, [data, cartItem])

  const increaseQte = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    const response = await updateCartItem(cartItemDetails?._id, quantity + 1)
    if (response?.success) {
      toast.success('Item added')
    }
  }

  const decreaseQte = async (e) => {
    
    e.preventDefault()
    e.stopPropagation()
    
    if (quantity === 1) {
      deleteCartItem(cartItemDetails?._id)
    } else {
      const response = await updateCartItem(cartItemDetails?._id, quantity - 1)
      if (response?.success) {
        toast.success('Item removed')
      }
    }
  }

  return (
    <div className="w-full max-w-[150px]">
      {isAvailableCart ? (
        <div className="flex w-full h-full">
          <button
            onClick={decreaseQte}
            className="bg-red-500 hover:bg-red-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center"
          >
            <FaMinus />
          </button>
          <p className="flex-1 w-full font-semibold px-1 flex items-center justify-center">
            {quantity}
          </p>
          <button
            onClick={increaseQte}
            className="bg-red-500 hover:bg-red-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center"
          >
            <FaPlus />
          </button>
        </div>
      ) : (
        <button
          onClick={handleADDTocart}
          className="bg-red-500 hover:bg-red-700 text-white px-2 lg:px-4 py-1 rounded"
        >
          {loading ? <Loading /> : 'Add'}
        </button>
      )}
    </div>
  )
}
