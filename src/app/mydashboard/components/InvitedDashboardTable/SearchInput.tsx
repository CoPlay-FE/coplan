'use client'

import Image from 'next/image'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function SearchInput({
  value,
  onChange,
  placeholder = '검색',
}: SearchInputProps) {
  return (
    <div className="relative h-40 w-960">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="Border-btn h-40 w-full rounded-8 border pl-40 pr-12 text-14 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
      />
      <div className="absolute left-16 top-1/2 -translate-y-1/2 transform">
        <Image
          src="/images/search.svg"
          alt="검색"
          width={24}
          height={24}
          className="dark:invert"
        />
      </div>
    </div>
  )
}
