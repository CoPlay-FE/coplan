'use client'

import ThemeToggle from '../../ThemeToggle'
import CreateInvitationModal from '../modal/CreateInvitationModal'
import CollaboratorList from './Collaborator/CollaboratorList'
import LeftHeaderContent from './LeftHeaderContent'
import RightHeaderNav from './RightHeaderNav'
import UserDropdown from './UserDropdown'

export default function Header() {
  return (
    <header className="BG-white Border-bottom Text-black w-full overflow-x-auto border-b px-24 py-6 sm:px-48 sm:py-10">
      <div className="flex min-w-[max-content] items-center justify-between pr-8 sm:pr-16">
        {/* 좌측 대시보드명 */}
        <div className="hidden lg:block">
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
