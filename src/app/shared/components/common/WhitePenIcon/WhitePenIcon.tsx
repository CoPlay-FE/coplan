interface WhitePenIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number
}

export default function WhitePenIcon({
  size = 24,
  ...props
}: WhitePenIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M3 21L6.75 20.25L17.81 9.19C18.2 8.8 18.2 8.17 17.81 7.78L16.22 6.19C15.83 5.8 15.2 5.8 14.81 6.19L3.75 17.25L3 21Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
