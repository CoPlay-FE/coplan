import { useQuery } from '@tanstack/react-query'

import axiosClient from './axiosClient'

//타입
export interface Column {
  id: number
  title: string
  teamId: string
  dashboardId: number
  createdAt: string
  updatedAt: string
}
export interface ColumnsResponse {
  data: Column[]
}

//fetch 함수 (API 호출 전용)
export async function fetchColumns(dashboardId: number): Promise<Column[]> {
  const res = await axiosClient.get<ColumnsResponse>(
    `/columns?dashboardId=${dashboardId}`,
  )
  return res.data.data
}

//useQuery
export default function useColumns(dashboardId: number) {
  return useQuery<Column[]>({
    queryKey: ['columns', dashboardId],
    queryFn: () => fetchColumns(dashboardId),
  })
}
