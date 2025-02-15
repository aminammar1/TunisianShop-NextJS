'use client'

import React, { useState } from 'react'
import { useGlobalContext } from '@/providers/GlobalProvider'
import { DisplayPrice } from '@/lib/DisplayPrice'
import AddAddress from '@/components/AddAddress'
import { useSelector } from 'react-redux'
import Axios from '@/lib/Axios'
import AxiosToastError from '@/lib/AxiosToastError'
import GlobalApi from '@/api/GlobalApi'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { ClipLoader } from 'react-spinners'

export default function page() {
  const {
    notDiscountTotalPrice,
    totalPrice,
    totalQty,
    fetchCartItem,
    fetchOrder,
  } = useGlobalContext()

  const [openAddress, setOpenAddress] = useState(false)
  const addressList = useSelector((state) => state.address.addressList)
  const [selectAddress, setSelectAddress] = useState(0)
  const cartItemsList = useSelector((state) => state.cartItem.cart)
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleCashOnDelivery = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...GlobalApi.CashOnDeliveryOrder,
        data: {
          list_items: cartItemsList,
          addressId: addressList[selectAddress]?._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
        },
      })
      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)
        fetchCartItem()
        fetchOrder()
        router.push('/successOrder?text=Order')
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  const handleOnlinePayment = async () => {
    try {
        setLoading(true)
        const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_KEY
        const stripe = await loadStripe(stripePublicKey)

        const response = await Axios({
            ...GlobalApi.Payment,
            data: {
                list_items: cartItemsList,
                addressId: addressList[selectAddress]?._id,
                subTotalAmt: totalPrice,
                totalAmt: totalPrice,
            },
        })

        const { data: responseData } = response

        await stripe.redirectToCheckout({ sessionId: responseData.id })

        fetchCartItem()
        fetchOrder()
    } catch (error) {
        console.error("Payment error:", error);
        toast.error("Payment failed. Please try again.");
    } finally {
        setLoading(false)
    }
}


  return (
    <section className="bg-white-50">
      {/* Outer container: stacks on mobile, side-by-side on larger screens */}
      <div className="container mx-auto p-4 flex flex-col lg:flex-row items-start gap-5">
        {/* LEFT COLUMN: Addresses */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold">Choose your Address</h3>
          <div className="bg-white p-2 grid gap-4 mt-2">
            {addressList.map((address, index) => {
              // Hide addresses that don't have "status"
              if (!address.status) return null
              return (
                <label
                  htmlFor={'address' + index}
                  key={address._id}
                  className="border rounded p-3 flex gap-3 hover:bg-gray-100 cursor-pointer"
                >
                  <div>
                    <input
                      id={'address' + index}
                      type="radio"
                      value={index}
                      onChange={(e) => setSelectAddress(e.target.value)}
                      name="address"
                      className="accent-red-600"
                    />
                  </div>
                  <div>
                    <p>{address.street}</p>
                    <p>{address.city}</p>
                    <p>{address.state}</p>
                    <p>
                      {address.country} - {address.zip}
                    </p>
                    <p>{address.mobile}</p>
                  </div>
                </label>
              )
            })}

            <div
              onClick={() => setOpenAddress(true)}
              className="h-16 bg-red-600 text-white border-2 border-dashed flex justify-center items-center cursor-pointer"
            >
              Add address
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="w-full max-w-md bg-white py-4 px-2 self-start">
          <h3 className="text-lg font-semibold mb-3">Summary</h3>
          <div className="bg-white p-4">
            <h3 className="font-semibold">Bill details</h3>
            {/* Items total */}
            <div className="flex gap-4 justify-between ml-1">
              <p>Items total</p>
              <p className="flex items-center gap-2">
                <span className="line-through text-neutral-400">
                  {DisplayPrice(notDiscountTotalPrice)}
                </span>
                <span>{DisplayPrice(totalPrice)}</span>
              </p>
            </div>
            {/* Quantity total */}
            <div className="flex gap-4 justify-between ml-1">
              <p>Quantity total</p>
              <p className="flex items-center gap-2">
                {totalQty} item{totalQty > 1 ? 's' : ''}
              </p>
            </div>
            {/* Delivery Charge */}
            <div className="flex gap-4 justify-between ml-1">
              <p>Delivery Charge</p>
              <p className="flex items-center gap-2">Free</p>
            </div>
            {/* Grand total */}
            <div className="font-semibold flex items-center justify-between gap-4">
              <p>Grand total</p>
              <p>{DisplayPrice(totalPrice)}</p>
            </div>
          </div>

          {/* Payment Buttons */}
          <div className="w-full flex flex-col gap-4 mt-4">
            <button
              className="py-2 px-4 bg-red-600 hover:bg-red-700 rounded text-white font-semibold"
              onClick={handleOnlinePayment}
            >
              {loading ? (
                <ClipLoader color="#f00" size={20} />
              ) : (
                'Online Payment'
              )}
            </button>
            <button
              className="py-2 px-4 border-2 border-red-600 font-semibold text-red-700 hover:bg-red-600 hover:text-white"
              onClick={handleCashOnDelivery}
            >
              {loading ? (
                <ClipLoader color="#f00" size={20} />
              ) : (
                'Cash On Delivery'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Modal for adding a new address */}
      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}
    </section>
  )
}
