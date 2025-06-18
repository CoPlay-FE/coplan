// import { Assignee } from '../../lib/getDashboardMembers'
// const mockData = ['aaa', 'bbb', 'ccc']
// import { Member } from '../type/Member.type'
import { ControllerRenderProps } from 'react-hook-form'

import { cn } from '@/app/shared/lib/cn'

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

export default function AssigneeList({
  members,
  setAssignee,
  controlField,
}: AssigneeListProps) {
  const assignees = getDashboardMembers(members) //리스폰스로 받은 members 데이터를, 필요한 항목으로만 구성된 배열 assignee로 추출

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
            controlField.onChange(assignee.userId) // 리액트 훅에는 .useId 값 연결
          }}
        >
          {assignee.nickname}
        </div>
      ))}
    </div>
  )
}

function getDashboardMembers(data: Member[] | undefined) {
  const assignees: Assignee[] = data
    ? data.map((member: Member) => ({
        userId: member.userId,
        nickname: member.nickname,
      }))
    : []
  return assignees
}
