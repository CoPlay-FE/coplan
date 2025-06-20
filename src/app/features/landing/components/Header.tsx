'use client'

import ThemeToggle from '@components/ThemeToggle'
import Link from 'next/link'

import Logo from './Logo'
export default function Header() {
  return (
    <header className="BG-white Border-bottom sticky inset-x-0 top-0 z-50">
      <nav className="Border-bottom moblie:h-60 flex h-70 items-center justify-between px-24 py-16">
        <Logo />
        <div className="flex gap-16">
          <Link href="/login">로그인</Link>
          <Link href="/signup">회원 가입</Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
