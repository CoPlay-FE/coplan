'use client'

import api from '@lib/axios'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'

type DeleteDashboardButtonProps = {
  dashboardId: string
}

export default function DeleteDashboardButton({
  dashboardId,
}: DeleteDashboardButtonProps) {
  const router = useRouter()

  const mutation = useMutation<void, Error, void>({
    mutationFn: async () => {
      if (!process.env.NEXT_PUBLIC_TEAM_ID) {
        throw new Error('NEXT_PUBLIC_TEAM_ID 환경변수가 설정되지 않았습니다.')
      }
      await api.delete(
        `/${process.env.NEXT_PUBLIC_TEAM_ID}/dashboards/${dashboardId}`,
      )
    },
    onSuccess: () => {
      router.push('/dashboard')
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          '대시보드 삭제 중 오류가 발생했습니다.'
        alert(message)
        console.error('대시보드 삭제 오류:', message)
      } else {
        alert('알 수 없는 오류가 발생했습니다.')
        console.error('대시보드 삭제 오류:', error)
      }
    },
  })

  function handleDelete() {
    const confirmed = confirm(
      '정말로 이 대시보드를 삭제하시겠습니까? 삭제 후 되돌릴 수 없습니다.',
    )
    if (!confirmed) return
    mutation.mutate()
  }

  return (
    <button
      onClick={handleDelete}
      // isLoading -> isPending으로 수정됨
      disabled={mutation.isPending}
      className={`Text-black my-8 rounded-8 font-semibold transition-opacity ${
        mutation.isPending
          ? 'cursor-not-allowed opacity-50'
          : 'hover:opacity-90'
      }`}
    >
      대시보드 삭제하기
    </button>
  )
}
