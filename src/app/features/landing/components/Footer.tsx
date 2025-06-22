'use client'

import GithubIcon from './GithubIcon'

export default function Footer() {
  return (
    <footer className="flex h-236 items-center justify-between gap-32 px-140 mobile-wide:flex-col mobile-wide:justify-center mobile-wide:gap-30 tablet-wide:h-100 tablet-wide:flex-row tablet-wide:justify-between tablet-wide:px-40">
      <p className="font-bold mobile-wide:text-12">@Coplan - 2025</p>
      <GithubIcon />
    </footer>
  )
}
