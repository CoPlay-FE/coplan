import { User } from '@/app/shared/types/user.type'

import { signup as signupApi } from '../api/authApi'
import { useAuthStore } from '../store/useAuthStore'
import { SignupRequest } from '../types/auth.type'

export function useAuth() {
  const { setAccessToken, setUser, clearAuthState } = useAuthStore()

  function updateAuthState(response: { accessToken: string; user: User }) {
    const { accessToken, user } = response

    if (!accessToken || !user) {
      throw new Error('유효하지 않은 응답입니다.')
    }

    setAccessToken(accessToken)
    setUser(user)
  }

  async function signup(data: SignupRequest) {
    await signupApi(data)
  }

  function logout() {
    clearAuthState()
    useAuthStore.persist.clearStorage()
  }

  return {
    updateAuthState,
    signup,
    logout,
  }
}
