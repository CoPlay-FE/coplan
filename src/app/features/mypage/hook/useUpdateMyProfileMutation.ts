import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { User as UpdateProfileResponse } from '@/app/shared/types/user.type'

import { updateMyProfile } from '../api/mypageApi'
import { UpdateProfileRequest } from '../types/mypage.type'

export function useUpdateMyProfileMutation() {
  return useMutation<
    UpdateProfileResponse,
    AxiosError | Error,
    UpdateProfileRequest
  >({
    mutationFn: updateMyProfile,
  })
}
