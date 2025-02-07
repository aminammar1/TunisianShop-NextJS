'use client';

import React from 'react';
import { IoClose } from 'react-icons/io5';
import { useGlobalContext } from '@/providers/GlobalProvider';
import { DisplayPrice } from '@/lib/DisplayPrice';
import { FaCaretRight } from 'react-icons/fa';
import AddToCartButton from './AddToCartButton';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { pricewithDiscount } from '@/lib/PriceWithDiscount';

export default function DisplayCartItem({ close }) {
  const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);

  const redirectToCheckoutPage = () => {};

  return (
    <section className='bg-neutral-900 fixed top-0 bottom-0 right-0 left-0 bg-opacity-70 z-50'>
      <div className='bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto'>
        <div className='flex items-center p-4 shadow-md gap-3 justify-between'>
          <h2 className='font-semibold'>Cart</h2>
          <Link href='/' className='lg:hidden'>
            <IoClose size={25} />
          </Link>
          <button onClick={close} className='hidden lg:block'>
            <IoClose size={25} />
          </button>
        </div>

        <div className='min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-gray-50 p-2 flex flex-col gap-4'>
          {cartItem.length > 0 ? (
            <>
              <div className='flex items-center justify-between px-4 py-2 bg-gray-100 text-red-500 rounded-full'>
                <p>Your total savings</p>
                <p>{DisplayPrice(notDiscountTotalPrice - totalPrice)}</p>
              </div>
              <div className='bg-white rounded-lg p-4 grid gap-5 overflow-auto'>
                {cartItem.map((item, index) => (
                  <div key={item?._id + 'cartItemDisplay'} className='flex w-full gap-4'>
                    <div className='w-16 h-16 min-h-16 min-w-16 bg-gray-200 border rounded'>
                      <img
                        src={item?.productId?.image[0]}
                        alt={item?.productId?.name}
                        className='object-scale-down w-full h-full'
                      />
                    </div>
                    <div className='w-full max-w-sm text-xs'>
                      <p className='text-xs text-ellipsis line-clamp-2'>{item?.productId?.name}</p>
                      <p className='text-neutral-400'>{item?.productId?.unit}</p>
                      <p className='font-semibold'>
                        {DisplayPrice(pricewithDiscount(item?.productId?.price, item?.productId?.discount))}
                      </p>
                    </div>
                    <div>
                      <AddToCartButton data={item?.productId} />
                    </div>
                  </div>
                ))}
              </div>
              <div className='bg-white p-4'>
                <h3 className='font-semibold'>Bill details</h3>
                <div className='flex gap-4 justify-between ml-1'>
                  <p>Items total</p>
                  <p className='flex items-center gap-2'>
                    <span className='line-through text-neutral-400'>{DisplayPrice(notDiscountTotalPrice)}</span>
                    <span>{DisplayPrice(totalPrice)}</span>
                  </p>
                </div>
                <div className='flex gap-4 justify-between ml-1'>
                  <p>Quantity total</p>
                  <p className='flex items-center gap-2'>{totalQty} item</p>
                </div>
                <div className='flex gap-4 justify-between ml-1'>
                  <p>Delivery Charge</p>
                  <p className='flex items-center gap-2'>Free</p>
                </div>
                <div className='font-semibold flex items-center justify-between gap-4'>
                  <p>Grand total</p>
                  <p>{DisplayPrice(totalPrice)}</p>
                </div>
              </div>
            </>
          ) : (
            <div className='bg-white flex flex-col justify-center items-center'>
              <img src='/assets/images/empty-card.png' alt='Empty Cart' className='w-full h-full object-scale-down' />
              <Link onClick={close} href='/' className='block bg-red-600 px-4 py-2 text-white rounded'>
                Shop Now
              </Link>
            </div>
          )}
        </div>

        {cartItem.length > 0 && (
          <div className='p-2'>
            <div className='bg-red-700 text-neutral-100 px-4 font-bold text-base py-4 static bottom-3 rounded flex items-center gap-4 justify-between'>
              <div>{DisplayPrice(totalPrice)}</div>
              <button onClick={redirectToCheckoutPage} className='flex items-center gap-1'>
                Proceed
                <span>
                  <FaCaretRight />
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}