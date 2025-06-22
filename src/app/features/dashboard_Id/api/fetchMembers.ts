import authHttpClient from '@api/axios'

import { Member, MembersResponse } from '../type/Member.type'

export async function fetchMembers(dashboardId: number): Promise<Member[]> {
  const res = await authHttpClient.get<MembersResponse>(
    `/${process.env.NEXT_PUBLIC_TEAM_ID}/members?&dashboardId=${dashboardId}`,
  )
  return res.data.members
}
