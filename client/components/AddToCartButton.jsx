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
        <div className="flex items-center bg-red-50 rounded-full border-2 border-red-100 overflow-hidden shadow-lg">
          <button
            onClick={decreaseQte}
            className="bg-red-600 hover:bg-red-700 text-white p-2.5 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <FaMinus className="text-xs" />
          </button>
          <div className="flex-1 px-4 py-2.5 font-bold text-center text-red-700 bg-white min-w-10 border-x border-red-100">
            {quantity}
          </div>
          <button
            onClick={increaseQte}
            className="bg-red-600 hover:bg-red-700 text-white p-2.5 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <FaPlus className="text-xs" />
          </button>
        </div>
      ) : (
        <button
          onClick={handleADDTocart}
          disabled={loading}
          className="relative w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-5 py-2.5 rounded-full font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg transform active:scale-95 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {loading ? (
            <div className="relative z-10 flex items-center justify-center gap-2">
              <Loading />
              <span className="text-xs font-semibold">Adding...</span>
            </div>
          ) : (
            <span className="relative z-10 text-sm font-bold">Add to Cart</span>
          )}
        </button>
      )}
    </div>
  )
}
