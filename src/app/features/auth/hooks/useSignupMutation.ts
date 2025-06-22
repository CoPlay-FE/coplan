import { showError, showSuccess } from '@lib/toast'
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import axios from 'axios'
import { useRouter } from 'next/navigation'

import { User } from '@/app/shared/types/user.type'

import { signup } from '../api/authApi'
import { SignupRequest } from '../types/auth.type'

export function useSignupMutation() {
  if (!process.env.NEXT_PUBLIC_TEAM_ID) {
    throw new Error('NEXT_PUBLIC_TEAM_ID 환경변수가 설정되지 않았습니다.')
  }

  const router = useRouter()

  return useMutation<User, AxiosError | Error, SignupRequest>({
    mutationFn: signup,
    onSuccess: async () => {
      showSuccess('회원가입이 완료되었습니다!')
      await new Promise((resolve) => setTimeout(resolve, 400))
      router.push('/login')
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
