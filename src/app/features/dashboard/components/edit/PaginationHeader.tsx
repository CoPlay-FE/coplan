'use client'

import Image from 'next/image'
import React from 'react'

type PaginationHeaderProps = {
  currentPage: number
  totalPages: number
  title: string
  onPrev: () => void
  onNext: () => void
  children?: React.ReactNode
}

export function PaginationHeader({
  currentPage,
  totalPages,
  title,
  onPrev,
  onNext,
  children,
}: PaginationHeaderProps) {
  return (
    <div className="mb-24 flex items-center justify-between">
      <h2 className="Text-black text-18 font-bold">{title}</h2>

      <div className="flex items-center">
        <p className="Text-gray mr-16 text-12">
          {totalPages} 페이지 중 {currentPage}
        </p>
        <button onClick={onPrev} disabled={currentPage === 1}>
          <Image
            src={
              currentPage === 1
                ? '/images/prev-disabled.png'
                : '/images/prev.png'
            }
            alt="이전"
            width={36}
            height={36}
          />
        </button>
        <button onClick={onNext} disabled={currentPage === totalPages}>
          <Image
            src={
              currentPage === totalPages
                ? '/images/next-disabled.png'
                : '/images/next.png'
            }
            alt="다음"
            width={36}
            height={36}
          />
        </button>
        {children && <div className="ml-16">{children}</div>}
      </div>
    </div>
  )
}
