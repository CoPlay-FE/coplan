interface PlusIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  weight?: number
}

export default function PlusIcon({
  size = 24,
  weight = 3,
  className,
  ...props
}: PlusIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9 3V15"
        stroke="currentColor"
        strokeWidth={weight}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 9H15"
        stroke="currentColor"
        strokeWidth={weight}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
