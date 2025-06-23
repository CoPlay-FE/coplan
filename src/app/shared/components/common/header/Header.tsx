'use client'

import ThemeToggle from '../../ThemeToggle'
import CreateInvitationModal from '../modal/CreateInvitationModal'
import CollaboratorList from './Collaborator/CollaboratorList'
import LeftHeaderContent from './LeftHeaderContent'
import RightHeaderNav from './RightHeaderNav'
import UserDropdown from './UserDropdown'

export default function Header() {
  return (
    <header className="BG-white Border-bottom Text-black fixed inset-x-0 top-0 z-40 w-full overflow-x-auto border-b py-10 pl-360 pr-10 mobile-wide:pl-80 tablet-wide:pl-200">
      <div className="flex w-full items-center justify-between pr-16 mobile-wide:justify-between tablet-wide:justify-between">
        {/* 좌측 대시보드명 */}
        <div className="hidden md:block">
          <LeftHeaderContent />
        </div>

        {/* 우측 사용자 정보/다크모드 */}
        <div className="flex gap-8 whitespace-nowrap sm:gap-16">
          <RightHeaderNav />
          <CreateInvitationModal />
          {/* 협업자 목록 */}
          <CollaboratorList />

          <div className="flex items-center gap-16 border-l pl-8 sm:gap-32 sm:pl-16">
            {/* 사용자 정보 드롭다운 */}
            <UserDropdown />
            {/* 다크모드 토글 */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
