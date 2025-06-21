'use client'

import Tooltip from '@components/common/header/Collaborator/Tooltip'
import api from '@lib/axios'
import { cn } from '@lib/cn'
import { useModalStore } from '@store/useModalStore'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

import { PaginationHeader } from './PaginationHeader'

const INVITATION_SIZE = 5

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

  // ✅ dashboardId 안전 처리
  const rawDashboardId = params.id
  const dashboardId: string =
    typeof rawDashboardId === 'string'
      ? rawDashboardId
      : (rawDashboardId?.[0] ?? '')

  // ✅ teamId는 환경변수에서 가져오며 string으로 강제 처리
  const rawTeamId = process.env.NEXT_PUBLIC_TEAM_ID
  const teamId: string =
    typeof rawTeamId === 'string' ? rawTeamId : (rawTeamId?.[0] ?? '')

  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery<Invitation[]>({
    queryKey: ['invitations', teamId, dashboardId],
    queryFn: async () => {
      if (!teamId || !dashboardId) return []
      const res = await api.get<{ invitations: Invitation[] }>(
        `/${teamId}/dashboards/${dashboardId}/invitations`,
      )
      return res.data.invitations
    },
    enabled: !!teamId && !!dashboardId,
  })

  const invitations = data ?? []

  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(invitations.length / INVITATION_SIZE)

  const currentItems = invitations.slice(
    (currentPage - 1) * INVITATION_SIZE,
    currentPage * INVITATION_SIZE,
  )

  const cancelMutation = useMutation({
    mutationFn: async (invitationId: number) => {
      if (!teamId || !dashboardId)
        throw new Error('teamId 또는 dashboardId가 없습니다.')
      await api.delete(
        `/${teamId}/dashboards/${dashboardId}/invitations/${invitationId}`,
      )
    },
    onSuccess: () => {
      if (!teamId || !dashboardId) return
      queryClient.invalidateQueries({
        queryKey: ['invitations', teamId, dashboardId],
      })
      alert('초대가 취소되었습니다.')
    },
    onError: (error) => {
      alert('초대 취소 중 오류가 발생했습니다.')
      console.error(error)
    },
  })

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1)
  }
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1)
  }

  if (isLoading) return <p>로딩 중...</p>
  if (error) return <p>초대 목록을 불러오는데 실패했습니다.</p>

  return (
    <div>
      <div className="BG-white max-h-[360px] w-584 overflow-y-auto rounded-16 px-32 py-24">
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
            {currentItems.length === 0 ? (
              <p className="py-12 text-center text-gray-500">
                초대된 사용자가 없습니다.
              </p>
            ) : (
              currentItems.map((member, index) => {
                const isLast = index === currentItems.length - 1
                return (
                  <div
                    key={member.id}
                    className={cn(
                      'flex items-center justify-between py-4',
                      !isLast && 'Border-bottom',
                    )}
                  >
                    <div className="flex items-center gap-12">
                      <div className="flex flex-col">
                        {/* 이메일 텍스트 대신 Tooltip으로 감싸기 */}
                        <Tooltip content={member.invitee.nickname}>
                          <p className="cursor-help text-13 text-gray-500">
                            {member.invitee.email}
                          </p>
                        </Tooltip>
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={cancelMutation.isPending}
                      className="Text-btn Border-btn rounded-md px-16 py-2"
                      onClick={() => cancelMutation.mutate(member.id)}
                    >
                      {cancelMutation.isPending ? '취소 중...' : '취소'}
                    </button>
                  </div>
                )
              })
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
