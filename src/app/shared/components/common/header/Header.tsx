'use client'

import ThemeToggle from '../../ThemeToggle'
import CreateInvitationModal from '../modal/CreateInvitationModal'
import CollaboratorList from './Collaborator/CollaboratorList'
import LeftHeaderContent from './LeftHeaderContent'
import RightHeaderNav from './RightHeaderNav'
import UserDropdown from './UserDropdown'

export default function Header() {
  return (
    <header className="BG-white Border-bottom Text-black w-full overflow-x-auto border-b px-48 py-10">
      <div className="flex w-full items-center justify-between pr-16">
        {/* 좌측 대시보드명 */}
        <div className="hidden lg:block">
          <LeftHeaderContent />
        </div>

        {/* 우측 사용자 정보/다크모드 */}
        <div className="flex gap-16 whitespace-nowrap">
          <RightHeaderNav />
          <CreateInvitationModal />
          {/* 협업자 목록 */}
          <CollaboratorList />

          <div className="flex items-center gap-32 border-l pl-16">
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
