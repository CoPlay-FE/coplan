'use client'

import { cn } from '@lib/cn'
import Image from 'next/image'
import Link from 'next/link'

type NavItemProps = {
  as?: 'link' | 'button'
  href?: string
  onClick?: () => void
  iconSrc: string
  label: string
  active?: boolean
  className?: string
}

export default function NavItem({
  as = 'link',
  href = '/',
  onClick,
  iconSrc,
  label,
  className,
}: NavItemProps) {
  const content = (
    // 정적인 클래스만 쓸 경우 cn을 쓰지 않아도 되지만 외부에서 className 받는 경우 사용 권장
    <div
      className={cn(
        'inline-flex items-center gap-6 rounded-md border border-gray-300 px-12 py-4 align-middle text-sm transition hover:bg-gray-100 hover:text-black',
        className,
      )}
    >
      <div className="relative flex size-12 shrink-0">
        <Image src={iconSrc} fill alt={`${label} 아이콘`} />
      </div>
      {label}
    </div>
  )

  if (as === 'button') {
    return (
      <button
        onClick={onClick}
        type="button"
        className="mr-12 inline-flex appearance-none align-middle"
      >
        {content}
      </button>
    )
  }

  return (
    <Link href={href} legacyBehavior>
      <a className="inline-flex appearance-none align-middle">{content}</a>
    </Link>
  )
}
