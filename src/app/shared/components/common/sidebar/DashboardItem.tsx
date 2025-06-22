'use client'

import Image from 'next/image'

import { DashboardItemProps } from '@/app/shared/types/dashboard'

export default function DashboardItem({
  dashboard,
  isActive = false,
  onClick,
}: DashboardItemProps): JSX.Element {
  const handleClick = () => {
    onClick(dashboard.id)
  }

  return (
    <button
      type="button"
      aria-current={isActive ? 'page' : undefined}
      onClick={handleClick}
      className={`Text-black BG-Input-hovered flex w-full items-center gap-12 rounded-6 px-12 py-8 text-left text-18 transition-colors mobile:justify-center mobile:px-4 mobile:py-6 tablet:gap-8 tablet:px-8 tablet:py-6 tablet:text-16 ${
        isActive ? 'BG-currentDashboard font-medium' : ''
      }`}
    >
      {/* 컬러 도트 */}
      <div
        className="size-8 flex-shrink-0 rounded-full mobile:size-12 tablet:size-6"
        style={{ backgroundColor: dashboard.color }}
      />

      {/* 대시보드 제목 */}
      <span className="flex-1 truncate mobile:hidden">{dashboard.title}</span>

      {/* 내가 만든 대시보드에 왕관 아이콘 */}
      {dashboard.createdByMe && (
        <div className="relative h-12 w-14 flex-shrink-0 mobile:hidden tablet:h-10 tablet:w-12">
          <Image
            src="/images/crown.png"
            alt="내가 만든 대시보드"
            fill
            className="object-contain"
          />
        </div>
      )}
    </button>
  )
}
