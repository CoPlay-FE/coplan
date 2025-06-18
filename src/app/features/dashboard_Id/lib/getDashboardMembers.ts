import { Member } from '../type/Member.type'

export interface Assignee {
  userId: number
  nickname: string
}

export default function getDashboardMembers(data: Member[] | undefined) {
  const assignees: Assignee[] = data
    ? data.map((member: Member) => ({
        userId: member.userId,
        nickname: member.nickname,
      }))
    : []
  return assignees
}
