'use client'

import { useMounted } from '@hooks/useMounted'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'

export default function Logo() {
  const { resolvedTheme } = useTheme()
  const mounted = useMounted()

  const isDark = resolvedTheme === 'dark'

  const mobileLogoSrc = mounted
    ? isDark
      ? '/images/logo-icon-dark.svg'
      : '/images/logo-icon-light.svg'
    : '/images/logo-icon-light.svg'

  const desktopLogoSrc = mounted
    ? isDark
      ? '/images/logo-dark2.svg'
      : '/images/logo-light2.svg'
    : '/images/logo-light2.svg'

  return (
    <Link
      href="/"
      className="mobile-wide:w-30 mobile-wide:h-30 relative h-30 w-120"
    >
      {/* 모바일용 로고 */}
      <Image
        suppressHydrationWarning
        className="mobile-wide:block hidden object-contain"
        src={mobileLogoSrc}
        fill
        alt="모바일 로고"
      />

      {/* 데스크탑/태블릿용 로고 */}
      <Image
        suppressHydrationWarning
        className="mobile-wide:hidden block object-contain"
        src={desktopLogoSrc}
        fill
        alt="일반 로고"
      />
    </Link>
  )
}
