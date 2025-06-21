'use client'

import { useMounted } from '@hooks/useMounted'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'

export default function GithubIcon() {
  const { resolvedTheme } = useTheme()
  const mounted = useMounted()

  const isDark = resolvedTheme === 'dark'

  const src = mounted
    ? isDark
      ? '/images/github-icon-white.svg'
      : '/images/github-icon-block.svg'
    : '/images/github-icon-block.svg' // SSR fallback

  return (
    <Link
      className="relative size-32"
      href="https://github.com/CoPlay-FE/coplan"
    >
      <Image suppressHydrationWarning src={src} alt="깃허브 바로가기" fill />
    </Link>
  )
}
