'use client'

import { cn } from '@lib/cn'
import { useModalStore } from '@store/useModalStore'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function RightHeaderNav() {
  const pathname = usePathname()
  const { modalType, openModal } = useModalStore()

  return (
    <nav className="Text-gray hidden gap-8 text-sm md:flex">
      {/* 추후 /dashboard/${id}/edit 페이지로 이동 예정 */}
      <Link
        href="/dashboard"
        className={cn(
          'Border-btn flex items-center gap-6 rounded-md border px-12 py-6',
          pathname === '/dashboard' && 'font-semibold',
        )}
      >
        <div className="relative flex size-12">
          <Image src="/images/management.png" fill alt="관리 버튼" />
        </div>
        관리
      </Link>
      <button
        onClick={() => openModal('invite')}
        className={cn(
          'Border-btn mr-16 flex items-center gap-6 rounded-md px-12 py-6',
          modalType === 'invite' && 'font-semibold',
        )}
      >
        <div className="relative flex size-12">
          <Image src="/images/invitation.png" fill alt="초대 버튼" />
        </div>
        초대하기
      </button>
    </nav>
  )
}
