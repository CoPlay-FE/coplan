import api from '@/app/shared/lib/axios'
import { User as SignupResponse } from '@/app/shared/types/user.type'

import { LoginRequest, LoginResponse, SignupRequest } from '../types/auth.type'
import { AUTH_ENDPOINT } from './authEndpoint'

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(AUTH_ENDPOINT.LOGIN, data)
  return response.data
}

export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  const response = await api.post<SignupResponse>(AUTH_ENDPOINT.SIGNUP, data)
  return response.data
}
