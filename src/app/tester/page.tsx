'use client'

import Image from 'next/image'

import Header from '@/app/shared/components/common/header/Header'
import Sidebar from '@/app/shared/components/common/sidebar/Sidebar'
import ThemeToggle from '@/app/shared/components/ThemeToggle'

import CreateDashboardModal from '../shared/components/common/sidebar/modal/CreateDashboardModal'
import { useModalStore } from '../shared/store/useModalStore'

//<초기 설정 안내>

// 이미지 파일에 접근할 때: /images/파일명
// 그 외, alias 설정 참고: alias규칙은 - tsconfig.json파일 내의 "paths": {}에 작성
// 그 외, e.g. import { someUtil } from '@shared/utils';

// pxr 단위 사용
// - 원래 gap-4는 16px인데, pxr적용 시에는 gap-16으로 작성
// - 원래 [300px] -> 300으로 작성

// next-themes 라이트, 다크 모드
// globals.css에 작성한 커스텀 유틸 클래스(@apply) 참고해서, 클래스명 가져다 사용하거나 직접 커스텀

export default function Home() {
  const { openCreateDashboardModal } = useModalStore()

  return (
    <>
      <Header />
      <div className="flex">
        {/* 사이드바 */}
        <Sidebar />
       {/* 메인 콘텐츠 영역 */}
        <div className="ml-300 p-20">
          {/* 헤더 영역 */}
          <div className="mb-24">
            <h1 className="mb-16 text-24 font-bold">Sidebar 테스트 페이지</h1>
            <p className="Text-gray mb-20">왼쪽에 사이드바 만들어보자잇!</p>
            <ThemeToggle />
            {/* 모달 테스트 버튼 - 이 부분을 추가! */}
            <button
              onClick={openCreateDashboardModal}
              className="BG-blue mt-12 rounded-6 px-16 py-10 text-white"
            >
              대시보드 생성 모달 테스트
            </button>
            {/* 모달 버튼 컴포넌트 추가 - 이 부분도 추가! */}
            <CreateDashboardModal />
          </div>

          {/* 기존 테스트 요소들 */}
          <div className="space-y-24">
            <div>
              <h2 className="mb-12 text-20 font-semibold">로고 테스트</h2>
              <div className="Border-section relative h-[200px] w-[300px] rounded-8 p-16">
                <Image
                  src="/images/logo-light2.svg"
                  alt="Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* pxr 단위 테스트 */}
            <div>
              <h2 className="mb-12 text-20 font-semibold">pxr 단위 테스트</h2>
              <div className="mb-8 rounded-6 bg-blue-100 p-[32px] text-[16px]">
                <p>This text should be 16px (일반 px 단위)</p>
              </div>
              <div className="rounded-6 bg-blue-100 p-32 text-16">
                <p>
                  This text should be 1rem → converted 16 to 1rem: using pxr
                </p>
              </div>
            </div>

            {/* Gap 테스트 */}
            <div>
              <h2 className="mb-12 text-20 font-semibold">Gap 테스트</h2>
              <div className="flex gap-16 rounded-6 bg-gray-100 p-16">
                <div className="rounded-4 bg-blue-300 p-16">AAA</div>
                <div className="rounded-4 bg-green-300 p-16">BBB</div>
                <div className="rounded-4 bg-red-300 p-16">CCC</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
