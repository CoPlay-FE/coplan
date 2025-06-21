import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { deleteColumn } from '../api/deleteColumn'
import { DeleteColumnVariables } from '../type/Column.type'

export function useDeleteColumn() {
  const queryClient = useQueryClient()

  return useMutation<
    void,
    AxiosError<{ message?: string }>,
    DeleteColumnVariables
  >({
    mutationFn: ({ columnId }) => deleteColumn(columnId),
    onSuccess: (data, variables) => {
      // 컬럼 목록 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ['columns', variables.dashboardId],
      })

      // 해당 컬럼의 카드 캐시도 무효화 (컬럼이 삭제되었으므로)
      queryClient.invalidateQueries({
        queryKey: ['columnId', variables.columnId],
      })

      toast.success('컬럼이 삭제되었습니다!')
    },
    onError: (error) => {
      const serverMessage = error.response?.data?.message
      toast.error(serverMessage || '컬럼 삭제 중 오류가 발생했습니다')
    },
  })
}
