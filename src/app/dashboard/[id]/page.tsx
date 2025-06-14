'use client'

import Image from 'next/image'
import { useRef } from 'react'

import useColumns from '@/app/api/useColumns'

import { useCardMutation } from './api/useCardMutation'
import Column from './Column/Column'
import { useDragStore } from './store/useDragStore'
import { Card } from './type/Card'
export default function DashboardID() {
  const dashboard = 15120
  const { data: columns, isLoading, error } = useColumns(dashboard)
  const { draggingCard, setDraggingCard } = useDragStore()

  const touchPos = useRef({ x: 0, y: 0 })
  const cardMutation = useCardMutation()

  // 카드 드래그하는 터치가 확실할때만 카드 데이터 가져오게 하고싶은데,
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    // 1. 터치 대상 찾기
    const target = e.target as HTMLElement
    const cardEl = target.closest('[data-card-data]') as HTMLElement // div형태의 DOM요소 자체를 반환함
    if (!cardEl) return
    const cardData: Card = JSON.parse(cardEl.dataset.cardData || '{}') // 터치한 카드의 <Card>데이터 가져옴
    setDraggingCard({ cardData: cardData }) // 전역상태에, 현재 드래그할 카드 저장(후에 뮤테이션 함수에 전달해서 캐시 업데이트에 사용)
    console.log('⭕️testing', cardData.title, cardData.id, cardData.columnId)

    // 2. 터치 좌표 저장
    const touch = e.touches[0]
    const rect = cardEl.getBoundingClientRect()
    touchPos.current = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    }

    // 🧱 복제 요소 생성
    const clone = cardEl.cloneNode(true) as HTMLElement
    clone.id = 'dragged-clone'
    clone.style.position = 'fixed'
    clone.style.left = `${touch.clientX - touchPos.current.x}px`
    clone.style.top = `${touch.clientY - touchPos.current.y}px`
    clone.style.pointerEvents = 'none' // pointer-events: none을 드래그 중인 카드에 설정하면 elementFromPoint가 그 카드에 막히지 않고 아래 요소를 잘 탐지합니다.
    clone.style.opacity = '0.8'
    clone.style.zIndex = '9999'
    clone.style.width = `${rect.width}px` // 크기 일치
    document.body.appendChild(clone)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0]

    // 1. 복제 요소 움직이기
    const touchX = touch.clientX
    const touchY = touch.clientY
    const clone = document.getElementById('dragged-clone')
    if (clone) {
      clone.style.left = `${touchX - touchPos.current.x}px`
      clone.style.top = `${touchY - touchPos.current.y}px`
    }

    // 2. 현재 터치 위치에 있는 맨 위 요소 확인
    const elementBelow = document.elementFromPoint(touchX, touchY)

    // 3. 가장 가까운 column 요소 찾기 (data-column-id로 마킹해두는 것이 좋음)
    const columnEl = elementBelow?.closest(
      '[data-column-id]',
    ) as HTMLElement | null

    if (columnEl) {
      // 현재 터치오버 위치의 컬럼 스타일 조정
    } else {
      console.log('⚠️ 컬럼 위에 없음')
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!draggingCard?.cardData) return

    // 클론카드 제거
    const clone = document.getElementById('dragged-clone')
    if (clone) {
      clone.remove()
    }

    // 어느 컬럼 위에서 끝났는지 체크해야함.
    // 3. 가장 가까운 column 요소 찾기 (data-column-id로 마킹해두는 것이 좋음)
    const touch = e.changedTouches?.[0]
    const touchX = touch.clientX
    const touchY = touch.clientY
    const elementBelow = document.elementFromPoint(touchX, touchY)
    const columnEl = elementBelow?.closest(
      '[data-column-id]',
    ) as HTMLElement | null
    // 위에 코드는 get Column함수로 뺄까보다(매개변수로 이벤트 받고, columnEl리턴하는)
    if (!columnEl) return //컬럼위에가 아니면 리턴
    const columnId = Number(columnEl?.dataset.columnId)

    // 동일컬럼이면 취소 리턴
    if (columnId === draggingCard.cardData.columnId) return
    // 낙관적 UI 함수 호출
    cardMutation.mutate({
      columnId: columnId,
      cardData: draggingCard?.cardData,
    })
  }

  if (isLoading) return <p>loading...</p>
  if (error) return <p>error...{error.message}</p>
  return (
    <>
      <div className="fixed left-0 h-1080 w-300 bg-gray-100">사이드바</div>
      <div className="ml-300 select-none">
        <div
          className="flex"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {columns?.map((column) => <Column key={column.id} column={column} />)}
          <div className="BG-gray Border-column p-20">
            <button className="BG-white Border-btn flex items-center gap-12 whitespace-nowrap rounded-8 px-85 pb-20 pt-24 text-18 font-bold">
              <span>새로운 컬럼 추가하기</span>
              <div className="flex h-22 w-22 items-center justify-center rounded-4 bg-blue-100">
                <Image
                  src={'/images/plus.svg'}
                  alt="플러스 아이콘"
                  width={10}
                  height={10}
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
