import Image from 'next/image'
import React from 'react'
import { useState } from 'react'

import { UserInfo } from '@/app/shared/components/common/UserInfo'

import { mockMembers } from './mockMember'

const PAGE_SIZE = 4 // 페이지당 표시할 구성원 수

export default function EditMember() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(mockMembers.length / PAGE_SIZE)

  const startIndex = (currentPage - 1) * PAGE_SIZE
  const paginationMembers = mockMembers.slice(
    startIndex,
    startIndex + PAGE_SIZE,
  )

  function handlePrev() {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  function handleNext() {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  return (
    <div>
      {/* 컨테이너 */}
      <div className="BG-white h-360 w-584 rounded-16 px-32 py-24">
        <div className="mb-24 flex items-center justify-between">
          <h2 className="Text-black text-18 font-bold">구성원</h2>

          <div className="flex items-center">
            <p className="Text-gray mr-16 text-12">
              {totalPages} 페이지 중 {currentPage}
            </p>
            <button onClick={handlePrev} disabled={currentPage === 1}>
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
            <button onClick={handleNext} disabled={currentPage === totalPages}>
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

        <form>
          <label htmlFor="title" className="Text-black mb-8 block text-16">
            이름
          </label>
          <div className="flex flex-col">
            {paginationMembers.map((member, index) => {
              // 해당 페이지 중 마지막 요소인 경우 border-bottom 미적용
              const isLast = index === paginationMembers.length - 1
              return (
                <div
                  key={index}
                  className={`flex items-center justify-between py-12 ${
                    !isLast ? 'Border-bottom' : ''
                  }`}
                >
                  <UserInfo
                    nickname={member.nickname}
                    imageUrl={member.imageUrl}
                  />
                  <button className="Text-btn Border-btn rounded-md px-16 py-2">
                    삭제
                  </button>
                </div>
              )
            })}
          </div>
        </form>
      </div>
    </div>
  )
}
