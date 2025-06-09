export default function Tags({ tags }: { tags: string[] }) {
  //태그 컬러 - 랜덤 배정
  //카드 생성 시 - 동일 태그 입력 불가하도록
  return (
    <div className="flex gap-6">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-block whitespace-nowrap rounded-4 px-9 pb-3 pt-5"
          style={{ backgroundColor: '#F7DBF0', color: '#D549B6' }}
        >
          {tag}
        </span>
      ))}
    </div>
  )
}
