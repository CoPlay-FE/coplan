// components/common/sidebar/Sidebar.tsx
'use client'

import { useDashboard } from '@hooks/useDashboard'
import { useModalStore } from '@store/useModalStore'
import { useSelectedDashboardStore } from '@store/useSelectedDashboardStore'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { Dashboard } from '@/types/dashboard'

import CreateDashboardButton from './CreateDashboardButton'
import DashboardItem from './DashboardItem'

export default function Sidebar(): JSX.Element {
  const pathname = usePathname()
  const router = useRouter()
  const { openModal } = useModalStore()
  const { data: dashboards = [], isLoading, error } = useDashboard()
  const { setSelectedDashboard } = useSelectedDashboardStore()

  const handleDashboardClick = (dashboard: Dashboard) => {
    setSelectedDashboard(dashboard) // 선택한 대시보드를 전역 상태에 저장
    router.push(`/dashboard/${dashboard.id}`)
  }

  // 에러 타입 타입 불일치(jsx로 렌더링할 수 없음) 방지를 위한 string 처리
  const errorMessage =
    error instanceof Error ? error.message : '대시보드 목록 불러오기 실패'

  return (
    <aside className="BG-white Border-section fixed left-0 top-0 h-screen w-300 overflow-y-auto">
      {/* 로고 섹션 */}
      <div className="flex h-70 items-center px-20">
        <Link href="/" className="flex items-center gap-8">
          <div className="relative h-35 w-150">
            <Image
              src="/images/logo-light2.svg"
              alt="Coplan logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>
      </div>

      {/* 대시보드 섹션 */}
      <div className="px-20 py-24">
        <div className="mb-24 flex items-center justify-between">
          <h2 className="Text-gray text-12 font-semibold">Dash Boards</h2>
          <CreateDashboardButton onClick={() => openModal('createDashboard')} />
        </div>

        <div className="space-y-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="Text-gray text-14">로딩중...</div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-20">
              <div className="Text-red text-14">{errorMessage}</div>
            </div>
          ) : dashboards.length === 0 ? (
            <div className="flex items-center justify-start py-20">
              <div className="Text-gray text-14">대시보드가 없습니다.</div>
            </div>
          ) : (
            dashboards.map((dashboard) => (
              <DashboardItem
                key={dashboard.id}
                dashboard={dashboard}
                isActive={pathname === `/dashboard/${dashboard.id}`}
                onClick={() => handleDashboardClick(dashboard)}
              />
            ))
          )}
        </div>
      </div>
    </aside>
  )
}
