export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="BG-gray min-h-screen px-20 sm:px-30">
      <main>{children}</main>
    </div>
  )
}
