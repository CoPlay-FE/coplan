import { ControllerRenderProps } from 'react-hook-form'

import { cn } from '@/app/shared/lib/cn'

import getDashboardMembers from '../../lib/getDashboardMembers'
import { CardFormData } from '../../type/CardFormData.type'
import { Member } from '../../type/Member.type'

export interface Assignee {
  userId: number
  nickname: string
}
interface AssigneeListProps {
  members: Member[] | undefined
  setAssignee: (assignee: Assignee) => void
  controlField: ControllerRenderProps<CardFormData, 'assigneeUserId'>
}

// ✅ AssigneeList 컴포넌트: 담당자 후보 목록을 보여주는 드롭다운 리스트
// 1. 담당자 항목을 클릭하면:
//    - setAssignee(assignee) 실행 → 선택된 담당자 객체를 부모 컴포넌트 하에 관리 (ex. UI에서 닉네임 표시용)
//    - controlField.onChange(assignee.userId) 실행 → react-hook-form에 userId 값을 전달 (form 제출에는 Id 데이터만 전달함)

export default function AssigneeList({
  members,
  setAssignee,
  controlField, // react-hook-form의 컨트롤 필드 객체 (assigneeUserId 필드와 연결됨)
}: AssigneeListProps) {
  const assignees = getDashboardMembers(members)

  return (
    <div className="BG-white Border-btn Text-gray absolute left-0 top-full z-10 mt-4 w-full rounded-6 text-14">
      {assignees.map((assignee: Assignee, index: number) => (
        <div
          className={cn(
            'BG-Input-hovered w-full cursor-pointer px-16 py-11 pt-14 placeholder-gray-400 caret-transparent',
            index !== 0 && 'border-t',
          )}
          key={assignee.userId}
          onClick={() => {
            setAssignee(assignee) // 담당자 업데이트
            controlField.onChange(assignee.userId) // 리액트 훅에는 .userId 값 연결
          }}
        >
          {assignee.nickname}
        </div>
      ))}
    </div>
  )
}
