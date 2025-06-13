import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

// 드롭다운 컴포넌트 타입 정의
type DropdownProps = {
  trigger: React.ReactNode // 드롭다운을 열기 위한 트리거 요소 (버튼, 아이콘 등)
  children: React.ReactNode // 드롭다운 내부 콘텐츠 (메뉴 아이템 등)
  width?: string // Tailwind 클래스 기반의 너비 설정 (예: 'w-5', 'w-6')
  align?: 'left' | 'center' | 'right' // 드롭다운 정렬 방향
}

// 드롭다운 컴포넌트 정의
export default function Dropdown({
  trigger,
  children,
  width = 'w-6', // 기본 너비 설정
  align = 'left', // 기본 정렬 방향 설정
}: DropdownProps) {
  const [open, setOpen] = useState(false) // 드롭다운 열림 여부 상태
  const triggerRef = useRef<HTMLDivElement>(null) // 반응형에 따른 위치 조정을 위한 ref 객체
  const menuRef = useRef<HTMLDivElement>(null) // 외부 클릭 감지를 위한 드롭다운 메뉴 ref 객체
  const [coords, setCoords] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  }) // 드롭다운 메뉴 위치 좌표 상태

  // 드롭다운 열기/닫기 토글
  const toggleOpen = () => setOpen((prev) => !prev)

  // Tailwind width 클래스 값을 실제 CSS 너비 값으로 변환
  const getWidthValue = (width: string) => {
    switch (width) {
      case 'w-5': // 할 일 카드 모달에서 사용
        return '5rem'
      case 'w-6':
        return '6rem'
      default:
        return undefined // 정의되지 않은 값은 기본 width 적용
    }
  }

  // 드롭다운이 열릴 때 위치 계산 및 윈도우 이벤트 바인딩
  useEffect(() => {
    function updateCoords() {
      if (open && triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect() // 트리거 위치 측정

        let left = rect.left
        if (align === 'center') left = rect.left + rect.width / 2
        else if (align === 'right') left = rect.right

        setCoords({
          top: rect.bottom + window.scrollY, // 화면 스크롤 반영
          left,
        })
      }
    }

    if (open) {
      updateCoords()
      window.addEventListener('resize', updateCoords)
      window.addEventListener('scroll', updateCoords)
    }

    return () => {
      window.removeEventListener('resize', updateCoords)
      window.removeEventListener('scroll', updateCoords)
    }
  }, [open, align])

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  // 드롭다운 메뉴 렌더링 (포탈을 이용하여 body로 위치)
  const menu = open
    ? createPortal(
        <div
          ref={menuRef}
          style={{
            position: 'absolute',
            top: coords.top,
            left: coords.left,
            transform:
              align === 'center'
                ? 'translateX(-50%)'
                : align === 'right'
                  ? 'translateX(-100%)'
                  : undefined,
            width: getWidthValue(width),
            minWidth: getWidthValue(width),
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)', // 그림자
            borderRadius: 8, // 모서리 둥글게
            zIndex: 9999, // 위로 띄우기
          }}
          className="BG-white" // 커스텀 배경 클래스 (Tailwind 예시)
        >
          {children}
        </div>,
        document.body, // body에 포탈로 삽입
      )
    : null

  // 트리거 요소 + 드롭다운 메뉴 렌더링
  return (
    <>
      <div
        ref={triggerRef}
        onClick={toggleOpen}
        className="inline-block cursor-pointer"
      >
        {trigger}
      </div>
      {menu}
    </>
  )
}
