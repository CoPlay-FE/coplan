interface PlusIconProps {
  width?: number
  height?: number
  weight?: number
  className?: string
}

export default function PlusIcon({
  width = 24,
  height = 24,
  weight = 3,
  className = 'Text-blue',
}: PlusIconProps) {
  return (
    <>
      <svg
        className={className}
        width={width}
        height={height}
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
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
    </>
  )
}
