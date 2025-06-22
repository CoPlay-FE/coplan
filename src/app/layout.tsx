import './globals.css'

import type { Metadata } from 'next'
import { Toaster } from 'sonner'

import { Providers } from './providers'
import GlobalModalRenderer from './shared/components/common/GlobalModalRender'

export const metadata: Metadata = {
  metadataBase: new URL('https://coplan.work'),
  title: 'Coplan',
  description: '팀워크를 더 쉽게 만드는 협업 툴',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Coplan - 팀워크를 더 쉽게',
    description: '효율적인 협업을 위한 최고의 선택',
    url: 'https://coplan.work',
    siteName: 'Coplan',
    images: [
      {
        url: 'https://coplan.work/images/banner.png', // ✅ 상대 경로 대신 절대 URL로만 수정
        width: 1200,
        height: 630,
        alt: 'Coplan OG 이미지',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coplan - 팀워크를 더 쉽게',
    description: '프로젝트 관리를 위한 스마트한 협업툴',
    images: ['https://coplan.work/images/banner.png'], // ✅ 여기서도 절대 URL로만 수정
    creator: '@coplan_team',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
          <GlobalModalRenderer />
          <Toaster position="top-right" richColors closeButton />
        </Providers>
        <div id="modal-root" />
      </body>
    </html>
  )
}
