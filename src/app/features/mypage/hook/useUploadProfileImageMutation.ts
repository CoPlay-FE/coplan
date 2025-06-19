import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { uploadProfileImage } from '../api/mypageApi'
import { UploadProfileImageResponse } from '../types/mypage.type'

export function useUploadProfileImageMutation() {
  return useMutation<UploadProfileImageResponse, AxiosError | Error, File>({
    mutationFn: uploadProfileImage,
  })
}
