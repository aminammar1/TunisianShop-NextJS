'use client'

import { useSelector } from 'react-redux'
import NoData from '../NoData'

export default function UserOrder() {
  const orders = useSelector((state) => state.order.orderList)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white  rounded-lg p-6 mb-6 text-center">
        <h1 className="text-3xl font-bold text-red-600">Your Orders</h1>
      </div>

      {/* No Data Message */}
      {!orders.length && <NoData />}

      {/* Order List */}
      <div className="space-y-6">
        {orders.map((order, index) => (
          <div
            key={order._id + index}
            className="bg-white rounded-lg p-6  border border-red-100"
          >
            {/* Order Header */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-semibold text-red-600">
                Order No: {order.orderId}
              </p>
              <span className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>

            {/* Product Details */}
            <div className="flex items-center space-x-6">
              <img
                src={order.product_details.image[0]}
                alt={order.product_details.name}
                className="w-20 h-20 object-cover rounded-lg border"
              />
              <div className="flex-1">
                <p className="text-lg font-medium text-gray-900">
                  {order.product_details.name}
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-4 text-sm text-gray-700 space-y-1">
              <p>
                <span className="font-semibold">Delivery:</span>{' '}
                {order.delivery_address.city}, {order.delivery_address.zip}
              </p>
              <p>
                <span className="font-semibold">Payment:</span>{' '}
                {order.payment_status}
              </p>
              <p>
                <span className="font-semibold">Total Amount:</span>
                {`   ${(order.totalAmt * 3.3).toFixed(
                  3
                )} TND`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
