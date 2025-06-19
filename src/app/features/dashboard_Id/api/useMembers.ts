import { useQuery } from '@tanstack/react-query'

import { Member } from '../type/Member.type'
import { fetchMembers } from './fetchMembers'

// 현재 대시보드에 초대되어있는 이용자 목록
export default function useMembers(dashboardId: number) {
  return useQuery<Member[]>({
    queryKey: ['dashboardId', dashboardId],
    queryFn: () => fetchMembers(dashboardId),
  })
}
