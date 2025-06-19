'use client'

import Header from '@/app/shared/components/common/header/Header'
import CreateDashboardModal from '@/app/shared/components/common/sidebar/modal/CreateDashboardModal'
import Sidebar from '@/app/shared/components/common/sidebar/Sidebar'

import InvitedDashboardTable from './components/InvitedDashboardTable/InvitedDashboardTable'
import MyDashboardGrid from './components/MyDashboardGrid/MyDashboardGrid'

export default function MyDashboardPage() {
  return (
    <div className="flex min-h-screen">
      {/* 사이드바 */}
      <Sidebar />

      {/* 메인 */}
      <div className="BG-gray ml-300 flex-1">
        {/* 헤더 */}
        <Header />

        {/* 페이지 콘텐츠 */}
        <main className="p-40">
          <MyDashboardGrid />

          {/* 초대받은 대시보드 섹션 */}
          <section className="BG-white w-1022 rounded-16 p-40 pb-120 pt-24">
            <h2 className="Text-black mb-64 text-24 font-bold">
              초대받은 대시보드
            </h2>

            <InvitedDashboardTable />
          </section>
        </main>
      </div>

      {/* 모달 */}
      <CreateDashboardModal />
    </div>
  )
}
