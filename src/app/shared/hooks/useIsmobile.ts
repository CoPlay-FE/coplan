import { useEffect, useState } from 'react'

export function useIsMobile(breakpoint = 375) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= breakpoint
    }
    return false
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    function handleResize() {
      setIsMobile(window.innerWidth <= breakpoint)
    }

    handleResize() // 초기 실행
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [breakpoint])

  return isMobile
}
