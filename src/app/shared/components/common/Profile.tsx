'use client'

import Image from 'next/image'

type ProfileProps = {
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

// 첫 글자로 사용자 프로필 생성하는 함수
function getInitial(nickname: string): string {
  const firstChar = nickname.trim().charAt(0)

  if (/[a-zA-Z]/.test(firstChar)) {
    return firstChar.toUpperCase() // 영어: 대문자
  }

  if (/[가-힣]/.test(firstChar)) {
    return firstChar // 한글은 그대로 반환
  }

  return '?' // 기타문자: 물음표
}

// 닉네임으로부터 배경색 생성 함수
function getColor(nickname: string): string {
  const hash = nickname
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return customColors[hash % customColors.length]
}

export function Profile({ nickname, imageUrl, size = 36 }: ProfileProps) {
  const initial = getInitial(nickname)
  const bgColor = getColor(nickname)

  return imageUrl ? (
    // 프로필 이미지가 있을 때
    <div className="flex items-center gap-4">
      <div className="relative size-48 overflow-hidden rounded-full">
        <Image
          src="/images/profile.gif"
          fill
          alt="프로필 이미지"
          className="size-full object-cover"
        />
      </div>
      <span className="text-sm font-semibold">사용자</span>
    </div>
  ) : (
    // 프로필 이미지가 없을 때
    <>
      <div
        className="ml-8 flex items-center justify-center rounded-full font-semibold text-white"
        style={{
          width: size,
          height: size,
          fontSize: size * 0.4, // 글자 크기 조정
          backgroundColor: bgColor,
        }}
      >
        {initial}
      </div>
      <div className="text-base font-medium">{nickname}</div>
    </>
  )
}
