import { useQuery } from '@tanstack/react-query'

import { loadUser } from '../api/mypageApi'

export function useUserQuery() {
  return useQuery({
    queryKey: ['loadUser'],
    queryFn: loadUser,
  })
}
