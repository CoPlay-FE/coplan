import Image from 'next/image'

import type { Card as CardType } from '@/app/api/useCards'

import { useDragStore } from '../store/useDragStore'
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
      data-card-id={card.id}
      data-card-data={JSON.stringify(card)}
      draggable="true"
      onDragStart={() => setDraggingCard({ cardData: card })}
      className="BG-white Border-section relative w-314 rounded-6 border-solid px-20 py-16"
    >
      Todo Card
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="카드 이미지"
          width={400}
          height={600}
          className="h-auto w-full rounded-6 object-contain"
          priority
          draggable="false"
        />
      )}
      <p>{title}</p>
      <Tags tags={tags} />
      <p>{dueDate}</p>
      <p>프로필</p>
    </div>
  )
}
