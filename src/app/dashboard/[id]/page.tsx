'use client'

import Image from 'next/image'

import useColumns from '@/app/api/useColumns'

import Column from './Column/Column'
export default function DashboardID() {
  const dashboard = 15120
  const { data: columns, isLoading, error } = useColumns(dashboard)
  if (isLoading) return <p>loading...</p>
  if (error) return <p>error...{error.message}</p>

  return (
    <>
      <div className="fixed left-0 h-1080 w-300 bg-gray-100">사이드바</div>
      <div className="ml-300">
        <div className="flex">
          {columns?.map((column) => <Column key={column.id} column={column} />)}
          <div className="BG-gray Border-column p-20">
            <button className="BG-white Border-btn flex items-center gap-12 whitespace-nowrap rounded-8 px-85 pb-20 pt-24 text-18 font-bold">
              <span>새로운 컬럼 추가하기</span>
              <div className="flex h-22 w-22 items-center justify-center rounded-4 bg-blue-100">
                <Image
                  src={'/images/plus.svg'}
                  alt="플러스 아이콘"
                  width={10}
                  height={10}
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
