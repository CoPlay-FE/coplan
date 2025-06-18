import axiosClient from '@/app/api/axiosClient'

import { Column, ColumnsResponse } from '../type/Column.type'

export async function fetchColumns(dashboardId: number): Promise<Column[]> {
  const res = await axiosClient.get<ColumnsResponse>(
    `/columns?dashboardId=${dashboardId}`,
  )
  return res.data.data
}
