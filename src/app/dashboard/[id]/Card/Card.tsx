import Image from 'next/image'

import type { Card } from '@/app/api/useCards'

import Tags from './Tags'

export default function Card({ card }: { card: Card }) {
  const { imageUrl, title, tags, dueDate, assignee } = card
  return (
    <div className="BG-white Border-section relative w-314 rounded-6 border-solid px-20 py-16">
      Todo Card
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="카드 이미지"
          width={400}
          height={600}
          className="h-auto w-full rounded-6 object-contain"
          priority
        />
      )}
      <p>{title}</p>
      <Tags tags={tags} />
      <p>{dueDate}</p>
      <p>프로필</p>
    </div>
  )
}
