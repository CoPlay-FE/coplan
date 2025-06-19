import authHttpClient from '@lib/axios'

import { User as UserDataResponse } from '@/app/shared/types/user.type'

import { PasswordChangeRequest } from '../types/mypage.type'
import {
  UpdateProfileRequest,
  UploadProfileImageResponse,
} from '../types/mypage.type'
import { MYPAGE_ENDPOINT } from './mypageEndPoint'

export async function loadUser(): Promise<UserDataResponse> {
  const response = await authHttpClient.get(MYPAGE_ENDPOINT.USER)
  return response.data
}

export async function updateMyProfile(
  data: UpdateProfileRequest,
): Promise<UserDataResponse> {
  const response = await authHttpClient.put<UserDataResponse>(
    MYPAGE_ENDPOINT.USER,
    data,
  )
  return response.data
}

export async function uploadProfileImage(
  image: File,
): Promise<UploadProfileImageResponse> {
  const formData = new FormData()
  formData.append('image', image)
  const response = await authHttpClient.post<UploadProfileImageResponse>(
    MYPAGE_ENDPOINT.IMAGE,
    formData,
  )
  return response.data
}

export async function changePassword(
  data: PasswordChangeRequest,
): Promise<void> {
  await authHttpClient.put(MYPAGE_ENDPOINT.CHANGE_PASSWORD, data)
}
