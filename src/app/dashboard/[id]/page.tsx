'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { useCardMutation } from '@/app/features/dashboard_Id/api/useCardMutation'
import useColumns from '@/app/features/dashboard_Id/api/useColumns'
import Column from '@/app/features/dashboard_Id/Column/Column'
import ColumnModalRenderer from '@/app/features/dashboard_Id/components/ColumnModalRenderer'
import { useColumnModalStore } from '@/app/features/dashboard_Id/store/useColumnModalStore'
import { useColumnsStore } from '@/app/features/dashboard_Id/store/useColumnsStore'
import { useDragStore } from '@/app/features/dashboard_Id/store/useDragStore'
import { Card } from '@/app/features/dashboard_Id/type/Card.type'

export default function DashboardID() {
  const params = useParams()
  const dashboardId = Number(params.id)
  const { data: columns, isLoading, error } = useColumns(dashboardId)
  const { openModal } = useColumnModalStore()

  const { draggingCard, setDraggingCard } = useDragStore()
  const { setColumns } = useColumnsStore()
  const cardMutation = useCardMutation()
  const touchPos = useRef({ x: 0, y: 0 })
  const prevColumn = useRef<HTMLElement | null>(null)
  const longPressTimer = useRef<number | null>(null)
  const isLongPressActive = useRef(false)

  const handleCreateColumn = () => {
    openModal('create', { dashboardId })
  }

  useEffect(() => {
    if (columns) {
      const transformed = columns.map((column) => ({
        columnId: column.id,
        columnTitle: column.title,
      }))
      setColumns(transformed)
    }
  }, [columns, setColumns])

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    // 1. 터치 대상 찾기
    const target = e.target as HTMLElement
    const cardEl = target.closest('[data-card-data]') as HTMLElement
    const columnEl = target.closest('[data-column-id]') as HTMLElement | null

    if (!cardEl) return
    prevColumn.current = columnEl
    const cardData: Card = JSON.parse(cardEl.dataset.cardData || '{}') // 터치한 카드의 <Card>데이터 가져옴
    // setDraggingCard({ cardData: cardData }) // 전역상태에, 현재 드래그할 카드 저장(후에 뮤테이션 함수에 전달해서 캐시 업데이트에 사용)

    // 2. 카드 영역 내 터치 좌표 계산 (저장)
    const touch = e.touches[0]
    const rect = cardEl.getBoundingClientRect()
    touchPos.current = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    }

    // 👇 Long press timer 설정
    longPressTimer.current = window.setTimeout(() => {
      isLongPressActive.current = true
      setDraggingCard({ cardData })
      // 3. 🧱 복제 요소 생성
      const clone = cardEl.cloneNode(true) as HTMLElement
      clone.id = 'dragged-clone'
      clone.style.position = 'fixed'
      clone.style.left = `${touch.clientX - touchPos.current.x}px`
      clone.style.top = `${touch.clientY - touchPos.current.y}px`
      clone.style.pointerEvents = 'none' // pointer-events: none을 드래그 중인 카드에 설정하면 elementFromPoint가 그 카드에 막히지 않고 아래 요소를 탐지할수 있음
      clone.style.opacity = '0.8'
      clone.style.zIndex = '9999'
      clone.style.border = '3px dotted #228DFF'
      clone.style.width = `${rect.width}px`
      document.body.appendChild(clone)
    }, 300)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isLongPressActive.current) {
      clearTimeout(longPressTimer.current!)
      return
    }
    // e.preventDefault() // 드래그 중 스크롤 방지 적용 예정..
    const touch = e.touches[0]

    // 1. 복제 요소 움직이기
    const touchX = touch.clientX
    const touchY = touch.clientY
    const clone = document.getElementById('dragged-clone')
    if (clone) {
      clone.style.left = `${touchX - touchPos.current.x}px`
      clone.style.top = `${touchY - touchPos.current.y}px`
    }

    // 2. 현재 위치의 컬럼
    const columnEl = document
      .elementFromPoint(touchX, touchY)
      ?.closest('[data-column-id]') as HTMLElement | null

    // 3. 현재 위치의 컬럼의 스타일 변형
    if (draggingCard && columnEl && columnEl !== prevColumn.current) {
      columnEl.classList.add('BG-drag-hovered')
      prevColumn.current?.classList.remove('BG-drag-hovered')
      prevColumn.current = columnEl
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    clearTimeout(longPressTimer.current!)
    if (!isLongPressActive.current || !draggingCard?.cardData) return

    // 1. 🧱 클론 카드 제거
    const clone = document.getElementById('dragged-clone')
    if (clone && isLongPressActive) {
      clone.remove()
      prevColumn.current?.classList.remove('BG-drag-hovered')
    }
    isLongPressActive.current = false

    // 2. 타겟 컬럼 가져오기
    const touch = e.changedTouches?.[0]
    const touchX = touch.clientX
    const touchY = touch.clientY
    const columnEl = document
      .elementFromPoint(touchX, touchY)
      ?.closest('[data-column-id]') as HTMLElement | null

    if (!columnEl) return
    const columnId = Number(columnEl?.dataset.columnId)

    if (columnId === draggingCard.cardData.columnId) return // 드래그한 카드와 동일한 컬럼이면 동작 취소

    // 3. 타겟 컬럼으로 카드데이터 이동 (useCardMutation.ts - 서버, 캐시 업데이트)
    cardMutation.mutate({
      columnId: columnId,
      cardData: draggingCard?.cardData,
    })
  }

  if (isLoading) return <div className="BG-gray size-full"></div> // 스켈레톤 적용???⭐️⭐️

  return (
    <>
      <div className="h-screen select-none">
        <div
          className="flex min-h-screen mobile:flex-col tablet:flex-col"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {columns?.map((column) => (
            <Column key={column.id} column={column} dashboardId={dashboardId} />
          ))}{' '}
          <div className="BG-gray Border-column p-20 mobile:h-full mobile:w-308 mobile:border-t-2 tablet:h-full tablet:w-584 tablet:border-t-2">
            <button
              className="BG-white Border-btn m flex justify-center gap-12 whitespace-nowrap rounded-8 px-85 pb-20 pt-24 text-18 font-bold mobile:flex mobile:w-full mobile:justify-center mobile:px-50 mobile:py-20 mobile:text-16 tablet:flex tablet:w-full tablet:items-center"
              onClick={handleCreateColumn}
            >
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
      <ColumnModalRenderer />
    </>
  )
}
