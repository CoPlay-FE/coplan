import GithubIcon from './GithubIcon'

export default function Footer() {
  return (
    <footer className="tablet-wide:h-100 tablet-wide:flex-row tablet-wide:justify-between tablet-wide:px-140 flex h-236 flex-col items-center justify-center gap-32">
      <p className="font-bold">@Coplan - 2025</p>
      <GithubIcon />
    </footer>
  )
}
