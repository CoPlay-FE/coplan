'use client'

import Dropdown from '@components/common/Dropdown/Dropdown'
import { Profile } from '@components/common/Profile'
import { useRouter } from 'next/navigation'

export default function UserDropdown() {
  const router = useRouter()

  const goToMypage = () => {
    router.push('/mypage')
  }

  const handleLogout = () => {
    console.log('로그아웃 처리')
  }

  return (
    <Dropdown
      trigger={
        <div className="flex cursor-pointer items-center gap-8">
          <Profile nickname="닉네임" size={36} />
        </div>
      }
      width="w-80"
      align="right"
    >
      <button
        onClick={goToMypage}
        className="w-full p-5 text-xs hover:bg-gray-100 hover:text-black"
      >
        마이페이지
      </button>
      <button
        onClick={handleLogout}
        className="w-full p-5 text-xs hover:bg-gray-100 hover:text-black"
      >
        로그아웃
      </button>
    </Dropdown>
  )
}
