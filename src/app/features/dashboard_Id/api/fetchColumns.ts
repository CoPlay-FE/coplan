import authHttpClient from '@api/axios'

import { Column, ColumnsResponse } from '../type/Column.type'

export async function fetchColumns(dashboardId: number): Promise<Column[]> {
  if (!dashboardId) {
    throw new Error('dashboardId가 유효하지 않습니다.')
  }

  const res = await authHttpClient.get<ColumnsResponse>(
    `/${process.env.NEXT_PUBLIC_TEAM_ID}/columns?dashboardId=${dashboardId}`,
  )

  return res.data.data
}
