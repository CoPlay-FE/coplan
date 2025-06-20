import { UserInfo } from '@components/common/UserInfo'
import { cn } from '@lib/cn'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'

import { useModalStore } from '@/app/shared/store/useModalStore'

import { mockMembers } from './mockMember'

const PAGE_SIZE = 5

export default function EditInvitation() {
  const pathname = usePathname()
  const { openModal } = useModalStore()
  const [currentPage, setCurrentPage] = React.useState(1)
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
      <div className="BG-white h-360 w-584 rounded-16 px-32 py-24">
        <div className="mb-24 flex items-center justify-between">
          <h2 className="Text-black text-18 font-bold">초대 내역</h2>

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
            <button
              onClick={() => openModal('invite')}
              className={cn(
                'BG-violet ml-16 flex items-center gap-8 rounded-5 px-12 py-6',
                pathname === '/modal' && 'font-semibold',
              )}
            >
              <div className="relative flex size-12">
                <Image
                  src="/images/invitation-white.png"
                  fill
                  alt="초대 버튼"
                />
              </div>
              <p className="text-14 text-white">초대하기</p>
            </button>
          </div>
        </div>

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
                  className={`flex items-center justify-between py-4 ${
                    !isLast ? 'Border-bottom' : ''
                  }`}
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
