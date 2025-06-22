/**
 * Provides a centered layout for dashboard pages with responsive horizontal padding.
 *
 * Renders its children inside a vertically and horizontally centered container with a fixed width and adjustable padding for mobile-wide screens.
 *
 * @param children - The content to display within the dashboard layout
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex w-520 flex-col items-center justify-center gap-24 px-0 mobile-wide:px-12">
        {children}
      </div>
    </div>
  )
}
