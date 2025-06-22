import Image from 'next/image'
import { useState } from 'react'

import { Avatar } from '@/app/shared/components/common/Avatar'

import { useDragStore } from '../store/useDragStore'
import type { Card as CardType } from '../type/Card.type'
import type { Column as ColumnType } from '../type/Column.type'
import CreateCardModal from './cardFormModals/CreateCardModal'
import ModifyCardForm from './cardFormModals/ModifyCardForm'
import CardContent from './cardModal/CardContent'
import CardModal from './cardModal/CardModal'
// import Tags from './Tags'
import TagsInCard from './TagsInCard'

export default function Card({
  card,
  column,
}: {
  card: CardType
  column: ColumnType
}) {
  const { id, imageUrl, title, tags, dueDate, assignee } = card
  const { setDraggingCard } = useDragStore()
  const [openCard, setOpenCard] = useState(false) //card.tsx
  const [openModifyCard, setOpenModifyCard] = useState(false)
  const { title: columnTitle, id: columnId } = column
  const currentColumn = { columnTitle, columnId }

  return (
    <div
      data-card-id={id}
      data-card-data={JSON.stringify(card)}
      draggable="true"
      onDragStart={() => setDraggingCard({ cardData: card })}
      onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
      className="BG-white Border-section relative rounded-6 border-solid px-20 py-16"
      onClick={() => setOpenCard(true)}
    >
      <div className="mobile:flex-col tablet:flex tablet:w-full tablet:items-center tablet:justify-start tablet:gap-20">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="카드 이미지"
            width={400}
            height={600}
            className="mb-15 h-auto w-full rounded-6 object-contain mobile:mb-4 mobile:h-auto mobile:w-260 tablet:m-0 tablet:h-68 tablet:max-w-fit"
            priority
            draggable="false"
          />
        )}
        <div>
          {/* 할 일 제목 */}
          <h3 className="Text-black mb-10 text-16 font-medium leading-relaxed mobile:mb-6">
            {title}
          </h3>

          <div className="tablet:flex tablet:flex-wrap tablet:items-center">
            {/* 태그 */}
            {tags.length !== 0 && <TagsInCard tags={tags} />}

            {/* 마감일 & 담당자 */}
            <div className="mt-8 flex content-around items-center mobile:mt-6 tablet:m-0 tablet:w-full tablet:justify-between">
              {/* :마감일 */}
              <div className="flex size-full items-center gap-6 tablet:mr-10 tablet:w-90">
                <Image
                  src={'/images/calendar.svg'}
                  alt="마감일"
                  width={18}
                  height={18}
                />
                {dueDate && (
                  <div className="Text-gray mt-4 text-12 font-medium leading-none">
                    {dueDate.split(' ')[0]}
                  </div>
                )}
              </div>
              {/* :담당자 */}
              {assignee && (
                <div className="shrink-0">
                  <Avatar
                    size={24}
                    name={assignee.nickname}
                    imageUrl={assignee.profileImageUrl}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* 카드 모달 */}
      {openCard && (
        <CardModal>
          <CardContent
            onClose={() => setOpenCard(false)}
            openModifyModal={() => setOpenModifyCard(true)}
            card={card}
            column={column}
          />
        </CardModal>
      )}

      {/* 카드 수정 모달 */}
      {openModifyCard && (
        <CreateCardModal>
          <ModifyCardForm
            onClose={() => setOpenModifyCard(false)}
            currentColumn={currentColumn}
            card={card}
          />
        </CreateCardModal>
      )}
    </div>
  )
}
