'use client'

import Image from 'next/image'

type AvatarProps = {
  nickname: string
  imageUrl?: string
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

function getColor(nickname: string): string {
  const hash = nickname
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return customColors[hash % customColors.length]
}

export function Avatar({ nickname, imageUrl, size = 36 }: AvatarProps) {
  const initial = getInitial(nickname)
  const bgColor = getColor(nickname)

  return imageUrl ? (
    <div
      className="relative overflow-hidden rounded-full"
      style={{ width: size, height: size }}
    >
      <Image
        src={imageUrl}
        fill
        alt={`${nickname} 프로필 이미지`}
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
        backgroundColor: bgColor,
      }}
    >
      {initial}
    </div>
  )
}
