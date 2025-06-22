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
      <div className="pl-300 tablet:pl-150 mobile-wide:pl-50">
        <Header />
        <main>{children}</main>
      </div>
    </>
  )
}
