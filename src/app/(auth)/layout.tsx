export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="flex w-520 flex-col items-center justify-center gap-24 px-12 sm:px-0">
        {children}
      </div>
    </div>
  )
}
