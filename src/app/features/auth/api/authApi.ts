import api from '@/app/shared/lib/axios'
import { AUTH_ENDPOINT } from './authEndpoint'
import { LoginRequest, SignupRequest, LoginResponse } from '../types/auth.type'
import { User } from '@/app/shared/types/user.type'

export const login = (data: LoginRequest) => {
  return api.post<LoginResponse>(AUTH_ENDPOINT.LOGIN, data)
}

export const signup = (data: SignupRequest) => {
  return api.post<User>(AUTH_ENDPOINT.SIGNUP, data)
}
