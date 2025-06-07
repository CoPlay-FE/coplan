import { User } from '@/app/shared/types/user'

export interface LoginRequest {
  email: string
  password: string
}

export interface SignupRequest {
  name: string
  email: string
  password: string
}

export interface AuthState {
  accessToken: string | null
  user: User | null
  isLoggedIn: boolean
  setAccessToken: (token: string) => void
  setUser: (user: User) => void
  logout: () => void
}
