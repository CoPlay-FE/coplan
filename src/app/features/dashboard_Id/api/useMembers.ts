import { useQuery } from '@tanstack/react-query'

import { Member } from '../type/Member.type'
import { fetchMembers } from './fetchMembers'

export default function useMembers(dashboardId: number) {
  return useQuery<Member[]>({
    queryKey: ['dashboardId', dashboardId],
    queryFn: () => fetchMembers(dashboardId),
  })
}
