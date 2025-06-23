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
      <div className="pl-300 transition-all duration-300 mobile:pl-67 tablet:pl-150">
        <Header />
        <main className="pt-57">{children}</main>
      </div>
    </>
  )
}
