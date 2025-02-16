'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import Axios from '@/lib/Axios'
import GlobalApi from '@/api/GlobalApi'
import AxiosToastError from '@/lib/AxiosToastError'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { addToCart, clearCart } from '@/store/cartSlice'
import { pricewithDiscount } from '@/lib/PriceWithDiscount'
import { handleAddOrder } from '@/store/orderSlice'
import { handleAddAddress } from '@/store/addressSlice'

export const GlobalContext = createContext(null)
export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch()
  const [totalPrice, setTotalPrice] = useState(0)
  const [notDiscountTotalPrice, setNotDiscountTotalPrice] = useState(0)
  const [totalQty, setTotalQty] = useState(0)
  const cartItem = useSelector((state) => state.cartItem.cart)
  const user = useSelector((state) => state.user)

  const fetchCartItem = async () => {
    try {
      const response = await Axios({ ...GlobalApi.GetCart })

      const { data: responseData } = response

      if (responseData.success) {
        dispatch(addToCart(responseData.data))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const updateCartItem = async (id, quantity) => {
    try {
      const response = await Axios({
        ...GlobalApi.UpdateCart,
        data: { _id: id, quantity },
      })
      const { data: responseData } = response
      if (responseData.success) {
        fetchCartItem()
        return responseData
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  const deleteCartItem = async (cartId) => {
    try {
      const response = await Axios({
        ...GlobalApi.DeleteCart,
        data: { _id: cartId },
      })
      const { data: responseData } = response
      if (responseData.success) {
        toast.success(responseData.message)
        fetchCartItem()
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  useEffect(() => {
    if (!cartItem.length) return

    // Calculate total quantity
    setTotalQty(cartItem.reduce((prev, curr) => prev + curr.quantity, 0))

    // Calculate total price after discount
    setTotalPrice(
      cartItem.reduce((prev, curr) => {
        const priceAfterDiscount = pricewithDiscount(
          curr?.productId?.price,
          curr?.productId?.discount
        )
        return prev + priceAfterDiscount * curr.quantity
      }, 0)
    )

    // Calculate total price without discount
    setNotDiscountTotalPrice(
      cartItem.reduce(
        (prev, curr) => prev + curr?.productId?.price * curr.quantity,
        0
      )
    )
  }, [cartItem])



  const fetchAddress = async () => {
    try {
      const response = await Axios({ ...GlobalApi.GetAdress })
      const { data: responseData } = response
      if (responseData.success) {
        dispatch(handleAddAddress(responseData.data))
      }
    } catch (error) {
      //AxiosToastError(error)
    }
  }

  const fetchOrder = async () => {
    try {
      const response = await Axios({ ...GlobalApi.OrderDetails })
      const { data: responseData } = response
      if (responseData.success) {
        dispatch(handleAddOrder(responseData.data))
      }
    } catch (error) {
      console.log('Error fetching orders:', error);
    }
  }

  

  useEffect(() => {
    if (!user?._id) {
      dispatch(clearCart())
    } else {
      fetchCartItem()
      fetchAddress()
      fetchOrder()
    }
  }, [user])

  return (
    <GlobalContext.Provider
      value={{
        fetchCartItem,
        updateCartItem,
        deleteCartItem,
        totalPrice,
        totalQty,
        notDiscountTotalPrice,
        fetchAddress,
        fetchOrder,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider
