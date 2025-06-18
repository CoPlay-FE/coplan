'use client'
import Image from 'next/image'

import { useSelectedDashboardStore } from '@/app/shared/store/useSelectedDashboardStore'

type LeftHeaderContentProps = {
  title: string
  showCrown?: boolean
}

export default function LeftHeaderContent({
  title,
  showCrown,
}: LeftHeaderContentProps) {
  const { selectedDashboard } = useSelectedDashboardStore()

  if (!selectedDashboard) return null

  return (
    <div className="flex shrink-0 items-center gap-8 pr-16">
      <div className="whitespace-nowrap font-bold">{title}</div>
      {showCrown && (
        <div className="relative h-12 w-14 overflow-hidden">
          <Image src="/images/crown.png" fill alt="내가 만든 대시보드" />
        </div>
      )}
    </div>
  )
}
