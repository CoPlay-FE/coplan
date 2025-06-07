import Header from '@components/common/header/Header'

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Header />
      <div>{children}</div> {/* 여기에 page.tsx 내용이 들어옴 */}
    </div>
  )
}
