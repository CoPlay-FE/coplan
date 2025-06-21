import Image from 'next/image'

import { cn } from '@/app/shared/lib/cn'

interface FeatureCardProps {
  image: string
  imageAlt: string
  title: string
  description: string
  imageClassName?: string
}

export default function FeatureCard({
  image,
  imageAlt,
  title,
  description,
  imageClassName,
}: FeatureCardProps) {
  return (
    <div className="flex min-w-378 flex-col overflow-hidden rounded-lg mobile-wide:min-w-343">
      <div className="BG-section flex h-260 items-center justify-center mobile-wide:h-235">
        <div className={cn('relative', imageClassName)}>
          <Image className="object-contain" src={image} alt={imageAlt} fill />
        </div>
      </div>
      <div className="BG-card relative h-124 px-32 py-27 mobile-wide:h-112">
        <p className="mb-12 text-18 font-bold text-white">{title}</p>
        <p className="text-16 font-normal text-white">{description}</p>
      </div>
    </div>
  )
}
