import { useQuery } from '@tanstack/react-query'

import { fetchUser } from '../api/mypageApi'

export function useUserQuery() {
  return useQuery({
    queryKey: ['fetchUser'],
    queryFn: fetchUser,
  })
}
