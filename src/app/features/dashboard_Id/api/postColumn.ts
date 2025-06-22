import authHttpClient from '@api/axios'

import { CreateColumnRequest, CreateColumnResponse } from '../type/Column.type'

export async function postColumn(
  payload: CreateColumnRequest,
): Promise<CreateColumnResponse> {
  const response = await authHttpClient.post<CreateColumnResponse>(
    `/${process.env.NEXT_PUBLIC_TEAM_ID}/columns`,
    payload,
  )
  return response.data
}
