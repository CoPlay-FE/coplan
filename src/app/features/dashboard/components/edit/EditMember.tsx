'use client'

import { cn } from '@lib/cn'
import React from 'react'

import { UserInfo } from '@/app/shared/components/common/UserInfo'
import { usePagination } from '@/app/shared/hooks/usePagination'

import { mockMembers } from './mockMember'
import { PaginationHeader } from './PaginationHeader'

const MEMBER_SIZE = 4 // 페이지 당 표시 구성원 수

export default function EditMember() {
  const {
    currentPage,
    totalPages,
    currentItems: paginationMembers,
    handlePrev,
    handleNext,
  } = usePagination(mockMembers, MEMBER_SIZE)

  return (
    <div>
      <div className="BG-white h-360 w-584 rounded-16 px-32 py-24">
        <PaginationHeader
          currentPage={currentPage}
          totalPages={totalPages}
          title="구성원"
          onPrev={handlePrev}
          onNext={handleNext}
        />

        <form>
          <label htmlFor="title" className="Text-black mb-8 block text-16">
            이름
          </label>
          <div className="flex flex-col">
            {paginationMembers.map((member, index) => {
              const isLast = index === paginationMembers.length - 1
              return (
                <div
                  key={index}
                  className={cn(
                    'flex items-center justify-between py-12',
                    !isLast && 'Border-bottom',
                  )}
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
