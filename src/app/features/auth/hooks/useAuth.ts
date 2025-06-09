import { useAuthStore } from '../store/useAuthStore'
import { login as loginApi, signup as signupApi } from '../api/authApi'
import { LoginRequest, SignupRequest } from '../types/auth.type'

export function useAuth() {
  const { setAccessToken, setUser, clearAuthState } = useAuthStore()

  async function login(data: LoginRequest) {
    const response = await loginApi(data)
    const token = response.data.accessToken
    const user = response.data.user

    if (token && user) {
      setAccessToken(token)
      setUser(user)
    } else {
      throw new Error('유효하지 않은 응답입니다.')
    }
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
