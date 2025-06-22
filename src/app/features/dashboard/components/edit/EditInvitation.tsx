'use client'

import authHttpClient from '@api/axios'
import Tooltip from '@components/common/header/Collaborator/Tooltip'
import { cn } from '@lib/cn'
import { showError, showSuccess } from '@lib/toast'
import { useModalStore } from '@store/useModalStore'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

import { getTeamId } from '@/app/shared/lib/getTeamId'

import { PaginationHeader } from './PaginationHeader'

const INVITATION_SIZE = 5
const teamId = getTeamId()

interface Invitation {
  id: number
  invitee: {
    nickname: string
    email: string
  }
}

export default function EditInvitation() {
  const params = useParams()
  const { openModal } = useModalStore()

  const dashboardId = params.id as string
  const queryClient = useQueryClient()

  const [currentPage, setCurrentPage] = useState(1)

  const {
    data: invitations = [],
    isLoading,
    isError,
    error,
  } = useQuery<Invitation[]>({
    queryKey: ['invitations', teamId, dashboardId],
    queryFn: async () => {
      if (!teamId || !dashboardId) return []
      const res = await authHttpClient.get<{ invitations: Invitation[] }>(
        `/${teamId}/dashboards/${dashboardId}/invitations`,
      )
      return res.data.invitations
    },
    enabled: !!teamId && !!dashboardId,
    retry: false,
  })

  // length가 0인 경우에도 최소 페이지 1로 보장
  const totalPages = Math.max(
    1,
    Math.ceil(invitations.length / INVITATION_SIZE),
  )

  const currentItems = invitations.slice(
    (currentPage - 1) * INVITATION_SIZE,
    currentPage * INVITATION_SIZE,
  )

  const cancelMutation = useMutation({
    mutationFn: async (invitationId: number) => {
      if (!teamId || !dashboardId)
        throw new Error('teamId 또는 dashboardId가 없습니다.')
      await authHttpClient.delete(
        `/${teamId}/dashboards/${dashboardId}/invitations/${invitationId}`,
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['invitations', teamId, dashboardId],
      })
      showSuccess('초대가 취소되었습니다.')
    },
    onError: (error) => {
      showError(error.message)
    },
  })

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1))
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages))

  // 에러 메시지 정리
  const errorMessage =
    isError && axios.isAxiosError(error)
      ? error.response?.status === 403
        ? '초대 권한이 없습니다.'
        : '초대 정보를 불러오는 데 실패했습니다.'
      : isError
        ? '초대 정보를 불러오는 데 실패했습니다.'
        : null

  return (
    <div className="BG-white w-full max-w-584 overflow-x-auto whitespace-nowrap rounded-16 px-32 py-24">
      <PaginationHeader
        currentPage={currentPage}
        totalPages={totalPages}
        title="초대 내역"
        onPrev={handlePrev}
        onNext={handleNext}
      >
        <button
          onClick={() => openModal('invite')}
          className="BG-violet flex w-fit shrink-0 items-center gap-8 rounded-5 px-12 py-6"
        >
          <div className="relative flex size-12 shrink-0">
            <Image src="/images/invitation-white.png" fill alt="초대 버튼" />
          </div>
          <p className="text-14 text-white">초대하기</p>
        </button>
      </PaginationHeader>

      <form className="overflow-x-auto">
        <label htmlFor="title" className="Text-black mb-8 block text-16">
          이메일
        </label>
        <div className="flex flex-col gap-4">
          {isLoading && (
            <p className="Text-gray py-12 text-center">로딩 중...</p>
          )}

          {errorMessage && (
            <p className="Text-blue py-12 text-center">{errorMessage}</p>
          )}

          {!isLoading &&
            !errorMessage &&
            currentItems.map((member, index) => {
              const isLast = index === currentItems.length - 1
              return (
                <div
                  key={member.id}
                  className={cn(
                    'flex items-center justify-between gap-12 py-4',
                    !isLast && 'Border-bottom',
                  )}
                >
                  <div className="flex min-w-0 items-center gap-12">
                    <div className="flex min-w-0 flex-col">
                      <Tooltip content={member.invitee.nickname}>
                        <p className="Text-black max-w-[200px] cursor-help truncate text-13">
                          {member.invitee.email}
                        </p>
                      </Tooltip>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={cancelMutation.isPending}
                    className={cn(
                      'Text-btn Border-btn w-fit shrink-0 rounded-md px-16 py-2',
                      cancelMutation.isPending &&
                        'cursor-not-allowed opacity-50',
                    )}
                    onClick={() => cancelMutation.mutate(member.id)}
                  >
                    {cancelMutation.isPending ? '취소 중...' : '취소'}
                  </button>
                </div>
              )
            })}
        </div>
      </form>
    </div>
  )
}
