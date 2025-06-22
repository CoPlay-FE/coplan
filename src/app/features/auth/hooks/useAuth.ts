import { User } from '@/app/shared/types/user.type'

import { useAuthStore } from '../store/useAuthStore'

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

  function logout() {
    clearAuthState()
    useAuthStore.persist.clearStorage()
  }

  return {
    updateAuthState,
    logout,
    setUser,
  }
}
