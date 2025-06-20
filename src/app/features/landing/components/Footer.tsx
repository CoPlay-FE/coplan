import GithubIcon from './GithubIcon'

export default function Footer() {
  return (
    <footer className="tablet-wide:h-100 tablet-wide:flex-row mobile-wide:flex-col tablet-wide:justify-between tablet-wide:px-40 flex h-236 items-center justify-between gap-32 px-140">
      <p className="font-bold">@Coplan - 2025</p>
      <GithubIcon />
    </footer>
  )
}
