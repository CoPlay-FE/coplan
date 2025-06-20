import Image from 'next/image'

interface FeatureCardProps {
  image: string
  imageAlt: string
  imageHeight: number
  imageWidth: number
  title: string
  description: string
}

export default function FeatureCard({
  image,
  imageAlt,
  imageHeight,
  imageWidth,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="tablet-wide:min-w-378 flex min-w-343 flex-col overflow-hidden rounded-lg">
      <div className="BG-section tablet-wide:h-260 flex h-235 items-center justify-center">
        <div
          className="relative"
          style={{ height: `${imageHeight}px`, width: `${imageWidth}px` }}
        >
          <Image className="object-contain" src={image} alt={imageAlt} fill />
        </div>
      </div>
      <div className="BG-card tablet-wide:h-124 relative h-118 px-32 py-27">
        <p className="mb-16 text-18 font-bold text-white">{title}</p>
        <p className="text-16 font-normal text-white">{description}</p>
      </div>
    </div>
  )
}
