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
      <div className="pl-[300px] transition-all duration-300 mobile:pl-67 tablet:pl-[150px]">
        <Header />
        <main className="pt-57">{children}</main>
      </div>
    </>
  )
}
