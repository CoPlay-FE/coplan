'use client'

import { useMounted } from '@hooks/useMounted'
import Link from 'next/link'

import AuthLogo from '@/app/features/auth/components/AuthLogo'
import SignupForm from '@/app/features/auth/components/SignupForm'

export default function Signup() {
  const mounted = useMounted()
  if (!mounted) return null

  return (
    <>
      <AuthLogo text="환영합니다!" />
      <SignupForm />
      <p className="text-16 font-normal">
        이미 회원이신가요?{' '}
        <Link className="Text-violet underline" href="/login">
          로그인
        </Link>
      </p>
    </>
  )
}
