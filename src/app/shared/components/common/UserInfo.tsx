'use client'

import { Avatar } from './Avatar'

type UserInfoProps = {
  nickname: string
  imageUrl?: string
  size?: number
}

export function UserInfo({ nickname, imageUrl, size = 36 }: UserInfoProps) {
  return (
    <div className="flex items-center gap-4">
      <Avatar nickname={nickname} imageUrl={imageUrl} size={size} />
      <span className="text-sm font-semibold">{nickname}</span>
    </div>
  )
}
