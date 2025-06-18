import Header from '@components/common/header/Header'

import Sidebar from '@/app/shared/components/common/sidebar/Sidebar'

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Sidebar />
      <Header />
      <div>{children}</div> {/* 여기에 page.tsx 내용이 들어옴 */}
    </div>
  )
}
