import { Member } from '../type/Member.type'

export interface Assignee {
  userId: number
  nickname: string
}

// 서버에서 받아온 Member 객체 배열을 Assignee 배열로 가공
// → 불필요한 필드는 제거하고 필요한 userId, nickname만 추출
export default function getDashboardMembers(data: Member[] | undefined) {
  const assignees: Assignee[] = data
    ? data.map((member: Member) => ({
        userId: member.userId,
        nickname: member.nickname,
      }))
    : []
  return assignees
}
