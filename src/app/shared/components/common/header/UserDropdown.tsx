'use client'

import Dropdown from '@components/common/Dropdown/Dropdown'
import { useRouter } from 'next/navigation'

import { useAuth } from '@/app/features/auth/hooks/useAuth'

import { UserInfo } from '../UserInfo'

export default function UserDropdown() {
  const router = useRouter()
  const { logout } = useAuth()

  function goToMypage() {
    router.push('/mypage')
  }

  function handleLogout() {
    logout()
    router.push('/login')
  }

  return (
    <Dropdown
      trigger={
        <div className="flex cursor-pointer items-center gap-8">
          {/* 로그인된 사용자 정보 자동으로 불러옴 */}
          <UserInfo size={36} />
        </div>
      }
      width="w-6"
      align="center"
    >
      <button
        onClick={goToMypage}
        className="w-full p-8 text-xs hover:bg-gray-100 hover:text-black"
      >
        마이페이지
      </button>
      <button
        onClick={handleLogout}
        className="w-full p-8 text-xs hover:bg-gray-100 hover:text-black"
      >
        로그아웃
      </button>
    </Dropdown>
  )
}
