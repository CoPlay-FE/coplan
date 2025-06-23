import Header from '@components/common/header/Header'

import Sidebar from '@/app/shared/components/common/sidebar/Sidebar'

export default function MypageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Sidebar />
      {/* Sidebar의 반응형이 적용 될 경우 변경 예정 */}
      <div className="mobile-wide:pl-67 tablet-wide:pl-160 pl-300">
        <Header />
        <main className="BG-gray mt-57 h-screen">{children}</main>
      </div>
    </>
  )
}
