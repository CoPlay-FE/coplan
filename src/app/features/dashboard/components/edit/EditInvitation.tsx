'use client'

import { cn } from '@lib/cn'
import Image from 'next/image'
import React from 'react'

import { UserInfo } from '@/app/shared/components/common/UserInfo'
import { usePagination } from '@/app/shared/hooks/usePagination'
import { useModalStore } from '@/app/shared/store/useModalStore'

import { mockMembers } from './mockMember'
import { PaginationHeader } from './PaginationHeader'

const INVITATION_SIZE = 5 // 페이지 당 표시 초대 내역

export default function EditInvitation() {
  const { openModal } = useModalStore()

  const {
    currentPage,
    totalPages,
    currentItems: paginationMembers,
    handlePrev,
    handleNext,
  } = usePagination(mockMembers, INVITATION_SIZE)

  return (
    <div>
      <div className="BG-white h-360 w-584 rounded-16 px-32 py-24">
        <PaginationHeader
          currentPage={currentPage}
          totalPages={totalPages}
          title="초대 내역"
          onPrev={handlePrev}
          onNext={handleNext}
        >
          <button
            onClick={() => openModal('invite')}
            className="BG-violet flex items-center gap-8 rounded-5 px-12 py-6"
          >
            <div className="relative flex size-12">
              <Image src="/images/invitation-white.png" fill alt="초대 버튼" />
            </div>
            <p className="text-14 text-white">초대하기</p>
          </button>
        </PaginationHeader>

        <form>
          <label htmlFor="title" className="Text-black mb-8 block text-16">
            이메일
          </label>
          <div className="flex flex-col gap-4">
            {paginationMembers.map((member, index) => {
              const isLast = index === paginationMembers.length - 1
              return (
                <div
                  key={index}
                  className={cn(
                    'flex items-center justify-between py-4',
                    !isLast && 'Border-bottom',
                  )}
                >
                  <UserInfo
                    nickname={member.nickname}
                    imageUrl={member.imageUrl}
                  />
                  <button className="Text-btn Border-btn rounded-md px-16 py-2">
                    취소
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
