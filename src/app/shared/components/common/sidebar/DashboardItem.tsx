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
      className={`Text-black BG-Input-hovered mobile-wide:justify-center mobile-wide:px-4 mobile-wide:py-6 tablet-wide:gap-8 tablet-wide:px-8 tablet-wide:py-6 tablet-wide:text-16 flex w-full items-center gap-12 rounded-6 px-12 py-8 text-left text-18 transition-colors ${
        isActive ? 'BG-currentDashboard font-medium' : ''
      }`}
    >
      {/* 컬러 도트 */}
      <div
        className="mobile-wide:size-12 tablet-wide:size-6 size-8 flex-shrink-0 rounded-full"
        style={{ backgroundColor: dashboard.color }}
      />

      {/* 대시보드 제목 */}
      <span className="mobile-wide:hidden flex-1 truncate">
        {dashboard.title}
      </span>

      {/* 내가 만든 대시보드에 왕관 아이콘 */}
      {dashboard.createdByMe && (
        <div className="mobile-wide:hidden tablet-wide:h-10 tablet-wide:w-12 relative h-12 w-14 flex-shrink-0">
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
