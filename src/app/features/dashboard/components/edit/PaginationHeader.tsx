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
}: PaginationHeaderProps) {
  return (
    <div className="mb-20 flex max-w-500 items-center justify-between whitespace-nowrap">
      <h2 className="Text-black text-18 font-bold">{title}</h2>

      <div className="flex shrink-0 items-center">
        <p className="Text-gray mx-32 shrink-0 text-12">
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
      </div>
    </div>
  )
}
