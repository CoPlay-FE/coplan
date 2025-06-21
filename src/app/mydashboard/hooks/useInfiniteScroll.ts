import { useCallback, useEffect } from 'react'

/**
 * 무한스크롤 훅
 *
 * @param fetchNextPage - 다음 페이지를 가져오는 함수
 * @param hasNextPage - 다음 페이지가 있는지 여부
 * @param isFetchingNextPage - 다음 페이지를 가져오는 중인지 여부
 */
export const useInfiniteScroll = (
  fetchNextPage: () => void,
  hasNextPage: boolean,
  isFetchingNextPage: boolean,
) => {
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY // 현재 스크롤 위치
    const windowHeight = window.innerHeight // 브라우저 창 높이
    const documentHeight = document.documentElement.scrollHeight // 문서 전체 높이

    const scrollPercentage = (scrollTop + windowHeight) / documentHeight
    const isNearBottom = scrollPercentage >= 0.8 // 80% 스크롤하면 트리거

    // 다음 페이지 요청
    if (isNearBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]) // threshold 제거

  useEffect(() => {
    // 사용자가 스크롤바로 페이지를 스크롤할 떄 발생
    window.addEventListener('scroll', handleScroll, { passive: true })
    // 사용자가 마우스 휠을 굴릴 때 발생
    window.addEventListener('wheel', handleScroll, { passive: true })

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', handleScroll)
    }
  }, [handleScroll]) // 핸들스크롤 함수 변경 시 리스너 재등록
}
