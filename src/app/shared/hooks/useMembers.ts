'use client'

import authHttpClient from '@api/axios'
import { getTeamId } from '@lib/getTeamId'

export type Member = {
  id: number
  email: string
  nickname: string
  profileImageUrl: string | null
  isOwner: boolean | string
  userId: number
}

const teamId = getTeamId()

export async function fetchMembers(dashboardId: string): Promise<Member[]> {
  const { data } = await authHttpClient.get(`/${teamId}/members`, {
    params: {
      page: 1,
      size: 100,
      dashboardId,
    },
  })
  return data.members ?? data
}
