'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import AuthLogo from '@/app/features/auth/components/AuthLogo'
import LoginForm from '@/app/features/auth/components/LoginForm'

export default function Login() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) {
    return null
  }
  return (
    <>
      <AuthLogo text="오늘도 만나서 반가워요!" />
      <LoginForm />
      <p className="text-16 font-normal">
        회원이 아니신가요?{' '}
        <Link className="Text-violet underline" href="/signup">
          회원가입하기
        </Link>
      </p>
    </>
  )
}
