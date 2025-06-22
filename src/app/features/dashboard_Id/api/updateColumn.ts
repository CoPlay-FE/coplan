import authHttpClient from '@api/axios'

import { UpdateColumnRequest, UpdateColumnResponse } from '../type/Column.type'

export async function updateColumn(
  columnId: number,
  payload: UpdateColumnRequest,
): Promise<UpdateColumnResponse> {
  const response = await authHttpClient.put<UpdateColumnResponse>(
    `/${process.env.NEXT_PUBLIC_TEAM_ID}/columns/${columnId}`,
    payload,
  )
  return response.data
}
