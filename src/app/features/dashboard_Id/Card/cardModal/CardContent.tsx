import Image from 'next/image'
import { useState } from 'react'

import { Avatar } from '@/app/shared/components/common/Avatar'
import Dropdown from '@/app/shared/components/common/Dropdown/Dropdown'
import { useIsMobile } from '@/app/shared/hooks/useIsmobile'

import { useDeleteCardMutation } from '../../api/useDeleteCardMutation'
import { Card } from '../../type/Card.type'
import { Column } from '../../type/Column.type'
import CreateCardModal from '../cardFormModals/CreateCardModal'
import ModifyCardForm from '../cardFormModals/ModifyCardForm'
import ColumnTitle from '../ColumnTitle'
import Tags from '../Tags'
import CommentForm from './CommentForm'
import Comments from './Comments'

export default function CardContent({
  onClose,
  openModifyModal,
  card,
  column,
}: {
  onClose: () => void
  openModifyModal: () => void
  card: Card
  column: Column
}) {
  // const { id, imageUrl, title, tags, dueDate, assignee, description } = card
  const [openModifyCard, setOpenModifyCard] = useState(false)
  // const { title: columnTitle, id: columnId } = column
  // const currentColumn = { columnTitle, columnId }
  const isMobile = useIsMobile()
  const { mutate: deleteCard, isPending } = useDeleteCardMutation()

  return (
    // <div className="relative">
    <div>
      <h2 className="Text-black mb-24 text-24 font-bold mobile:mt-40 mobile:text-20">
        {card.title}
      </h2>

      {/* 카드 우측 상단의 케밥 버튼, X 버튼 */}
      <div className="absolute right-38 top-30 flex items-center gap-24 mobile:right-16 mobile:top-16 mobile:gap-16 tablet:right-32 tablet:top-24">
        <Dropdown
          width="w-6"
          align="right"
          trigger={
            <Image
              src="/images/drop-more.svg"
              alt="드롭 옵션 보기"
              width={28}
              height={28}
              className="mobile:size-20"
            />
          }
        >
          {/* 트리거의(케밥) 드롭다운 - 수정하기, 삭제하기 */}
          <button
            className="Text-black w-full whitespace-nowrap rounded-6 px-22 py-11 text-center text-14 font-medium hover:bg-[#dbf0ff] hover:text-[#228DFF] dark:hover:bg-[#02406d]"
            onClick={(e) => {
              e.stopPropagation() // 클릭 이벤트가 부모 컴포넌트(Card)까지 번지지 않도록 (Card-> onClick->isOpen 주의)
              openModifyModal()
              onClose()
            }}
          >
            수정하기
          </button>
          <button
            className="Text-black w-full whitespace-nowrap rounded-6 px-22 py-11 text-center text-14 font-medium hover:bg-[#dbf0ff] hover:text-[#228DFF] dark:hover:bg-[#02406d]"
            onClick={(e) => {
              e.stopPropagation()
              deleteCard(card.id)
            }}
          >
            삭제하기
          </button>
        </Dropdown>
        {/* X 버튼 (카드 닫기)*/}
        <button
          onClick={(e) => {
            e.stopPropagation() //
            onClose()
          }}
        >
          <Image
            src="/images/close.svg"
            alt="카드 닫기"
            width={32}
            height={32}
            className="mobile:size-24"
          />
        </button>
      </div>

      {/* 카드 상단 */}
      <div>
        <div className="flex gap-14 mobile:flex-col-reverse mobile:gap-16">
          {/* 컬럼명 / 태그 // 설명 // 이미지 */}
          <div className="w-470 mobile:w-295 tablet:w-420">
            <div className="mb-16 flex items-start gap-20 mobile:gap-12">
              <ColumnTitle title={column.title} />
              <div className="mt-6 h-20 w-1 bg-[#D9D9D9] dark:bg-[#454545]"></div>
              {card.tags && <Tags tags={card.tags} />}
            </div>
            {card.description && (
              <p
                className={
                  'font-regular Text-black mb-16 text-14 mobile:mb-32 mobile:text-12'
                }
              >
                {card.description}
              </p>
            )}
            {card.imageUrl && (
              <Image
                alt="카드 이미지"
                src={card.imageUrl}
                width={420}
                height={300}
                className="mb-24 h-auto w-full rounded-6 object-contain"
                priority
              />
            )}
          </div>
          {/* 담당자 / 마감일 박스 */}
          <div>
            <div className="Border-section flex w-200 flex-col gap-16 rounded-8 px-16 py-14 mobile:w-full mobile:flex-row mobile:py-9 tablet:w-181">
              <div className="mobile:w-120">
                <span className="Text-black moblie:mb-0 mb-6 block text-12 font-semibold">
                  담당자
                </span>
                {card.assignee && (
                  <div className="flex items-center gap-8">
                    <>
                      <Avatar
                        size={isMobile ? 24 : 32}
                        name={card.assignee.nickname}
                        imageUrl={card.assignee.profileImageUrl}
                      />
                      <span className="regular Text-black block pt-1 text-14 leading-none mobile:text-12">
                        {card.assignee.nickname}
                      </span>
                    </>
                  </div>
                )}
              </div>
              <div>
                <span className="Text-black mb-6 block text-12 font-semibold mobile:mb-8">
                  마감일
                </span>
                {card.dueDate && (
                  <span className="regular Text-black block pt-1 text-14 leading-none mobile:text-12">
                    {card.dueDate}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>

      <CommentForm
        cardId={card.id}
        columnId={card.columnId}
        dashboardId={card.dashboardId}
      />
      <Comments cardId={card.id} />
    </div>
  )
}
