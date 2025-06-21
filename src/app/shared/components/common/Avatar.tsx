'use client'

import Image from 'next/image'

type AvatarProps = {
  size?: number
  nickname?: string
  profileImageUrl?: string | null
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

function getColorIndex(nickname: string) {
  const sum = Array.from(nickname).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0,
  )
  return sum % customColors.length
}

export function Avatar({
  size = 36,
  nickname = '',
  profileImageUrl,
}: AvatarProps) {
  const bgColor = getColorIndex(nickname)

  if (profileImageUrl) {
    return (
      <div
        className="relative overflow-hidden rounded-full"
        style={{ width: size, height: size }}
      >
        <Image
          src={profileImageUrl}
          alt={`${nickname} 프로필 이미지`}
          fill
          className="object-cover"
          sizes={`${size}px`}
          priority={false}
        />
      </div>
    )
  }

  return (
    <div
      className="flex items-center justify-center rounded-full font-semibold text-white"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
        backgroundColor: customColors[bgColor],
      }}
    >
      {getInitial(nickname)}
    </div>
  )
}
