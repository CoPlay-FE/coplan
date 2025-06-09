import { useAuthStore } from '../store/useAuthStore'
import { login as loginApi, signup as signupApi } from '../api/authApi'
import { LoginRequest, SignupRequest } from '../types/auth.type'

export function useAuth() {
  const { setAccessToken, setUser, clearAuthState } = useAuthStore()

  async function login(data: LoginRequest) {
    const response = await loginApi(data)
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
  }

  return {
    login,
    signup,
    logout,
  }
}
