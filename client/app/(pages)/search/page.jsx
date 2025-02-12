'use client'

import React, { useEffect, useState } from 'react'
import CardLoading from '@/components/LoadingCard'
import GlobalApi from '@/api/GlobalApi'
import Axios from '@/lib/Axios'
import AxiosToastError from '@/lib/AxiosToastError'
import CardProduct from '@/components/CardProduct'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'

export default function page() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const LoadingArrayCard = new Array(10).fill(null)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const searchParams = useSearchParams()
  const searchText = searchParams.get('q') || ''
  const noDataImage = '/assets/images/no_data.jpg'

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...GlobalApi.SearchProduct,
        params: { search: searchText.trim(), page },
      })
      const { data: responseData } = response

      if (responseData.success) {
        setData(responseData.data)
        setTotalPage(responseData.totalPage)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setPage(1)
    setData([])
    fetchData()
  }, [searchText])

  useEffect(() => {
    if (page > 1) {
      fetchData()
    }
  }, [page])

  const handleFetchMore = () => {
    if (page < totalPage) {
      setPage((prev) => prev + 1)
    }
  }

  return (
    <section className="bg-white">
      <div className="container mx-auto p-4">
        <p className="font-semibold">Search Results: {data.length}</p>

        <InfiniteScroll
          dataLength={data.length}
          hasMore={true}
          next={handleFetchMore}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-4 gap-4">
            {data.map((p, index) => (
              <CardProduct data={p} key={p?._id + 'searchProduct' + index} />
            ))}

            {loading &&
              LoadingArrayCard.map((_, index) => (
                <CardLoading key={'loadingsearchpage' + index} />
              ))}
          </div>
        </InfiniteScroll>

        {!data[0] && !loading && (
          <div className="flex flex-col justify-center items-center w-full mx-auto">
            <Image
              src={noDataImage}
              className="w-full h-full max-w-xs max-h-xs block"
              alt="No Data"
              width={300}
              height={300}
            />
            <p className="font-semibold my-2">No Data found</p>
          </div>
        )}
      </div>
    </section>
  )
}
