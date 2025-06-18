import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import axios from 'axios'

import { showError } from '@/app/shared/lib/toast'

import { changePassword } from '../api/mypageApi'
import { PasswordChangeRequest } from '../types/mypage.type'

export function useChangePasswordMutation() {
  return useMutation<void, AxiosError, PasswordChangeRequest>({
    mutationFn: changePassword,
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const serverMessage = (
          error.response?.data as { message?: string } | undefined
        )?.message
        const fallback = error.message || '비밀번호 변경 실패'
        showError(serverMessage ?? fallback)
      } else {
        showError('알 수 없는 에러 발생')
      }
    },
  })
}
