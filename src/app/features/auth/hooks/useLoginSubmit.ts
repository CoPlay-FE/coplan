import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { LoginRequest } from '../types/auth.type'
import { useAuth } from './useAuth'

export function useLoginSubmit() {
  const { login } = useAuth()
  const router = useRouter()

  async function submit(data: LoginRequest) {
    try {
      await login(data)
      toast.success('로그인 성공')
      router.push('/mydashboard')
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const message = e.response?.data?.message
        toast.error(message ?? '로그인 실패')
      } else {
        toast.error('알 수 없는 에러 발생')
      }
    }
  }

  return { submit }
}
