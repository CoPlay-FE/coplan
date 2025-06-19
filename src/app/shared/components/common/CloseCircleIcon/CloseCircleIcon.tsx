interface CloseCircleIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number
}

export default function CloseCircleIcon({
  size = 20,
  ...props
}: CloseCircleIconProps) {
  return (
    <>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        {...props}
      >
        <circle cx="12" cy="12" r="12" fill="currentColor" />
        <line
          x1="8"
          y1="8"
          x2="16"
          y2="16"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="16"
          y1="8"
          x2="8"
          y2="16"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </>
  )
}
