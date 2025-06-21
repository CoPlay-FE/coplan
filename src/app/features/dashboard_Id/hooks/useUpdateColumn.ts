import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { updateColumn } from '../api/updateColumn'
import {
  UpdateColumnResponse,
  UpdateColumnVariables,
} from '../type/Column.type'

export function useUpdateColumn() {
  const queryClient = useQueryClient()

  return useMutation<
    UpdateColumnResponse,
    AxiosError<{ message?: string }>,
    UpdateColumnVariables
  >({
    mutationFn: ({ columnId, title }) => updateColumn(columnId, { title }),
    onSuccess: (data, variables) => {
      // 컬럼 목록 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ['columns', variables.dashboardId],
      })
      toast.success('컬럼이 수정되었습니다!')
    },
    onError: (error) => {
      const serverMessage = error.response?.data?.message

      if (
        serverMessage?.includes('중복') ||
        serverMessage?.includes('duplicate')
      ) {
        toast.error('중복된 컬럼 이름입니다')
      } else {
        toast.error(serverMessage || '컬럼 수정 중 오류가 발생했습니다')
      }
    },
  })
}
