import 'react-datepicker/dist/react-datepicker.css'

import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { Controller, useForm } from 'react-hook-form'

import useMembers from '../../api/useMembers'
import { usePostCard } from '../../api/usePostCard'
import type { CardFormData } from '../../type/CardFormData.type'
import Tags from '../Tags'
import AssigneeList, { Assignee } from './AssigneeList'
import DateInput from './input/DateInput'
import Input from './input/Input'

export default function CreateCardForm({ onClose }: { onClose: () => void }) {
  const [preview, setPreview] = useState<string | null>(null) // 이미지 URl 임시 저장
  const [tags, setTags] = useState<string[]>([]) // 태그 목록 임시 저장
  const [tagInput, setTagInput] = useState('') // 입력된 태그

  // 대시보드 멤버(담당자 선택)
  const params = useParams()
  const dashboardId = Number(params.id)
  const { data } = useMembers(dashboardId)
  const [isOpen, setIsOpen] = useState(false) // 담당자 드롭다운
  const [selectedAssignee, setSelectedAssignee] = useState<Assignee>() // 선택한 담당자

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting, touchedFields, dirtyFields },
  } = useForm<CardFormData>({
    // mode: 'onChange', // 기본 모드는 onSubmit
    defaultValues: {
      dueDate: null,
    },
  })

  // 폼 제출 핸들러 함수
  const { mutate: createCard, isPending } = usePostCard()
  function onSubmit(data: CardFormData) {
    const payload = {
      ...data,
      dueDate: data.dueDate ? data.dueDate.toString() : '', // 제출 시 dueDate를 string으로 형변환
    }
    createCard(payload)
    console.log('submitted', payload)
  }

  // React Hook Form 과 tags 값 연결
  useEffect(() => {
    setValue('tags', tags)
    setValue('imageUrl', preview)
  }, [tags, setValue, preview])

  // assignee 선택 시 드롭다운 닫기
  useEffect(() => {
    if (selectedAssignee) {
      setIsOpen(false)
    }
  }, [selectedAssignee])

  // 이미지 파일 처리
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const fileUrl = URL.createObjectURL(file)
      console.log(fileUrl)
      setPreview(URL.createObjectURL(file))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-32">
      <h2 className="Text-black text-24 font-bold">할 일 생성</h2>

      {/* 담당자 입력 */}

      {/* React Hook Form에선 register와 state를 동시에 쓰면 controlled/uncontrolled 충돌 날 수 있어요. */}
      <Controller
        name="assigneeUserId"
        control={control}
        rules={{ required: '담당자를 선택해 주세요' }}
        render={({ field }) => (
          <Input labelName="담당자" labelFor="assigneeUserId">
            <div className="relative">
              <input
                {...field}
                onClick={() => setIsOpen((prev) => !prev)}
                value={selectedAssignee?.nickname ?? ''}
                readOnly
                className="Input-readOnly"
                id="assigneeUserId"
                type="text"
                placeholder="담당자를 선택해 주세요"
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
          rules={{ required: '날짜를 입력해 주세요' }}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={field.onChange}
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
              <Tags tags={tags} />
            </div>
          )}
        </div>
      </Input>

      {/* 이미지 파일 선택  */}
      <div>
        <h3 className="mb-8">이미지</h3>
        <label
          htmlFor={'imageUrl'}
          className="flex size-76 items-center justify-center rounded-6 bg-[#F5F5F5]"
        >
          {preview ? (
            <Image
              src={preview}
              alt="미리보기"
              width={76}
              height={76}
              className="size-full object-cover"
            />
          ) : (
            <Image
              src="/images/plus.svg"
              width={28}
              height={28}
              alt="플러스 아이콘"
            />
          )}
        </label>
        <input
          {...register('imageUrl', {
            required: '이미지를 선택해 주세요',
          })}
          id="imageUrl"
          type="file"
          alt="submit"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
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
          className="BG-blue Text-white w-full rounded-8 border-solid py-14 text-16 font-medium"
          type="submit"
          disabled={!isValid || isPending}
        >
          생성
        </button>
      </div>
    </form>
  )
}
