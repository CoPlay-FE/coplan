import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { postColumn } from '../api/postColumn'
import { CreateColumnRequest, CreateColumnResponse } from '../type/Column.type'

export function useCreateColumn() {
  const queryClient = useQueryClient()

  return useMutation<
    CreateColumnResponse,
    AxiosError<{ message?: string }>,
    CreateColumnRequest
  >({
    mutationFn: postColumn,
    onSuccess: (data, variables) => {
      // 컬럼 목록 캐시 무효화 - 새로운 컬럼이 즉시 보이도록
      queryClient.invalidateQueries({
        queryKey: ['columns', variables.dashboardId],
      })
      toast.success('컬럼이 생성되었습니다!')
    },
    onError: (error) => {
      const serverMessage = error.response?.data?.message

      // 서버에서 오는 에러 메시지에 따라 분기
      if (
        serverMessage?.includes('중복') ||
        serverMessage?.includes('duplicate')
      ) {
        toast.error('중복된 컬럼 이름입니다')
      } else if (
        serverMessage?.includes('최대') ||
        serverMessage?.includes('maximum')
      ) {
        toast.error('컬럼은 최대 10개까지 생성 가능합니다')
      } else {
        toast.error(serverMessage || '컬럼 생성 중 오류가 발생했습니다')
      }
    },
  })
}
