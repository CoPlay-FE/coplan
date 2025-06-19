'use client'
import Image from 'next/image'

import { useSelectedDashboardStore } from '@/app/shared/store/useSelectedDashboardStore'

export default function LeftHeaderContent() {
  const { selectedDashboard } = useSelectedDashboardStore()

  if (!selectedDashboard) return null

  return (
    <div className="flex shrink-0 items-center gap-8 pr-16">
      <div className="whitespace-nowrap font-bold">
        {selectedDashboard.title || '내 대시보드'}
      </div>
      {selectedDashboard.createdByMe && (
        <div className="relative h-12 w-14 overflow-hidden">
          <Image
            src="/images/crown.png"
            fill
            alt="내가 만든 대시보드"
            className="object-contain"
          />
        </div>
      )}
    </div>
  )
}
