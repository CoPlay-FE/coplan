import { getColor } from '@/app/shared/lib/getColor'

/**
 * Displays a list of tags with each tag assigned a consistent background and text color.
 *
 * Each tag's color is determined by a deterministic function based on its text, ensuring the same tag always receives the same color combination.
 *
 * @param tags - Array of tag strings to display.
 */
export default function Tags({ tags }: { tags: string[] }) {
  //태그 컬러 - 랜덤 배정
  //카드 생성 시 - 동일 태그 입력 불가하도록
  const bgColors = ['#F9EEE3', '#E7F7DB', '#F7DBF0', '#DBE6F7']
  const textColors = ['#D58D49', '#86D549', '#D549B6', '#4981D5']

  return (
    <div className="flex flex-wrap gap-6">
      {tags.map((tag) => {
        const colorIndex = getColor(tag, bgColors)

        return (
          <span
            key={tag}
            className="inline-block whitespace-nowrap rounded-4 px-9 pb-3 pt-5"
            style={{
              backgroundColor: bgColors[colorIndex],
              color: textColors[colorIndex],
            }}
          >
            {tag}
          </span>
        )
      })}
    </div>
  )
}
