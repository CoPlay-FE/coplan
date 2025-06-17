export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex w-520 flex-col items-center justify-center gap-24 px-0 tablet:px-12">
        {children}
      </div>
    </div>
  )
}
