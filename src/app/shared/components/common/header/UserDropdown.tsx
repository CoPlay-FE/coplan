'use client'

import Dropdown from '@components/common/Dropdown/Dropdown'
import { useRouter } from 'next/navigation'

import { useAuth } from '@/app/features/auth/hooks/useAuth'

import { UserInfo } from '../UserInfo'

export default function UserDropdown() {
  const router = useRouter()
  const { logout } = useAuth()

  const goToMypage = () => {
    router.push('/mypage')
  }

  const handleLogout = () => {
    logout()
    // ⚠️ 상태 변경(setIsPostLogout)이 반영되기 전에 페이지 이동하면 Redirect가 이상하게 동작함
    // 따라서 router.push('/')는 이벤트 큐에 넣어 상태가 반영된 후 실행되도록 setTimeout 처리
    setTimeout(() => {
      router.push('/')
    }, 0)
  }

  return (
    <Dropdown
      trigger={
        <div className="flex cursor-pointer items-center gap-8">
          <UserInfo nickname="닉네임" size={36} />
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
