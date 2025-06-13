'use client' //  useState, useEffect, createPortal 등의 사용

import { ReactNode, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom' // 툴팁을 body에 직접 렌더링하기 위한 React API

// Tooltip 컴포넌트의 props 타입 정의
type TooltipProps = {
  content: string // 툴팁에 표시할 텍스트
  children: ReactNode // 툴팁이 감쌀 자식 요소
}

export default function Tooltip({ content, children }: TooltipProps) {
  const [visible, setVisible] = useState(false) // 툴팁 표시 여부 상태
  const [coords, setCoords] = useState<{ left: number; top: number }>({
    left: 0,
    top: 0,
  }) // 툴팁의 위치 상태
  const wrapperRef = useRef<HTMLDivElement>(null) // 기준 요소(마우스를 올리는 대상)에 대한 참조

  // 툴팁이 보일 때 위치 계산
  useEffect(() => {
    if (visible && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect()
      setCoords({
        left: rect.left + rect.width / 2, // 가운데 정렬을 위해 요소의 중앙 X 좌표
        top: rect.bottom + window.scrollY, // 요소의 하단 Y 좌표 + 스크롤 보정
      })
    }
  }, [visible]) // visible이 변경될 때마다 위치 재계산

  // 툴팁 콘텐츠를 Portal로 body에 렌더링
  const tooltipContent = visible
    ? createPortal(
        <div
          style={{
            position: 'absolute',
            left: coords.left,
            top: coords.top,
            transform: 'translateX(-50%)', // X축 가운데 정렬
            backgroundColor: 'white',
            color: 'black',
            padding: '6px 12px',
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 500,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            whiteSpace: 'nowrap',
            zIndex: 9999,
            pointerEvents: 'none', // 마우스 이벤트 무시
            userSelect: 'none', // 드래그로 인한 잘못된 텍스트 선택 방지
          }}
        >
          {content}
        </div>,
        document.body, // body에 직접 렌더링 (z-index 문제 방지 등)
      )
    : null // 툴팁이 보이지 않을 때는 null 반환

  return (
    <div
      ref={wrapperRef} // 마우스 이벤트 및 위치 계산 기준 요소
      className="relative flex items-center" // 자식 요소 정렬
      onMouseEnter={() => setVisible(true)} // 마우스 올리면 툴팁 표시
      onMouseLeave={() => setVisible(false)} // 마우스 벗어나면 툴팁 숨김
    >
      {children} {/* 툴팁이 감싸는 실제 요소 */}
      {tooltipContent} {/* 포탈로 렌더링된 툴팁 */}
    </div>
  )
}
