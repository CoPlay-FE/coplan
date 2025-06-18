import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useState } from 'react'

import { cn } from '@/app/shared/lib/cn'

import { useCardMutation } from '../api/useCardMutation'
import useCards from '../api/useCards'
import Card from '../Card/Card'
import CreateCardForm from '../Card/cardFormModals/CreateCardForm'
import CreateCardModal from '../Card/cardFormModals/CreateCardModal'
import { useDragStore } from '../store/useDragStore'
import type { Column as ColumnType } from '../type/Column.type'
export default function Column({ column }: { column: ColumnType }) {
  const { id, title }: { id: number; title: string } = column
  const { data, isLoading, error } = useCards(id)
  const [isDraggingover, setDraggingover] = useState(false)
  const { draggingCard, clearDraggingCard } = useDragStore()
  const cardMutation = useCardMutation()
  const [openCard, setOpenCard] = useState(false) //card.tsx
  const [openCreateCard, setOpenCreateCard] = useState(false)
  const [openCreateColumn, setOpenCreateColumn] = useState(false) //page.tsx
  const [oepnConfigColumn, setConfigColumn] = useState(false)

  if (isLoading) return <p>loading...</p>
  if (error) return <p>error...{error.message}</p>

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault() //브라우저 기본은 드롭 비허용. 이걸 막아줘야 drop 가능
        if (!isDraggingover && draggingCard?.cardData.columnId !== id)
          setDraggingover(true) //dragOver 이벤트 발생하는 내내 setState 실행 방지(처음 false일때만 setDraggingOver실행)
      }}
      onDragLeave={(e) => {
        e.preventDefault()
        if (isDraggingover) setDraggingover(false)
      }}
      onDrop={(e) => {
        e.preventDefault()
        if (isDraggingover) setDraggingover(false)
        if (!draggingCard || draggingCard.cardData.columnId === id) {
          clearDraggingCard()
          return
        }
        cardMutation.mutate({
          columnId: id,
          cardData: draggingCard.cardData,
        })
      }}
      onMouseUp={() => {
        if (isDraggingover) setDraggingover(false)
      }}
      data-column-id={id}
      className={cn(
        'BG-gray Border-column flex w-354 shrink-0 flex-col gap-16 p-20 tablet:w-584',
        {
          'BG-drag-hovered': isDraggingover,
        },
      )}
    >
      <div className="mb-24 flex items-center justify-between">
        <div className="flex items-center">
          <div className="BG-blue mb-7 mr-8 size-8 rounded-25"></div>
          <h2 className="mb-3 mr-12 h-21 text-18 font-bold">{title}</h2>
          <span className="Text-gray block size-20 rounded-4 bg-[#EEEEEE] pt-3 text-center text-12 font-medium leading-tight dark:bg-[#2E2E2E]">
            {data?.totalCount}
          </span>
        </div>
        <Image
          src={'/images/config.svg'}
          alt="컬럼 설정"
          width={20}
          height={20}
          onClick={() => setConfigColumn(true)}
        />
      </div>
      <button
        className="BG-white Border-section flex justify-center rounded-6 py-9"
        onClick={() => setOpenCreateCard(true)}
      >
        <div className="flex h-22 w-22 items-center justify-center rounded-4 bg-blue-100">
          <Image
            src={'/images/plus.svg'}
            alt="추가하기"
            width={10}
            height={10}
          />
        </div>
      </button>
      {data?.cards.map((card) => (
        <Card key={card.id} card={card} columnId={id} />
      ))}

      {/* 모달 */}
      {openCreateCard && (
        <CreateCardModal onClose={() => setOpenCreateCard(false)}>
          <CreateCardForm
            onClose={() => setOpenCreateCard(false)}
          ></CreateCardForm>
        </CreateCardModal>
      )}
    </div>
  )
}
