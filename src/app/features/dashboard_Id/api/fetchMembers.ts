import api from '@/app/shared/lib/testAxios'

// import api from '@/app/shared/lib/axios'
import { Member, MembersResponse } from '../type/Member.type'

export async function fetchMembers(dashboardId: number): Promise<Member[]> {
  const res = await api.get<MembersResponse>(
    `/${process.env.NEXT_PUBLIC_TEAM_ID}/members?&dashboardId=${dashboardId}`,
  )
  return res.data.members
}
