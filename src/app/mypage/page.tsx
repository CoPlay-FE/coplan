'use client'

import Image from 'next/image'

import Header from '@/app/shared/components/common/header/Header'
import Sidebar from '@/app/shared/components/common/sidebar/Sidebar'

import Input from '../shared/components/Input'

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
              <button className="text-xm self-start">돌아가기</button>
            </div>
            {/* 닉네임 프로필 변경 */}
            <div className="BG-white flex h-auto w-full max-w-672 flex-col gap-24 rounded-8 p-24 font-medium">
              <h2 className="text-2xl font-bold">테스트</h2>
              <form className="flex justify-between gap-42 tablet:flex-col">
                <div className="BG-gray relative flex size-182 basis-182 cursor-pointer items-center justify-center overflow-hidden rounded-lg">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 3V15"
                      stroke="#83C8FA"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 9H15"
                      stroke="#83C8FA"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <input className="hidden" type="file" />
                <div className="flex flex-grow flex-col gap-16">
                  <Input labelName="이메일" name="email" />
                  <Input labelName="비밀번호" name="password" />
                  <button className="w-pull BG-blue h-50 rounded-8 text-white">
                    제출
                  </button>
                </div>
              </form>
            </div>
            {/* 비밀번호 변경 */}
            <div className="BG-white flex h-auto w-full max-w-672 flex-col gap-24 rounded-8 p-24">
              <h2 className="text-2xl font-bold">테스트</h2>
              <form className="flex flex-col justify-between gap-16">
                <Input labelName="현재 비밀번호" name="password" />
                <Input labelName="새 비밀번호" name="password" />
                <Input labelName="새 비밀번호 확인" name="password" />
                <button className="w-pull BG-blue h-50 rounded-8 text-white">
                  변경
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
