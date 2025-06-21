'use client'

import Image from 'next/image'

import { useModalStore } from '@/app/shared/store/useModalStore'

export default function AddDashboardCard() {
  const { openModal } = useModalStore()

  const handleClick = () => {
    openModal('createDashboard')
  }

  return (
    <button
      onClick={handleClick}
      className="BG-white Border-btn hover:BG-gray group flex h-70 w-332 items-center justify-center gap-12 rounded-8 border p-20 transition-all duration-200 hover:border-gray-300"
    >
      <span className="Text-black text-16 font-medium">새로운 대시보드</span>

      <div className="relative h-22 w-22">
        <Image
          src="/images/chip.svg"
          alt="새로운 대시보드 추가"
          fill
          className="object-contain"
        />
      </div>
    </button>
  )
}
