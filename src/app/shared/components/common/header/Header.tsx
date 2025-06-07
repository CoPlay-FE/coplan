'use client'

import { useUserStore } from '@store/useUserStore' // Zustand 예시
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const mypage = () => {
    router.push('/mypage')
  }
  const { user, logout } = useUserStore() // Zustand 상태

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-36 py-16 dark:border-gray-700 dark:bg-black">
      {/* 좌측 대시보드명 */}
      <div className="flex items-center gap-8">
        <div className="font-bold">대시보드 명</div>
        <div className="relative h-12 w-14 overflow-hidden">
          <Image src="/images/crown.png" fill alt="내가 만든 대시보드" />
        </div>
      </div>

      {/* 우측 사용자 정보/다크모드 */}
      <div className="flex items-center gap-16">
        <>
          <nav className="hidden gap-8 text-sm text-gray-600 dark:text-gray-300 md:flex">
            <Link
              href="/dashboard"
              className={`flex items-center gap-6 rounded-md border-2 border-solid px-8 py-4 ${pathname === '/dashboard' ? 'font-semibold' : ''}`}
            >
              <div className="relative flex size-12">
                <Image src="/images/management.png" fill alt="관리 버튼" />
              </div>
              관리
            </Link>
            <Link
              href="/modal"
              className={`flex items-center gap-6 rounded-6 border-2 border-solid px-8 py-4 ${pathname === '/modal' ? 'font-semibold' : ''}`}
            >
              <div className="relative flex size-12">
                <Image src="/images/invitation.png" fill alt="초대 버튼" />
              </div>
              초대하기
            </Link>
          </nav>
          {/* 공동작업자 프로필 이미지 */}
          <div className="relative size-48 overflow-hidden rounded-full">
            <Image
              src="/images/collaborator.png"
              fill
              alt="초대된 사용자"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="relative size-48 overflow-hidden rounded-full">
            <Image
              src="/images/collaborator.png"
              fill
              alt="초대된 사용자"
              style={{ objectFit: 'cover' }}
            />
          </div>
          |{/* 내 프로필 이미지 */}
          <div className="relative size-48 overflow-hidden rounded-full">
            <Image
              src="/images/profile.gif"
              fill
              alt="프로필이미지"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <span className="text-sm">배유철 {user?.name}</span>
          {/* 드롭다운 메뉴 */}
          <button onClick={mypage} className="text-xs">
            마이페이지
          </button>
          <button onClick={logout} className="text-xs">
            로그아웃
          </button>
        </>
      </div>
    </header>
  )
}
