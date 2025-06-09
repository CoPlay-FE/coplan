import api from '@/app/shared/lib/axios'
import { AUTH_ENDPOINT } from './authEndpoint'
import { LoginRequest, SignupRequest, LoginResponse } from '../types/auth.type'
import { User as SignupResponse } from '@/app/shared/types/user.type'

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(AUTH_ENDPOINT.LOGIN, data)
  return response.data
}

export const signup = async (data: SignupRequest) => {
  const response = await api.post<SignupResponse>(AUTH_ENDPOINT.SIGNUP, data)
  return response.data
}
