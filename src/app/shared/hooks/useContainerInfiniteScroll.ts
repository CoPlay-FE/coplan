'use client'

import { useCallback, useEffect, useRef } from 'react'

/**
 * 컨테이너 내부 무한스크롤 훅 (사이드바용)
 * window 스크롤과 독립적으로 작동하여 기존 무한스크롤과 충돌하지 않게 사용하기 위함
 *
 * @param fetchNextPage - 다음 페이지를 가져오는 함수
 * @param hasNextPage - 다음 페이지가 있는지 여부
 * @param isFetchingNextPage - 다음 페이지를 가져오는 중인지 여부
 * @param threshold - 스크롤 트리거
 */
export const useContainerInfiniteScroll = (
  fetchNextPage: () => void,
  hasNextPage: boolean,
  isFetchingNextPage: boolean,
  threshold: number = 0.8,
) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const { scrollTop, scrollHeight, clientHeight } = container
    const scrollPercentage = (scrollTop + clientHeight) / scrollHeight

    // 임계값에 도달하면 다음 페이지 로드
    if (scrollPercentage >= threshold && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, threshold])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      container.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return containerRef
}
