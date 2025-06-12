'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'

interface AuthLogoProps {
  text: string
}

export default function AuthLogo({ text }: AuthLogoProps): JSX.Element {
  const { resolvedTheme } = useTheme()

  const isDark = resolvedTheme === 'dark'

  return (
    <div className="flex w-[230px] flex-col items-center justify-center gap-12">
      <Link className="relative block h-[250px] w-full" href="/">
        <Image
          src={isDark ? '/images/logo-dark.svg' : '/images/logo-light.svg'}
          alt="CoPlan 로고"
          className="object-contain"
          fill
          priority
        />
      </Link>
      <span className="Text-black text-xl">{text}</span>
    </div>
  )
}
