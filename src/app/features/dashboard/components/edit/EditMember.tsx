import Image from 'next/image'
import React from 'react'

import { UserInfo } from '@/app/shared/components/common/UserInfo'

import { mockMembers } from './mockMember'

export default function EditMember() {
  return (
    <div>
      {/* 컨테이너 */}
      <div className="BG-white h-360 w-584 rounded-16 px-32 py-24">
        <div className="mb-24 flex items-center justify-between">
          <h2 className="Text-black text-18 font-bold">구성원</h2>

          <div className="flex items-center">
            <p className="Text-gray mr-16 text-12">1 페이지 중 1</p>
            <Image src="/images/prev.png" alt="이전" width={36} height={36} />
            <Image src="/images/next.png " alt="다음" width={36} height={36} />
          </div>
        </div>

        <form>
          <label htmlFor="title" className="Text-black mb-8 block text-16">
            이름
          </label>
          <div className="flex flex-col gap-4">
            {mockMembers.map((member, index) => (
              <div
                key={index}
                className="Border-bottom flex items-center justify-between py-4"
              >
                <UserInfo
                  key={index}
                  nickname={member.nickname}
                  imageUrl={member.imageUrl}
                />
                <button className="Text-btn Border-btn rounded-md px-16 py-2">
                  삭제
                </button>
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  )
}
