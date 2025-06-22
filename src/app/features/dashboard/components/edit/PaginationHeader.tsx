'use client'

import Image from 'next/image'
import React from 'react'

type PaginationHeaderProps = {
  currentPage: number
  totalPages: number
  onPrev: () => void
  onNext: () => void
  children?: React.ReactNode
}

export function PaginationHeader({
  currentPage,
  totalPages,
  onPrev,
  onNext,
}: PaginationHeaderProps) {
  return (
    <div className="flex max-w-500 items-center justify-center">
      <p className="Text-gray mx-16 text-12 sm:mx-32 mobile-sm:text-10">
        {totalPages} 페이지 중 {currentPage}
      </p>

      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="relative mobile-sm:size-30"
      >
        <Image
          src={
            currentPage === 1 ? '/images/prev-disabled.png' : '/images/prev.png'
          }
          alt="이전"
          width={36}
          height={36}
        />
      </button>
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="relative mobile-sm:size-30"
      >
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
  )
}
