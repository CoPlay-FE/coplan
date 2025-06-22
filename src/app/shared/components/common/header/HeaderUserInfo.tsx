'use client'

import { useAuthStore } from '@/app/features/auth/store/useAuthStore'

import { Avatar } from '../Avatar'

type HeaderUserInfoProps = {
  nickname?: string
  imageUrl?: string | null
  size?: number
}

export function HeaderUserInfo({
  nickname,
  imageUrl,
  size = 36,
}: HeaderUserInfoProps) {
  const user = useAuthStore((state) => state.user)

  const displayNickname = nickname ?? user?.nickname ?? ''
  const displayImage = imageUrl ?? user?.profileImageUrl ?? null

  if (!displayNickname) return null

  return (
    <div className="flex items-center gap-4">
      <Avatar size={size} name={displayNickname} imageUrl={displayImage} />
      {/* sm 이하 화면에서는 닉네임 숨김, md 이상에서만 보임 */}
      <span className="ml-4 hidden text-sm font-semibold sm:inline">
        {displayNickname}
      </span>
    </div>
  )
}
