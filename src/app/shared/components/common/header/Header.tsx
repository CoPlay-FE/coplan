'use client'

import { cn } from '@lib/cn' // 클래스 이름 병합 유틸리티
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import ThemeToggle from '../../ThemeToggle'
import CollaboratorList from './Collaborator/CollaboratorList'
import UserDropdown from './UserDropdown'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="Border-bottom Text-black flex items-center justify-between border-b px-64 py-12">
      {/* 좌측 대시보드명 */}
      <div className="ml-280 flex items-center gap-8">
        <div className="font-bold">대시보드 명</div>
        <div className="relative h-12 w-14 overflow-hidden">
          <Image src="/images/crown.png" fill alt="내가 만든 대시보드" />
        </div>
      </div>

      {/* 우측 사용자 정보/다크모드 */}
      <div className="flex items-center gap-32">
        <nav className="Text-gray hidden gap-8 text-sm md:flex">
          <Link
            href="/dashboard"
            className={cn(
              'Border-btn flex items-center gap-6 rounded-md border-solid px-12 py-6',
              pathname === '/dashboard' && 'font-semibold',
            )}
          >
            <div className="relative flex size-12">
              <Image src="/images/management.png" fill alt="관리 버튼" />
            </div>
            관리
          </Link>
          <Link
            href="/modal"
            className={cn(
              'Border-btn mr-16 flex items-center gap-6 rounded-6 border-solid px-12 py-6',
              pathname === '/modal' && 'font-semibold',
            )}
          >
            <div className="relative flex size-12">
              <Image src="/images/invitation.png" fill alt="초대 버튼" />
            </div>
            초대하기
          </Link>
        </nav>
        {/* 공동작업자 프로필 이미지 */}
        <CollaboratorList />|
        <div className="flex items-center gap-32">
          {/* 드롭다운 메뉴 */}
          <UserDropdown />
          {/* 다크모드 토글 버튼 */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
