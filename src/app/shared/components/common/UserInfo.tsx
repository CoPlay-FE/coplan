'use client'

import { useAuthStore } from '@/app/features/auth/store/useAuthStore'

import { Avatar } from './Avatar'

type UserInfoProps = {
  nickname?: string
  imageUrl?: string | null
  size?: number
}

export function UserInfo({ nickname, imageUrl, size = 36 }: UserInfoProps) {
  const user = useAuthStore((state) => state.user)

  const displayNickname = nickname ?? user?.nickname ?? ''
  const displayImage = imageUrl ?? user?.profileImageUrl ?? null

  if (!displayNickname) return null // 사용자 정보가 없는 경우 렌더링하지 않음

  return (
    <div className="flex items-center gap-4">
      {/* Avatar에 nickname, profileImageUrl 모두 넘겨줌 */}
      <Avatar size={size} name={displayNickname} imageUrl={displayImage} />
      <span className="ml-4 text-sm font-semibold tablet:hidden">
        {displayNickname}
      </span>
    </div>
  )
}
