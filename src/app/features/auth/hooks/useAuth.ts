import { useAuthStore } from '../store/authStore'
import { login as loginApi, signup as signupApi } from '../api/authApi'
import { LoginRequest, SignupRequest } from '../types/auth.type'

export function useAuth() {
  const {
    setAccessToken,
    setUser,
    clearAuthState,
    accessToken,
    user,
    isLoggedIn,
  } = useAuthStore()

  async function login(data: LoginRequest) {
    const response = await loginApi(data)
    const { user, accessToken } = response.data

    if (accessToken && user) {
      setAccessToken(accessToken)
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
    accessToken,
    user,
    isLoggedIn,
  }
}
