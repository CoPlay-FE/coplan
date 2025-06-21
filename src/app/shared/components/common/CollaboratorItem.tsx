'use client'

import { cn } from '@lib/cn'

import { Avatar } from './Avatar'

type CollaboratorItemProps = {
  nickname: string
  imageUrl?: string
  size?: number
  className?: string
  onClick?: () => void
}

export default function CollaboratorItem({
  nickname,
  imageUrl,
  size = 48,
  className,
  onClick,
}: CollaboratorItemProps) {
  return (
    <div className={cn('flex items-center gap-3', className)} onClick={onClick}>
      <Avatar nickname={nickname} profileImageUrl={imageUrl} size={size} />
    </div>
  )
}
