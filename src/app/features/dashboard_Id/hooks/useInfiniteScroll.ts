import { useCallback, useEffect } from 'react'

import { useIsMobile } from '@/app/shared/hooks/useIsmobile'

/**
 * 범용 무한스크롤 훅
 *
 * @param fetchNextPage - 다음 페이지를 가져오는 함수
 * @param hasNextPage - 다음 페이지가 있는지 여부
 * @param isFetchingNextPage - 다음 페이지를 가져오는 중인지 여부
 * @param targetRef - (선택) 스크롤 대상이 되는 ref (모달 등 특정 영역에만 작동하고 싶을 때)
 */
export const useInfiniteScroll = (
  fetchNextPage: () => void,
  hasNextPage: boolean,
  isFetchingNextPage: boolean,
  targetRef?: React.RefObject<HTMLElement>, // optional
) => {
  const handleScroll = useCallback(() => {
    const el = targetRef?.current ?? window
    const scrollTop = targetRef?.current?.scrollTop ?? window.scrollY
    const scrollHeight =
      targetRef?.current?.scrollHeight ?? document.documentElement.scrollHeight
    const clientHeight = targetRef?.current?.clientHeight ?? window.innerHeight

    const scrollPercentage = (scrollTop + clientHeight) / scrollHeight

    const isNearBottom = scrollPercentage >= 0.7

    if (isNearBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, targetRef])

  useEffect(() => {
    const el = targetRef?.current ?? window
    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      el.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll, targetRef])
}
