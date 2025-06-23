'use client'

import Header from '@/app/shared/components/common/header/Header'
import Sidebar from '@/app/shared/components/common/sidebar/Sidebar'

import InvitedDashboardTable from './components/InvitedDashboardTable/InvitedDashboardTable'
import MyDashboardGrid from './components/MyDashboardGrid/MyDashboardGrid'

export default function MyDashboardPage() {
  return (
    <div className="flex min-h-screen">
      {/* 사이드바 */}
      <Sidebar />

      {/* 메인 */}
      <div className="BG-gray mobile-wide:ml-67 tablet-wide:ml-160 ml-300 flex-1">
        {/* 헤더 */}
        <Header />

        {/* 페이지 콘텐츠 */}
        <main className="mobile-wide:mt-76 mobile-wide:p-16 tablet-wide:mt-76 tablet-wide:p-24 mt-60 p-40">
          <MyDashboardGrid />

          {/* 초대받은 대시보드 섹션 */}
          <section className="BG-white mobile-wide:w-260 mobile-wide:p-16 tablet-wide:w-504 tablet-wide:p-24 w-1022 rounded-16 p-40 pb-120 pt-24">
            <h2 className="Text-black mobile-wide:text-20 tablet-wide:text-20 mb-64 text-24 font-bold">
              초대받은 대시보드
            </h2>

            <InvitedDashboardTable />
          </section>
        </main>
      </div>
    </div>
  )
}
