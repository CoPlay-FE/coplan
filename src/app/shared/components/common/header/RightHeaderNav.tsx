'use client'

import { useModalStore } from '@store/useModalStore'
import { useSelectedDashboardStore } from '@store/useSelectedDashboardStore'
import { usePathname } from 'next/navigation'

import NavItem from './NavItem'

export default function RightHeaderNav() {
  const { openModal } = useModalStore()
  const { selectedDashboard } = useSelectedDashboardStore()
  const pathname = usePathname()

  const isMyDashboardPage = pathname === '/mydashboard'

  return (
    <nav className="Text-black hidden gap-6 whitespace-nowrap text-sm md:flex">
      {!isMyDashboardPage && (
        <>
          <NavItem
            as="link"
            href={`/dashboard/${selectedDashboard?.id}/edit`}
            iconSrc="/images/config.svg"
            label="관리"
          />
          <NavItem
            as="button"
            onClick={() => openModal('invite')}
            iconSrc="/images/invitation.png"
            label="초대하기"
          />
        </>
      )}
    </nav>
  )
}
