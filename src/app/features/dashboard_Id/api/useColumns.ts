import { useQuery } from '@tanstack/react-query'

import { Column } from '../type/Column.type'
import { fetchColumns } from './fetchColumns'

//useQuery
export default function useColumns(dashboardId: number) {
  return useQuery<Column[]>({
    queryKey: ['columns', dashboardId],
    queryFn: () => fetchColumns(dashboardId),
  })
}
