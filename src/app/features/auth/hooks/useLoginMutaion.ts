import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { login } from '../api/authApi'
import { useAuth } from './useAuth'

export function useLoginMutaion() {
  const router = useRouter()
  const { updateAuthState } = useAuth()

  return useMutation({
    mutationFn: login,
    onSuccess: async (response) => {
      updateAuthState(response)
      toast.success('로그인 성공')
      await new Promise((resolve) => setTimeout(resolve, 400))
      router.push('/mydashboard')
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message
        toast.error(message ?? '로그인 실패')
      } else {
        toast.error('알 수 없는 에러 발생')
      }
    },
  })
}
