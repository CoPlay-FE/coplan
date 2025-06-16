'use client'

import Image from 'next/image'

import { getColor } from '@/app/shared/lib/getColor'

type AvatarProps = {
  nickname: string
  imageUrl?: string | null
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

/**
 * Extracts the initial character from a nickname for avatar display.
 *
 * Returns the uppercase letter if the first character is an English alphabet letter, the character itself if it is a Korean Hangul syllable, or a question mark if neither condition is met.
 *
 * @param nickname - The user's nickname.
 * @returns The initial character to display in the avatar.
 */
function getInitial(nickname: string): string {
  const firstChar = nickname.trim().charAt(0)
  if (/[a-zA-Z]/.test(firstChar)) return firstChar.toUpperCase()
  if (/[가-힣]/.test(firstChar)) return firstChar
  return '?'
}

/**
 * Displays a user avatar as a circular image or a colored initial based on the provided nickname and optional image URL.
 *
 * If an image URL is given, the avatar shows the image. Otherwise, it displays the initial character of the nickname on a colored background.
 *
 * @param nickname - The user's nickname, used to determine the initial and background color.
 * @param imageUrl - Optional URL of the user's avatar image.
 * @param size - Optional size in pixels for the avatar's width and height. Defaults to 36.
 */
export function Avatar({ nickname, imageUrl, size = 36 }: AvatarProps) {
  const initial = getInitial(nickname)
  const bgColor = getColor(nickname, customColors)

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
        backgroundColor: customColors[bgColor],
      }}
    >
      {initial}
    </div>
  )
}
