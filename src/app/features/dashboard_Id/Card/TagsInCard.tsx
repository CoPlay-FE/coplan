import { useTheme } from 'next-themes'

import { getColor } from '@/app/shared/lib/getColor'

export default function Tags({ tags }: { tags: string[] }) {
  //태그 컬러 - 랜덤 배정
  //카드 생성 시 - 동일 태그 입력 불가하도록
  const bgColors = ['#F9EEE3', '#E7F7DB', '#F7DBF0', '#DBE6F7']
  const bgColorsDark = ['#774212', '#366712', '#711E5C', '#0F3167']
  const textColors = ['#D58D49', '#86D549', '#D549B6', '#4981D5']

  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <div className="flex flex-wrap gap-6 tablet:mr-16">
      {tags.map((tag) => {
        // const colorIndex = getColor(tag, bgColors.length)
        // getColors함수 사용하면 NaN값이 떠서 작동을 안함.. 원래 문제 없었는데 이유를 모르겠음.
        const hash = tag
          .split('')
          .reduce((acc, char) => acc + char.charCodeAt(0), 0)
        const colorIndex = hash % 4

        const backgroundColor = isDark
          ? bgColorsDark[colorIndex]
          : bgColors[colorIndex]
        const textColor = isDark ? bgColors[colorIndex] : textColors[colorIndex]

        return (
          <span
            key={tag}
            className="inline-block whitespace-nowrap rounded-4 px-9 pb-3 pt-5"
            style={{
              backgroundColor: backgroundColor,
              color: textColor,
            }}
          >
            {tag}
          </span>
        )
      })}
    </div>
  )
}
