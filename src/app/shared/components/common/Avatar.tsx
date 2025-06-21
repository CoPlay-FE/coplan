'use client'

import Image from 'next/image'
import { useRef } from 'react'

import { useAuthStore } from '@/app/features/auth/store/useAuthStore'
import { getColor } from '@/app/shared/lib/getColor'

type AvatarProps = {
  size?: number
  name: string
  imageUrl: string | null
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

export function Avatar({ size = 36, name, imageUrl }: AvatarProps) {
  const user = useAuthStore((state) => state.user)
  const nickname = useRef<string>()
  const profileImageUrl = useRef<string | null>()

  if (!user) return null // user가 없으면 렌더링하지 않음

  if (name) {
    nickname.current = name
    profileImageUrl.current = imageUrl
  } else {
    nickname.current = user.nickname
    profileImageUrl.current = user.profileImageUrl
  }

  const initial = getInitial(nickname.current)
  const bgColor = getColor(nickname.current, customColors.length)

  return profileImageUrl.current ? (
    <div
      className="relative shrink-0 overflow-hidden rounded-full"
      style={{ width: size, height: size }}
    >
      <Image
        src={profileImageUrl.current}
        fill
        alt={`${nickname.current} 프로필 이미지`}
        className="object-cover"
      />
    </div>
  ) : (
    <div
      className="flex shrink-0 items-center justify-center rounded-full font-semibold text-white"
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
