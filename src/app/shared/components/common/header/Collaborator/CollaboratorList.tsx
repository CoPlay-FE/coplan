'use client' // Tooltip, CollaboratorItem 컴포넌트는 클라이언트에서만 사용되므로 'use client' 선언

import CollaboratorItem from '../../CollaboratorItem'
import Tooltip from './Tooltip' // 툴팁 기능

// 임시 mock 협업자 데이터
export const mockCollaborators = [
  { nickname: '홍길동', imageUrl: '/images/collaborator.png' },
  { nickname: '김철수', imageUrl: '/images/collaborator.png' },
  { nickname: '이영희', imageUrl: '/images/collaborator.png' },
  { nickname: '뚜비', imageUrl: '/images/collaborator.png' },
  { nickname: '두룹', imageUrl: '/images/collaborator.png' },
  { nickname: 'ㅋ', imageUrl: '/images/collaborator.png' },
]

// 협업자 배열을 선택적으로 전달받음
type CollaboratorListProps = {
  collaborators?: {
    nickname: string
    imageUrl?: string
  }[]
}

// 협업자 리스트 컴포넌트
export default function CollaboratorList({
  collaborators = mockCollaborators, // 전달된 협업자가 없을 경우 mock 데이터 사용
}: CollaboratorListProps) {
  const MAX_VISIBLE = 4 // 최대 표시 협업자 수
  const visibleCollaborators = collaborators.slice(0, MAX_VISIBLE) // 앞에서부터 4명만 추출
  const extraCount = collaborators.length - MAX_VISIBLE // 초과 인원 계산

  return (
    <div className="flex gap-4">
      {/* 협업자들 가로 배치 & 간격 설정 */}
      {visibleCollaborators.map((collab) => (
        // 각 협업자에 툴팁을 감싸서 닉네임 표시
        <Tooltip key={collab.nickname} content={collab.nickname}>
          <div className="flex flex-col items-center text-xs">
            <CollaboratorItem
              nickname={collab.nickname}
              imageUrl={collab.imageUrl}
              size={40} // 프로필 이미지 크기 설정
            />
          </div>
        </Tooltip>
      ))}
      {/* 초과 인원이 있을 경우 +N 표시 */}
      {extraCount > 0 && (
        <Tooltip
          content={`${visibleCollaborators[0].nickname} 외 ${extraCount}명`} // 툴팁에 대표 닉네임 외 몇 명 표시
        >
          <div className="flex flex-col items-center text-xs">
            <div className="Text-white flex size-40 items-center justify-center rounded-full bg-gray-300 text-sm font-semibold">
              +{extraCount} {/* 초과 인원 수 출력 */}
            </div>
          </div>
        </Tooltip>
      )}
    </div>
  )
}
