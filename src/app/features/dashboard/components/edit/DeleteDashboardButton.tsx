'use client'

import authHttpClient from '@api/axios'
import { showError, showSuccess } from '@lib/toast'
import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

type DeleteDashboardButtonProps = {
  dashboardId: string
}

export default function DeleteDashboardButton({
  dashboardId,
}: DeleteDashboardButtonProps) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const mutation = useMutation<void, Error, void>({
    mutationFn: async () => {
      if (!process.env.NEXT_PUBLIC_TEAM_ID) {
        throw new Error('NEXT_PUBLIC_TEAM_ID 환경변수가 설정되지 않았습니다.')
      }
      await authHttpClient.delete(
        `/${process.env.NEXT_PUBLIC_TEAM_ID}/dashboards/${dashboardId}`,
      )
    },
    onSuccess: () => {
      // 대시보드 삭제 후 사이드 바 대시보드 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['dashboards'] })

      router.push('/mydashboard')
      showSuccess('대시보드가 삭제되었습니다')
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          '대시보드 삭제 중 오류가 발생했습니다.'
        showError(message)
      } else {
        showError('알 수 없는 오류가 발생했습니다.')
      }
    },
  })

  // sonner로 삭제 확인 토스트 구현
  function handleDelete() {
    toast('대시보드를 삭제하시겠습니까?', {
      description: '삭제 후 되돌릴 수 없습니다.',
      action: {
        label: '삭제하기',
        onClick: () => mutation.mutate(),
      },
    })
  }

  return (
    <button
      onClick={handleDelete}
      // isLoading -> isPending으로 수정됨
      disabled={mutation.isPending}
      className={`Text-black my-8 whitespace-nowrap rounded-8 font-semibold transition-opacity mobile-sm:text-12 ${
        mutation.isPending
          ? 'cursor-not-allowed opacity-50'
          : 'hover:opacity-90'
      }`}
    >
      대시보드 삭제하기
    </button>
  )
}
