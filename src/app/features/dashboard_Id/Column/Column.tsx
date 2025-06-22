import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'

import { cn } from '@/app/shared/lib/cn'

import { useCardMutation } from '../api/useCardMutation'
import { useInfiniteCards } from '../api/useInfiniteCards'
import Card from '../Card/Card'
import CreateCardForm from '../Card/cardFormModals/CreateCardForm'
import CreateCardModal from '../Card/cardFormModals/CreateCardModal'
import { useInfiniteScroll } from '../hooks/useInfiniteScroll'
import { useColumnModalStore } from '../store/useColumnModalStore'
import { useDragStore } from '../store/useDragStore'
import type { Column as ColumnType } from '../type/Column.type'

export default function Column({
  column,
  dashboardId,
}: {
  column: ColumnType
  dashboardId: number
}) {
  const { id, title }: { id: number; title: string } = column
  const { openModal } = useColumnModalStore()

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteCards(id)

  useInfiniteScroll(fetchNextPage, hasNextPage, isFetchingNextPage)

  const [isDraggingover, setDraggingover] = useState(false)
  const { draggingCard, clearDraggingCard } = useDragStore()
  const cardMutation = useCardMutation()
  const [openCreateCard, setOpenCreateCard] = useState(false)

  const [openCreateColumn, setOpenCreateColumn] = useState(false) //page.tsx
  const [oepnConfigColumn, setConfigColumn] = useState(false)

  const handleConfigColumn = () => {
    openModal('edit', {
      dashboardId,
      columnId: id,
      columnTitle: title,
    })
  }

  if (isLoading)
    return (
      <div className="BG-gray Border-column flex w-354 shrink-0 flex-col gap-16 p-20 pt-104 mobile:h-190 mobile:w-full tablet:h-190 tablet:w-full">
        <div className="BG-white size-full"></div>
      </div>
    ) // 스켈레톤 적용???⭐️
  if (isError) return toast.error('할 일 불러오기 실패')

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
        // 'BG-gray Border-column flex w-354 shrink-0 flex-col gap-16 p-20 mobile:w-308 tablet:w-584',
        'BG-gray Border-column flex w-354 shrink-0 flex-col gap-16 p-20 mobile:w-full tablet:w-full',

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
            {data?.pages[0]?.totalCount ?? 0}
          </span>
        </div>
        <Image
          src={'/images/config.svg'}
          alt="컬럼 설정"
          width={20}
          height={20}
          onClick={handleConfigColumn}
          className="cursor-pointer"
        />
      </div>
      <button
        className="BG-white Border-section flex justify-center rounded-6 py-9"
        onClick={() => setOpenCreateCard(true)}
      >
        <div className="BG-lightblue flex h-22 w-22 items-center justify-center rounded-4">
          <Image
            src={'/images/plus.svg'}
            alt="추가하기"
            width={10}
            height={10}
          />
        </div>
      </button>
      {data?.pages.map((page) =>
        page.cards.map((card) => (
          <Card key={card.id} card={card} column={column} />
        )),
      )}
      {/* 카드 생성 모달 */}
      {openCreateCard && (
        <CreateCardModal>
          <CreateCardForm
            onClose={() => setOpenCreateCard(false)}
            columnId={id}
          />
        </CreateCardModal>
      )}
      {/* 무한 스크롤 관련 */}
      {isFetchingNextPage && (
        <p className="text-center text-sm text-gray-400">
          카드를 불러오는 중...
        </p>
      )}
      {!hasNextPage && (
        <p className="py-4 text-center text-sm text-gray-300">
          모든 카드를 불러왔습니다
        </p>
      )}
    </div>
  )
}
