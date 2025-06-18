'use client'

import Image from 'next/image'

import Header from '@/app/shared/components/common/header/Header'
import CreateDashboardModal from '@/app/shared/components/common/sidebar/modal/CreateDashboardModal'
import Sidebar from '@/app/shared/components/common/sidebar/Sidebar'

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
        <main className="px-40 py-32">
          <MyDashboardGrid />

          {/* 초대받은 대시보드 섹션 */}
          <section className="BG-white w-1022 rounded-16 p-40 pb-120 pt-24">
            <h2 className="Text-black mb-64 text-24 font-bold">
              초대받은 대시보드
            </h2>

            {/* 빈 상태 */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative mb-24 h-100 w-100">
                <Image
                  src="/images/unsubscribe.svg"
                  alt="초대받은 대시보드 없음"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* 모달 */}
      <CreateDashboardModal />
    </div>
  )
}
