import { showError, showSuccess } from '@lib/toast'
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import axios from 'axios'
import { useRouter } from 'next/navigation'

import { login } from '../api/authApi'
import { LoginRequest, LoginResponse } from '../types/auth.type'
import { useAuth } from './useAuth'

export function useLoginMutation() {
  const router = useRouter()
  const { updateAuthState } = useAuth()

  return useMutation<LoginResponse, AxiosError | Error, LoginRequest>({
    mutationFn: login,
    onSuccess: async (response) => {
      updateAuthState(response)
      showSuccess('로그인에 성공하셨습니다!')
      await new Promise((resolve) => setTimeout(resolve, 400))
      router.push('/mydashboard')
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const severMessage = (
          error.response?.data as { message?: string } | undefined
        )?.message
        const fallback = error.message || '로그인 실패'
        showError(severMessage ?? fallback)
      } else {
        showError('알 수 없는 에러 발생')
      }
    },
  })
}
