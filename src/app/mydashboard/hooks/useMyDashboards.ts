import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import {
  getInvitedDashboards,
  getMyDashboards,
  respondToInvitation,
} from '../api/dashboardApi'

// 내 대시보드 목록 조회 훅
export const useMyDashboards = (page: number = 1, size = 5) => {
  return useQuery({
    queryKey: ['myDashboards', page, size],
    queryFn: () => getMyDashboards(page, size),
    staleTime: 1000 * 60 * 5, // 5분간 fresh 상태 유지
    gcTime: 1000 * 60 * 10, // 10분간 캐시 유지
    retry: 2,
    refetchOnWindowFocus: false, // 창 포커스 시 재요청 방지 -> 불필요한 API 호출 방지
  })
}

// 초대받은 대시보드 목록 조회 훅
export const useInvitedDashboards = (size: number = 10) => {
  return useInfiniteQuery({
    queryKey: ['invitedDashboards', size],
    // 페이지별 데이터 조회 함수 (pageParam = cursorId)
    queryFn: ({ pageParam }: { pageParam: number | null }) =>
      getInvitedDashboards(size, pageParam || undefined),
    // 첫 페이지 시작점 (cursorId 없음)
    initialPageParam: null,
    // 다음 페이지 파라미터 결정 함수
    getNextPageParam: (lastPage) => {
      // cursorId가 있으면 다음 페이지 존재, 없으면 마지막 페이지
      return lastPage.cursorId || null
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  })
}

// 초대 응답(수락/거절) 훅
export const useRespondToInvitation = () => {
  // 캐시 관리
  const queryClient = useQueryClient()

  return useMutation({
    // 변경 작업을 수행하는 함수
    mutationFn: ({
      invitationId,
      accept,
    }: {
      invitationId: number
      accept: boolean
    }) => respondToInvitation(invitationId, accept),

    //  성공 시 실행
    onSuccess: () => {
      // 관련 쿼리들 무효화하여 최신 데이터 다시 fetch
      queryClient.invalidateQueries({ queryKey: ['invitedDashboards'] })
      // 초대 수락 시 대시보드 목록 업데이트
      queryClient.invalidateQueries({ queryKey: ['myDashboards'] })
    },
    // 실패 시
    onError: (error) => {
      console.error('초대 응답 실패:', error)
    },
  })
}
