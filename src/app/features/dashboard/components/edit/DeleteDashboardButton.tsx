'use client'

import api from '@lib/axios'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

type DeleteDashboardButtonProps = {
  dashboardId: string
}

export default function DeleteDashboardButton({
  dashboardId,
}: DeleteDashboardButtonProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    const confirmed = confirm(
      '정말로 이 대시보드를 삭제하시겠습니까? 삭제 후 되돌릴 수 없습니다.',
    )

    if (!confirmed) return

    try {
      setIsDeleting(true)

      if (!process.env.NEXT_PUBLIC_TEAM_ID) {
        throw new Error('NEXT_PUBLIC_TEAM_ID 환경변수가 설정되지 않았습니다.')
      }

      await api.delete(
        `/${process.env.NEXT_PUBLIC_TEAM_ID}/dashboards/${dashboardId}`,
      )

      // 삭제 후 대시보드 목록 페이지로 이동
      router.push('/dashboard')
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          '대시보드 삭제 중 오류가 발생했습니다.'
        console.error('대시보드 삭제 오류:', message)
        alert(message)
      } else {
        console.error('대시보드 삭제 오류:', error)
        alert('알 수 없는 오류가 발생했습니다.')
      }
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`Text-black my-8 rounded-8 font-semibold transition-opacity ${
        isDeleting ? 'cursor-not-allowed opacity-50' : 'hover:opacity-90'
      }`}
    >
      대시보드 삭제하기
    </button>
  )
}
