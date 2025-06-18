'use client'

import { useAuthStore } from '@/app/features/auth/store/useAuthStore'

import { Avatar } from './Avatar'

type UserInfoProps = {
  nickname: string
  imageUrl?: string | null
  size?: number
}

export function UserInfo({ size = 36 }: UserInfoProps) {
  const user = useAuthStore((state) => state.user)

  return (
    <div className="flex items-center gap-4">
      <Avatar size={size} />
      <span className="text-sm font-semibold">{user!.nickname}</span>
    </div>
  )
}
