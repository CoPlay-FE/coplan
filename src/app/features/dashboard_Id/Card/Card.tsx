import Image from 'next/image'

import { Avatar } from '@/app/shared/components/common/Avatar'

import { useDragStore } from '../store/useDragStore'
import type { Card as CardType } from '../type/Card.type'
import Tags from './Tags'

export default function Card({
  card,
  columnId,
}: {
  card: CardType
  columnId: number
}) {
  const { id, imageUrl, title, tags, dueDate, assignee } = card
  const { setDraggingCard } = useDragStore()
  return (
    <div
      data-card-id={id}
      data-card-data={JSON.stringify(card)}
      draggable="true"
      onDragStart={() => setDraggingCard({ cardData: card })}
      onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
      className="BG-white Border-section relative rounded-6 border-solid px-20 py-16"
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="카드 이미지"
          width={400}
          height={600}
          className="mb-15 h-auto w-full rounded-6 object-contain"
          priority
          draggable="false"
        />
      )}

      {/* 할 일 제목 */}
      <h3 className="Text-black mb-10 text-16 font-medium leading-relaxed">
        {title}
      </h3>

      {/* 태그 */}
      <Tags tags={tags} />

      {/* 마감일 & 담당자 */}
      <div className="mt-8 flex content-around items-center">
        {/* :마감일 */}
        {dueDate && (
          <div className="flex size-full items-center gap-6">
            <Image
              src={'/images/calendar.svg'}
              alt="마감일"
              width={18}
              height={18}
            />
            <div className="Text-gray mt-4 text-12 font-medium leading-none">
              {dueDate}
            </div>
          </div>
        )}

        {/* :담당자 */}
        {assignee && (
          <div className="shrink-0">
            <Avatar
              nickname={assignee.nickname}
              imageUrl={assignee.profileImageUrl}
              size={24}
            />
          </div>
        )}
      </div>
    </div>
  )
}
