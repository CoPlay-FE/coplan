import useCards from '@/app/api/useCards'
import type { Column } from '@/app/api/useColumns'

import Card from '../Card/Card'
export default function Column({ column }: { column: Column }) {
  const { id, title }: { id: number; title: string } = column
  const { data, isLoading, error } = useCards(id)
  if (isLoading) return <p>loading...</p>
  if (error) return <p>error...{error.message}</p>

  return (
    <div className="BG-gray Border-column w-354 shrink-0 p-20">
      <h2>{title}</h2>
      <span>totalCount of cards: {data?.totalCount}</span>
      {data?.cards.map((card) => <Card key={card.id} card={card} />)}
    </div>
  )
}
