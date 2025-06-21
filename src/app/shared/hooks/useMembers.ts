'use client'

import authHttpClient from '@lib/axios'

export type Member = {
  id: number
  email: string
  nickname: string
  profileImageUrl: string | null
  isOwner: boolean | string
  userId: number
}

const teamId = process.env.NEXT_PUBLIC_TEAM_ID

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
