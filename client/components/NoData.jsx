import React from 'react'
import Image from 'next/image'

const NoData = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 gap-2">
      <Image
        src="/assets/images/no_data.jpg"
        alt="no data"
        className="w-36"
        width={144}
        height={144}
      />
      <p className="text-neutral-500">No Data</p>
    </div>
  )
}

export default NoData
