import { useEffect } from 'react'

// 모달 띄웠을때 배경 스크롤 막기
// 사용법: 모달 생성 컴포넌트에 가서, useLockBodyScroll()
// overflow: hidden을 적용해서 바디 스크롤 막음
// 컴포넌트 언마운트 시 원래 상태로 복원
export function useLockBodyScroll() {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [])
}
