import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { SignupRequest } from '../types/auth.type'
import { useAuth } from './useAuth'

export function useSignupSubmit() {
  const { signup } = useAuth()
  const router = useRouter()

  async function submit(data: SignupRequest) {
    try {
      await signup(data)
      toast.success('회원가입 성공')
      router.push('/login')
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const message = e.response?.data?.message
        toast.error(message ?? '회원가입에 실패하였습니다.')
      } else {
        toast.error('알 수 없는 에러 발생')
      }
    }
  }

  return { submit }
}
