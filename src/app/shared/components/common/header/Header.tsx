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
    <header className="BG-white Border-bottom Text-black w-full overflow-x-hidden border-b px-48 py-12">
      <div className="flex w-full items-center justify-between pl-300 pr-16">
        {/* 좌측 대시보드명 */}
        <div className="flex shrink-0 items-center gap-8 pr-16">
          <div className="whitespace-nowrap font-bold">대시보드 명</div>
          <div className="relative h-12 w-14 overflow-hidden">
            <Image src="/images/crown.png" fill alt="내가 만든 대시보드" />
          </div>
        </div>

        {/* 우측 사용자 정보/다크모드 */}
        <div className="flex shrink-0 items-center gap-16 whitespace-nowrap">
          <nav className="Text-gray hidden gap-8 text-sm md:flex">
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
            <Link
              href="/modal"
              className={cn(
                'Border-btn mr-16 flex items-center gap-6 rounded-md border px-12 py-6',
                pathname === '/modal' && 'font-semibold',
              )}
            >
              <div className="relative flex size-12">
                <Image src="/images/invitation.png" fill alt="초대 버튼" />
              </div>
              초대하기
            </Link>
          </nav>
          {/* 협업자 목록 */}
          <CollaboratorList />
          <div className="flex items-center gap-16">
            {/* 사용자 정보 드롭다운 */}
            <UserDropdown />|{/* 다크모드 토글 */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
