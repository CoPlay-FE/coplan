import Image from 'next/image'
import { useState } from 'react'

import Dropdown from '@/app/shared/components/common/Dropdown/Dropdown'

import { Card } from '../../type/Card.type'
import { Column } from '../../type/Column.type'
import CreateCardModal from '../cardFormModals/CreateCardModal'
import ModifyCardForm from '../cardFormModals/ModifyCardForm'
import Tags from '../Tags'
interface CardContentProps {
  onClose: () => void
  card: Card
  column: Column
}
export default function CardContent({
  onClose,
  card,
  column,
}: CardContentProps) {
  const { id, imageUrl, title, tags, dueDate, assignee } = card
  const [openModifyCard, setOpenModifyCard] = useState(false)
  const { title: columnTitle, id: columnId } = column
  const currentColumn = { columnTitle, columnId }

  return (
    <>
      <h2 className="Text-black bt-24 text-24 font-bold">{title}</h2>
      <div className="flex items-center gap-24">
        <Dropdown
          width="w-6"
          align="right"
          trigger={
            <Image
              src="/images/drop-more.svg"
              alt="드롭 옵션 보기"
              width={28}
              height={28}
            />
          }
        >
          {/* 드롭다운 내부 메뉴 아이템 */}
          <div
            className="Text-black cursor-pointer whitespace-nowrap rounded-6 px-22 py-11 text-center text-14 font-medium hover:bg-[#dbf0ff] hover:text-[#228DFF] dark:hover:bg-[#02406d]"
            onClick={() => setOpenModifyCard(true)}
          >
            수정하기
          </div>
          <div className="Text-black cursor-pointer whitespace-nowrap rounded-6 px-22 py-11 text-center text-14 font-medium hover:bg-[#dbf0ff] hover:text-[#228DFF] dark:hover:bg-[#02406d]">
            삭제하기
          </div>
        </Dropdown>
        <Image
          src={'/images/close.svg'}
          alt="카드 닫기"
          width={32}
          height={32}
          onClick={() => {
            onClose()
            console.log('sdfadfdsgreggsfds')
          }}
        />
      </div>

      <div>
        그리드로 관리하기 / 컬럼명은 따로 컴포넌트로 만들어 빼기
        <div>{column.title}</div>
        <Tags tags={tags} />
        <p>설명~~~~~~~~</p>
        <div>
          <div>{assignee.nickname}</div>
          <div>{dueDate}</div>
        </div>
      </div>
      <div> 이미지 있으면 이미지</div>
      <div>댓글 컴포넌트</div>

      {/* 카드 수정 모달 */}
      {openModifyCard && (
        <CreateCardModal>
          <ModifyCardForm
            onClose={() => setOpenModifyCard(false)}
            // columnId={column.id}
            currentColumn={currentColumn}
            card={card}
          />
        </CreateCardModal>
      )}
    </>
  )
}
