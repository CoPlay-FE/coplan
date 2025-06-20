import GithubIcon from './GithubIcon'

export default function Footer() {
  return (
    <footer className="tabletS:h-100 tabletS:flex-row tabletS:justify-between tabletS:px-140 flex h-236 flex-col items-center justify-center gap-32">
      <p className="font-bold">@Coplan - 2025</p>
      <GithubIcon />
    </footer>
  )
}
