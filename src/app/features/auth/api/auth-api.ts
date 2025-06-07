import api from '@/app/shared/lib/axios'
import { AUTH_ENDPOINT } from './auth-endpoint'
import { LoginRequest, SignupRequest, AuthState } from '../types/auth'

export const login = (data: LoginRequest) => {
  return api.post<AuthState>(AUTH_ENDPOINT.LOGIN, data)
}

export const signup = (data: SignupRequest) => {
  return api.post<AuthState>(AUTH_ENDPOINT.SIGNUP, data)
}
