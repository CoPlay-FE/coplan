import { User } from '@/app/shared/types/user.type'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  user: User
}

export interface SignupRequest {
  nickname: string
  email: string
  password: string
}

export interface SignupFormData extends SignupRequest {
  confirmPassword: string
}

export interface AuthState {
  accessToken: string | null
  user: User | null
  isLoggedIn: boolean
  setAccessToken: (token: string) => void
  setUser: (user: User) => void
  clearAuthState: () => void
}
