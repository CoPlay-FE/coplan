'use client'

import Image from 'next/image'

import { CreateDashboardButtonProps } from '@/app/shared/types/dashboard'

export default function CreateDashboardButton({
  onClick,
}: CreateDashboardButtonProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex size-20 items-center justify-center rounded-6 transition-colors hover:bg-gray-50"
      aria-label="새 대시보드 생성"
    >
      <div className="relative size-16">
        <Image
          src="/images/invitation.png"
          alt="대시보드 생성"
          fill
          className="object-contain"
        />
      </div>
    </button>
  )
}
