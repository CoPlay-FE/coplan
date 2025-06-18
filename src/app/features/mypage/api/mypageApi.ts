import api from '@lib/axios'

import { User as UserDataResponse } from '@/app/shared/types/user.type'

import {
  UpdateProfileRequest,
  UploadProfileImageResponse,
} from '../types/mypage.type'
import { MYPAGE_ENDPOINT } from './mypageEndPoint'

export async function loadUser(): Promise<UserDataResponse> {
  const response = await api.get(MYPAGE_ENDPOINT.USER)
  return response.data
}

export async function updateMyProfile(
  data: UpdateProfileRequest,
): Promise<UserDataResponse> {
  const response = await api.put<UserDataResponse>(MYPAGE_ENDPOINT.USER, data)
  return response.data
}

export async function uploadProfileImage(
  image: File,
): Promise<UploadProfileImageResponse> {
  const formData = new FormData()
  formData.append('image', image)
  const response = await api.post<UploadProfileImageResponse>(
    MYPAGE_ENDPOINT.IMAGE,
    formData,
  )
  return response.data
}
