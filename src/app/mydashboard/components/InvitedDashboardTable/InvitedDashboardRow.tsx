'use client'

import { useState } from 'react'

import { Invitation } from '@/app/shared/types/dashboard'

import { useRespondToInvitation } from '../../hooks/useMyDashboards'

interface InvitedDashboardRowProps {
  invitation: Invitation
}

export default function InvitedDashboardRow({
  invitation,
}: InvitedDashboardRowProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const respondToInvitationMutation = useRespondToInvitation()

  const handleAccept = async () => {
    if (isProcessing) return

    setIsProcessing(true)
    try {
      await respondToInvitationMutation.mutateAsync({
        invitationId: invitation.id,
        accept: true,
      })
      console.log('초대 수락 성공!')
    } catch (error) {
      console.error('초대 수락 실패:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleReject = async () => {
    if (isProcessing) return

    setIsProcessing(true)
    try {
      await respondToInvitationMutation.mutateAsync({
        invitationId: invitation.id,
        accept: false,
      })
      console.log('초대 거절 성공!')
    } catch (error) {
      console.error('초대 거절 실패:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="grid grid-cols-3 items-center gap-20 border-b border-gray-100 py-20 pl-36 pr-32">
      {/* 대시보드 이름 */}
      <span className="Text-black text-16">
        {invitation.dashboard.title || '제목 없음'}
      </span>

      {/* 초대자 */}
      <span className="Text-black text-center text-16">
        {invitation.inviter.nickname || invitation.inviter.email}
      </span>

      {/* 수락/거절 버튼들 */}
      <div className="flex items-center justify-center gap-10">
        <button
          onClick={handleAccept}
          disabled={isProcessing}
          className="BG-blue flex h-32 w-70 items-center justify-center rounded-8 text-14 font-medium text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isProcessing ? '처리 중' : '수락'}
        </button>
        <button
          onClick={handleReject}
          disabled={isProcessing}
          className="BG-white Border-blue Text-blue flex h-32 w-70 items-center justify-center rounded-8 border text-14 font-medium transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isProcessing ? '처리 중' : '거절'}
        </button>
      </div>
    </div>
  )
}
