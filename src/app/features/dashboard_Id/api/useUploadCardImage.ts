import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { postCardImages } from './postCardImage'

export function useUploadCardImage() {
  return useMutation({
    mutationFn: ({ columnId, file }: { columnId: number; file: File }) =>
      postCardImages(columnId, file),
    onError: (error: AxiosError<{ message: string }>) => {
      const message =
        error?.response?.data?.message ?? // 서버가 준 에러메세지
        '이미지 업로드 중 오류가 발생했습니다. 크기가 작은 파일을 시도해주세요.' // 없으면 이 내용으로
      toast.error(message)
    },
  })
}
