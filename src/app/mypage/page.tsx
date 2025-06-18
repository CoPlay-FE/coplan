'use client'

import Header from '@/app/shared/components/common/header/Header'
import Sidebar from '@/app/shared/components/common/sidebar/Sidebar'

import PasswordChangeForm from '../features/mypage/components/PasswordChangeForm'
import ProfileEditForm from '../features/mypage/components/ProfileEditForm'
export default function Mypage() {
  return (
    <>
      <Header />
      <div className="BG-gray h-full">
        {/* 사이드바 */}
        <Sidebar />
        {/* 메인 콘텐츠 영역 */}
        <div className="ml-300 p-20 tablet:ml-67">
          {/* 헤더 영역 */}
          <div className="flex flex-col gap-16">
            <div className="flex items-center justify-start gap-8">
              {/* 사진으로 대체 예정 */}
              <svg
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <button type="button" className="text-xm self-start">
                돌아가기
              </button>
            </div>
            {/* 닉네임 프로필 변경 */}
            <ProfileEditForm />
            {/* 비밀번호 변경 */}
            <PasswordChangeForm />
          </div>
        </div>
      </div>
    </>
  )
}
