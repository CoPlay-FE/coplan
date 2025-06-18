'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Dashboard } from '@/app/shared/types/dashboard'

interface MyDashboardCardProps {
  dashboard: Dashboard
}

export default function MyDashboardCard({ dashboard }: MyDashboardCardProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/dashboard/${dashboard.id}`)
  }

  return (
    <div
      onClick={handleClick}
      className="group h-70 w-332 cursor-pointer rounded-8 border border-gray-200 bg-white p-20 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-12">
          {/* 컬러 도트 */}
          <div
            className="size-8 flex-shrink-0 rounded-full"
            style={{ backgroundColor: dashboard.color }}
          />

          {/* 대시보드 제목 */}
          <h3 className="Text-black max-w-200 truncate text-16 font-medium">
            {dashboard.title}
          </h3>

          {/* 왕관 아이콘 */}
          {dashboard.createdByMe && (
            <div className="relative h-16 w-20 flex-shrink-0">
              <Image
                src="/images/crown.png"
                alt="소유자"
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>

        {/* 화살표 아이콘 */}
        <div className="opacity-60 transition-opacity duration-200 group-hover:opacity-100">
          <div className="relative size-16 text-gray-600">
            <Image
              src="/images/arrow.svg"
              alt="화살표"
              fill
              className="object-contain brightness-0 invert-[0.4] saturate-0"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
