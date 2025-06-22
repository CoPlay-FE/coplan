import 'react-datepicker/dist/react-datepicker.css'

import { format } from 'date-fns'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import { Controller, useForm } from 'react-hook-form'

import { cn } from '@/app/shared/lib/cn'

import useMembers from '../../api/useMembers'
import { usePutCardMutation } from '../../api/usePutCardMutation'
import { useUploadCardImage } from '../../api/useUploadCardImage'
import { SimpleColumn } from '../../store/useColumnsStore'
import { Assignee, Card } from '../../type/Card.type'
import type {
  CardFormData,
  CardModifyFormData,
} from '../../type/CardFormData.type'
import ColumnTitle from '../ColumnTitle'
import MyAssignee from '../MyAssignee'
import TagsCanDelete from '../TagsCanDelete'
import AssigneeList from './AssigneeList'
import ColumnList from './ColumnList'
import DateInput from './input/DateInput'
import Input from './input/Input'

export default function ModifyCardForm({
  onClose,
  currentColumn,
  card,
}: {
  onClose: () => void
  currentColumn: SimpleColumn
  card: Card
}) {
  const [preview, setPreview] = useState<string | null>(card.imageUrl) // 이미지 URl 임시 저장
  const [tags, setTags] = useState<string[]>(card.tags) // 태그 목록 임시 저장]
  const [tagInput, setTagInput] = useState('') // 작성중인 태그
  const { mutate: uploadImage, isPending: isUploading } = useUploadCardImage()

  // 대시보드 멤버(담당자 선택)
  const params = useParams()
  const dashboardId = Number(params.id)
  const { data } = useMembers(dashboardId)
  const [isOpen, setIsOpen] = useState(false) // 담당자 드롭다운
  const [selectedAssignee, setSelectedAssignee] = useState<Assignee>(
    card.assignee,
  ) // 선택한 담당자
  const { columnId } = card

  // 컬럼 목록
  const [isOpenColumn, setIsOpenColumn] = useState(false)
  const [selectedColumn, setSelectedColumn] = useState(currentColumn)

  //useForm
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting, isDirty },
  } = useForm<CardFormData>({
    defaultValues: {
      assigneeUserId: card.assignee?.id,
      dashboardId: card.dashboardId,
      columnId: card.columnId,
      title: card.title,
      description: card.description,
      dueDate: card.dueDate ? card.dueDate : '',
      tags: card.tags ? card.tags : [],
      imageUrl: card.imageUrl ? card.imageUrl : '',
    },
    mode: 'onChange', // isValid와 isDirty가 입력 즉시 반영되도록
  })

  // React Hook Form 과 tags 값 연결
  useEffect(() => {
    setValue('tags', tags, { shouldDirty: true })
  }, [tags, tags.length, setValue])

  // 상태(컬럼) 선택 시 / assignee 선택 시 드롭다운 닫기
  useEffect(() => {
    if (selectedAssignee) {
      setIsOpen(false)
    }
    if (selectedColumn) {
      setIsOpenColumn(false)
    }
  }, [selectedAssignee, selectedColumn])

  // 이미지 파일 처리
  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    uploadImage(
      { columnId, file },
      {
        onSuccess: ({ imageUrl }) => {
          setValue('imageUrl', imageUrl)
          setPreview(imageUrl)
        },
      },
    )
  }

  // 폼 제출 핸들러 함수
  const { mutate: modifyCard, isPending } = usePutCardMutation()
  function onSubmit(data: CardModifyFormData) {
    const payload: CardModifyFormData = {
      ...data,
      columnId: selectedColumn.columnId,
    }

    if (!data.dueDate) delete payload.dueDate
    if (!data.imageUrl || !preview) delete payload.imageUrl // delete로 아예 필드의 해당 key를 지워야, 서버가 "없음"으로 인식함..

    console.log('submitted', payload)
    modifyCard({ cardId: card.id, payload: payload })
    onClose()
  }

  // ✅ JSX
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-32"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="Text-black text-24 font-bold">할 일 수정</h2>

      <div className="flex gap-32 mobile:flex-col">
        {/* 컬럼 선택 */}
        <Controller
          name="columnId"
          control={control}
          render={({ field }) => (
            <Input labelName="상태" labelFor="columnId">
              <div className="relative w-207">
                <input
                  {...field}
                  onClick={() => setIsOpenColumn((prev) => !prev)}
                  readOnly
                  className="Input-readOnly-217"
                  id="columnId"
                  type="text"
                  placeholder={currentColumn.columnTitle}
                />
                {/* 인풋에 보이는 선택된 컬럼 & 오른쪽 화살표 */}
                <div className="absolute left-16 top-1/2 -translate-y-1/2 mobile:left-11">
                  <ColumnTitle title={selectedColumn.columnTitle} />
                </div>
                <Image
                  src="/images/arrow-dropdown.svg"
                  alt="화살표"
                  width={26}
                  height={24}
                  className={cn(
                    'pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 transition-transform duration-300 mobile:-right-65',
                    isOpenColumn && 'rotate-180',
                  )}
                />
                {/* 컬럼 선택지 */}
                {isOpenColumn && (
                  <ColumnList
                    setColumn={setSelectedColumn}
                    controlField={field}
                  />
                )}
              </div>
            </Input>
          )}
        />

        {/* 담당자 입력 */}
        <Controller
          name="assigneeUserId"
          control={control}
          render={({ field }) => (
            <Input labelName="담당자" labelFor="assigneeUserId">
              <div className="relative w-207">
                <input
                  {...field}
                  onClick={() => setIsOpen((prev) => !prev)}
                  readOnly
                  className="Input-readOnly-217"
                  id="assigneeUserId"
                  type="text"
                  placeholder={selectedAssignee ? '' : '담당자를 선택해 주세요'}
                />
                {selectedAssignee && (
                  <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-[#FFFFFF] dark:bg-[#3B3B3B]">
                    <MyAssignee assignee={selectedAssignee} />
                  </div>
                )}
                <Image
                  src="/images/arrow-dropdown.svg"
                  alt="화살표"
                  width={26}
                  height={24}
                  className={cn(
                    'pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 transition-transform duration-300 mobile:-right-65',
                    isOpen && 'rotate-180',
                  )}
                />
                {isOpen && (
                  <AssigneeList
                    members={data}
                    setAssignee={setSelectedAssignee}
                    controlField={field}
                  />
                )}
              </div>
            </Input>
          )}
        />
      </div>

      {/* 제목 입력 */}
      <Input labelName="제목" labelFor="title" accent={true}>
        <input
          {...register('title', {
            required: '제목을 입력해 주세요',
          })}
          className="Input"
          id="title"
          type="text"
          placeholder="제목을 입력해 주세요"
        />
      </Input>

      {/* 설명 입력 */}
      <Input labelName="설명" labelFor="description" accent={true}>
        <textarea
          {...register('description', {
            required: '설명을 입력해 주세요',
          })}
          className="Input h-126 resize-none"
          id="description"
          placeholder="설명을 입력해 주세요"
        />
      </Input>

      {/* 마감일 선택 */}
      <Input labelName="마감일" labelFor="dueDate">
        <Controller
          name="dueDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              selected={field.value ? new Date(field.value) : null} // field.value가 string이라서, Date로 변환해서 데이트피커의 selected에 넘김
              onChange={(date) => {
                if (date) {
                  const formatted = format(date, 'yyyy-MM-dd HH:mm')
                  field.onChange(formatted)
                }
              }}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="yyyy/MM/dd HH:mm"
              customInput={<DateInput />}
            />
          )}
        />
      </Input>

      {/* 태그 입력 */}
      <Input labelName="태그" labelFor="">
        <div className="relative">
          <input
            className="Input"
            id="tags"
            type="text"
            placeholder="태그를 입력하세요 (30자 이내)"
            maxLength={30}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                if (tagInput.trim() === '') return
                if (!tags.includes(tagInput.trimEnd())) {
                  setTags((prev) => [...prev, tagInput.trim()]) // 중복 태그가 아니면 ok, 태그배열에 추가 및 입력창 초기화
                  setTagInput('')
                }
              }
            }}
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
          />

          {/* 추가한 태그 */}
          {tags && (
            <div className="mt-10">
              <TagsCanDelete tags={tags} setTags={setTags} />
            </div>
          )}
        </div>
      </Input>

      {/* 이미지 업로드 */}
      <div>
        <h3 className="mb-8">이미지</h3>
        {/* 이미지 미리보기 or 업로드 버튼 */}
        <div className="relative">
          <label
            htmlFor="imageUrl"
            className="flex size-76 items-center justify-center overflow-hidden rounded-6 border-[#747474] bg-[#F5F5F5] dark:border dark:border-[#747474] dark:bg-[#3B3B3B]"
          >
            {preview ? (
              <Image
                src={preview}
                alt="미리보기"
                width={76}
                height={76}
                className="size-full object-cover"
              />
            ) : isUploading ? (
              ''
            ) : (
              <Image
                src="/images/plus.svg"
                width={28}
                height={28}
                className="size-28"
                alt="플러스 아이콘"
              />
            )}
          </label>

          {/* ❌ 이미지 제거 버튼 (이미지가 있을 경우만 표시) */}
          {preview && (
            <button
              type="button"
              className="Text-gray absolute bottom-0 left-83 text-12 font-medium"
              onClick={() => {
                setPreview(null)
                setValue('imageUrl', '') // 또는 null
              }}
            >
              삭제
            </button>
          )}
          {/* 이미지 수정 가능 표시  */}
          {preview === card.imageUrl && (
            <div className="pointer-events-none absolute left-0 top-0 flex size-76 items-center justify-center rounded-6 bg-black/60">
              <Image
                src="/images/modify-pen.svg"
                width={30}
                height={30}
                alt="이미지 수정펜"
              />
            </div>
          )}
        </div>
        {/* 파일 입력 필드 (실제 input은 숨겨져 있음) */}
        <input
          id="imageUrl"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>

      {/* 취소 및 생성 버튼 */}
      <div className="flex gap-8">
        <button
          className="Border-btn Text-gray w-full rounded-8 border-solid py-13 text-16 font-medium"
          onClick={onClose}
        >
          취소
        </button>
        <button
          className="BG-blue w-full rounded-8 border-solid py-14 text-16 font-medium text-[#FFFFFF] disabled:bg-gray-300 dark:disabled:bg-[#464646]"
          type="submit"
          disabled={!isValid || !isDirty || isPending || isSubmitting}
        >
          수정
        </button>
      </div>
    </form>
  )
}
