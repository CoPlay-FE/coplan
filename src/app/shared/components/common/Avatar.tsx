'use client'

import Image from 'next/image'

import { useAuthStore } from '@/app/features/auth/store/useAuthStore'
import { getColor } from '@/app/shared/lib/getColor'

type AvatarProps = {
  size?: number
}

const customColors = [
  '#efaa8d',
  '#FFC85A',
  '#b9ef8d',
  '#8eef8d',
  '#8defd3',
  '#8dcaef',
  '#8d9def',
  '#a58def',
  '#e292e0',
]

function getInitial(nickname: string): string {
  const firstChar = nickname.trim().charAt(0)
  if (/[a-zA-Z]/.test(firstChar)) return firstChar.toUpperCase()
  if (/[가-힣]/.test(firstChar)) return firstChar
  return '?'
}

export function Avatar({ size = 36 }: AvatarProps) {
  const user = useAuthStore((state) => state.user)

  const initial = getInitial(user!.nickname)
  const bgColor = getColor(user!.nickname, customColors)

  return user?.profileImageUrl ? (
    <div
      className="relative overflow-hidden rounded-full"
      style={{ width: size, height: size }}
    >
      <Image
        src={user?.profileImageUrl}
        fill
        alt={`${user!.nickname} 프로필 이미지`}
        className="object-cover"
      />
    </div>
  ) : (
    <div
      className="flex items-center justify-center rounded-full font-semibold text-white"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
        backgroundColor: customColors[bgColor],
      }}
    >
      {initial}
    </div>
  )
}
