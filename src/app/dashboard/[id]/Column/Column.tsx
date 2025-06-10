import Image from 'next/image'

import useCards from '@/app/api/useCards'
import type { Column } from '@/app/api/useColumns'

import Card from '../Card/Card'
export default function Column({ column }: { column: Column }) {
  const { id, title }: { id: number; title: string } = column
  const { data, isLoading, error } = useCards(id)

  if (isLoading) return <p>loading...</p>
  if (error) return <p>error...{error.message}</p>

  //onclick 적용하고, PR올리고, DND구현 먼저 하기
  return (
    //px-6 pb-3 pt-5
    <div className="BG-gray Border-column flex w-354 shrink-0 flex-col gap-16 p-20">
      <div className="mb-24 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mb-7 mr-8 size-8 rounded-25 bg-blue-500"></div>
          <h2 className="mr-12 text-18 font-bold leading-none">{title}</h2>
          <span className="Text-gray block size-20 rounded-4 bg-[#EEEEEE] pt-3 text-center text-12 font-medium leading-tight dark:bg-[#2E2E2E]">
            {data?.totalCount}
          </span>
        </div>
        <Image
          src={'/images/config.svg'}
          alt="컬럼 설정"
          width={20}
          height={20}
        />
      </div>
      <button className="BG-white Border-btn rounded-6 px-146 py-9">
        <div className="flex h-22 w-22 items-center justify-center rounded-4 bg-blue-100">
          <Image
            src={'/images/plus.svg'}
            alt="추가하기"
            width={10}
            height={10}
          />
        </div>
      </button>
      {data?.cards.map((card) => <Card key={card.id} card={card} />)}
    </div>
  )
}
