import Header from '@components/common/header/Header'

import Sidebar from '@/app/shared/components/common/sidebar/Sidebar'

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Sidebar />
      <div className="pl-300">
        <Header title="대시보드 명" />
        <main>{children}</main>
      </div>
    </>
  )
}
