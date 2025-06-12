'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import CreateDashboardButton from './CreateDashboardButton'
import DashboardItem from './DashboardItem'

export default function Sidebar(): JSX.Element {
  const pathname = usePathname()
  const router = useRouter()

  // TODO: 목데이터 - API 연동시 삭제예정
  const mockDashboards = [
    {
      id: 1,
      title: '비브러리',
      color: '#10B981',
      createdByMe: true,
      createdAt: '',
      updatedAt: '',
      userId: 1,
    },
    {
      id: 2,
      title: '코드잇',
      color: '#8B5CF6',
      createdByMe: true,
      createdAt: '',
      updatedAt: '',
      userId: 1,
    },
    {
      id: 3,
      title: '3분기 계획',
      color: '#F59E0B',
      createdByMe: false,
      createdAt: '',
      updatedAt: '',
      userId: 2,
    },
    {
      id: 4,
      title: '회의록',
      color: '#3B82F6',
      createdByMe: false,
      createdAt: '',
      updatedAt: '',
      userId: 3,
    },
    {
      id: 5,
      title: '중요 문서함',
      color: '#EC4899',
      createdByMe: false,
      createdAt: '',
      updatedAt: '',
      userId: 4,
    },
  ]

  const handleDashboardClick = (dashboardId: number) => {
    router.push(`/dashboard/${dashboardId}`)
  }

  const handleCreateDashboard = () => {
    // TODO: 대시보드 생성 모달 열기
    console.log('대시보드 생성 모달 열기임')
  }
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
        {/* 섹션 헤더 */}
        <div className="mb-24 flex items-center justify-between">
          <h2 className="Text-gray text-12 font-semibold">Dash Boards</h2>
          <CreateDashboardButton onClick={handleCreateDashboard} />
        </div>

        {/* 대시보드 목록 */}
        <div className="space-y-8">
          {mockDashboards.map((dashboard) => (
            <DashboardItem
              key={dashboard.id}
              dashboard={dashboard}
              isActive={pathname === `/dashboard/${dashboard.id}`}
              onClick={handleDashboardClick}
            />
          ))}
        </div>
      </div>
    </aside>
  )
}
