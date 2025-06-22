'use client'

import authHttpClient from '@api/axios'
import { cn } from '@lib/cn'
import { getTeamId } from '@lib/getTeamId'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

import { UserInfo } from '@/app/shared/components/common/UserInfo'
import { fetchMembers, Member } from '@/app/shared/hooks/useMembers'
import { showError, showSuccess } from '@/app/shared/lib/toast'

import { PaginationHeader } from './PaginationHeader'

const PAGE_SIZE = 4
const teamId = getTeamId()

async function deleteMember(memberId: number): Promise<void> {
  await authHttpClient.delete(`/${teamId}/members/${memberId}`)
}

export default function EditMember() {
  const queryClient = useQueryClient()
  const { id: dashboardId } = useParams()
  const dashboardIdNum = Number(dashboardId)

  const [currentPage, setCurrentPage] = useState(1)

  const {
    data: members = [],
    isLoading,
    isError,
  } = useQuery<Member[]>({
    queryKey: ['members', dashboardIdNum],
    queryFn: () => fetchMembers(dashboardIdNum),
    enabled: !!dashboardIdNum,
  })

  // 본인이 구성원으로 들어가기 때문에 0 페이지일 경우 X
  const totalPages = Math.ceil(members.length / PAGE_SIZE)
  const startIdx = (currentPage - 1) * PAGE_SIZE
  const paginationMembers = members.slice(startIdx, startIdx + PAGE_SIZE)

  function handlePrev() {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  function handleNext() {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const { mutate: removeMember, isPending: isDeleting } = useMutation({
    mutationFn: (memberId: number) => deleteMember(memberId),
    onSuccess: () => {
      showSuccess('삭제에 성공하였습니다.')
      queryClient.invalidateQueries({ queryKey: ['members', dashboardIdNum] })
    },
    onError: () => {
      showError('삭제에 실패했습니다.')
    },
  })

  return (
    <div>
      <div className="BG-white max-w-584 overflow-x-auto rounded-16 px-32 py-24">
        <div className="mb-20 flex items-center justify-between">
          <h2 className="Text-black text-18 font-bold mobile-sm:text-14">
            구성원
          </h2>
          <PaginationHeader
            currentPage={currentPage}
            totalPages={totalPages}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </div>

        <form>
          <label
            htmlFor="title"
            className="Text-black mb-8 block text-16 mobile-sm:text-12"
          >
            이름
          </label>

          {isLoading && <div className="Text-gray py-12">로딩 중...</div>}

          {isError && (
            <div className="Text-blue py-12">
              멤버 정보를 불러오는 데 실패했습니다.
            </div>
          )}

          {!isLoading &&
            !isError &&
            paginationMembers.map((member, index) => {
              const isLast = index === paginationMembers.length - 1
              const isOwner = member.isOwner === true

              return (
                <div
                  key={member.id}
                  className={cn(
                    'flex items-center justify-between py-12',
                    !isLast && 'Border-bottom',
                  )}
                >
                  <UserInfo
                    nickname={member.nickname}
                    imageUrl={member.profileImageUrl ?? ''}
                  />
                  {isOwner && (
                    <Image
                      src="/images/crown.png"
                      alt="왕관 아이콘"
                      width={20}
                      height={20}
                      className="mr-20"
                    />
                  )}
                  {!isOwner && (
                    <button
                      type="button"
                      disabled={isDeleting}
                      onClick={() => removeMember(member.id)}
                      className={cn(
                        'Text-btn Border-btn rounded-md px-16 py-2 mobile-sm:text-12',
                        isDeleting && 'cursor-not-allowed opacity-50',
                      )}
                    >
                      삭제
                    </button>
                  )}
                </div>
              )
            })}
        </form>
      </div>
    </div>
  )
}
