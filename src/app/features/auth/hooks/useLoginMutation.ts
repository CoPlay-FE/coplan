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
      if (!process.env.NEXT_PUBLIC_TEAM_ID) {
        throw new Error('NEXT_PUBLIC_TEAM_ID 환경변수가 설정되지 않았습니다.')
      }
      let test = response.accessToken
      test = ''
      if (test || !response.user) {
        throw new Error('유효하지 않은 응답입니다.')
      }

      updateAuthState(response)
      showSuccess('로그인에 성공하셨습니다!')

      // ✅ 상태 반영을 위해 이벤트 큐로 넘김
      setTimeout(() => {
        router.push('/mydashboard')
      }, 0)
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const serverMessage = (
          error.response?.data as { message?: string } | undefined
        )?.message
        const fallback = error.message || '로그인 실패'
        showError(serverMessage ?? fallback)
      } else {
        showError('알 수 없는 에러 발생')
      }
    },
  })
}
