'use client'

import { inviteUser } from '@dashboard/api/invitation'
import { useModalStore } from '@store/useModalStore'
import { useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useParams } from 'next/navigation'
import { useState } from 'react'

import { showError, showSuccess } from '@/app/shared/lib/toast'

export default function CreateInvitationModal() {
  const { modalType, closeModal } = useModalStore()
  const [email, setEmail] = useState('')
  const { id: dashboardId } = useParams()
  const teamId = process.env.NEXT_PUBLIC_TEAM_ID ?? ''
  const queryClient = useQueryClient()

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email) return

    try {
      if (!dashboardId) {
        throw new Error('대시보드 ID가 없습니다.')
      }

      await inviteUser({ email, dashboardId: Number(dashboardId) })

      // ✅ 초대 후 캐시 무효화 (초대 내역 새로고침)
      queryClient.invalidateQueries({
        queryKey: ['invitations', teamId, String(dashboardId)],
      })

      showSuccess('초대가 완료되었습니다.')
      closeModal()
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>
      showError(error?.response?.data?.message || '초대에 실패하였습니다.')
    }
  }

  if (modalType !== 'invite') return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="BG-white h-auto w-584 rounded-16 p-32">
        <h2 className="Text-black mb-24 text-24 font-bold mobile:text-18 tablet:text-20">
          초대하기
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-32">
            <label
              htmlFor="email"
              className="Text-black mb-8 block text-18 mobile:text-12 tablet:text-16"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="초대 이메일을 입력해주세요."
              className="Border-section w-full rounded-8 px-12 py-10 text-16 outline-none"
              required
            />
          </div>

          <div className="flex gap-10">
            <button
              type="button"
              onClick={closeModal}
              className="Border-btn Text-black h-54 w-full rounded-8 px-16 py-10 text-16 font-semibold mobile:h-40 mobile:text-12 tablet:h-48 tablet:w-full tablet:text-14"
            >
              취소
            </button>
            <button
              type="submit"
              className="BG-violet h-54 w-full rounded-8 px-16 py-10 text-16 font-semibold text-white hover:opacity-90 mobile:h-40 mobile:text-12 tablet:h-48 tablet:w-full tablet:text-14"
            >
              초대
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
