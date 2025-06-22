'use client'

import ThemeToggle from '@components/ThemeToggle'
import Link from 'next/link'

import Logo from './Logo'

export default function Header() {
  return (
    <header className="BG-white Border-bottom sticky inset-x-0 top-0 z-50">
      <nav className="Border-bottom flex h-70 items-center justify-between px-80 py-15 mobile-wide:h-60 mobile-wide:px-24 mobile-wide:py-16 tablet-wide:px-40">
        <Logo />
        <div className="flex items-center justify-center gap-16">
          <Link href="/login">로그인</Link>
          <Link href="/signup">회원가입</Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
