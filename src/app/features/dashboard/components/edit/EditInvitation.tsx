import { UserInfo } from '@components/common/UserInfo'
import { cn } from '@lib/cn'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { mockMembers } from './mockMember'

export default function EditInvitation() {
  const pathname = usePathname()
  return (
    <div>
      {/* 컨테이너 */}
      <div className="BG-white h-360 w-584 rounded-16 px-32 py-24">
        <div className="mb-24 flex items-center justify-between">
          <h2 className="Text-black text-18 font-bold">초대 내역</h2>

          <div className="flex items-center">
            <p className="Text-gray mr-16 text-12">1 페이지 중 1</p>
            <Image src="/images/prev.png" alt="이전" width={36} height={36} />
            <Image src="/images/next.png " alt="다음" width={36} height={36} />
            <Link
              href="/modal"
              className={cn(
                'BG-violet ml-16 flex items-center gap-8 rounded-5 px-12 py-6',
                pathname === '/modal' && 'font-semibold',
              )}
            >
              <div className="relative flex size-12">
                <Image
                  src="/images/invitation-white.png"
                  fill
                  alt="초대 버튼"
                />
              </div>
              <p className="text-14 text-white">초대하기</p>
            </Link>
          </div>
        </div>

        <form>
          <label htmlFor="title" className="Text-black mb-8 block text-16">
            이메일
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
                  취소
                </button>
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  )
}
