'use client'

import CollaboratorItem from '../../CollaboratorItem'
import Tooltip from './Tooltip' // ✅ 추가

export const mockCollaborators = [
  { nickname: '홍길동', imageUrl: '/images/collaborator.png' },
  { nickname: '김철수', imageUrl: '/images/collaborator.png' },
  { nickname: '이영희', imageUrl: '/images/collaborator.png' },
  { nickname: '뚜비', imageUrl: '/images/collaborator.png' },
  { nickname: '두룹', imageUrl: '/images/collaborator.png' },
  { nickname: 'ㅋ', imageUrl: '/images/collaborator.png' },
]

type CollaboratorListProps = {
  collaborators?: {
    nickname: string
    imageUrl?: string
  }[]
}

export default function CollaboratorList({
  collaborators = mockCollaborators,
}: CollaboratorListProps) {
  const MAX_VISIBLE = 4
  const visibleCollaborators = collaborators.slice(0, MAX_VISIBLE)
  const extraCount = collaborators.length - MAX_VISIBLE

  return (
    <div className="flex gap-4">
      {visibleCollaborators.map((collab) => (
        <Tooltip key={collab.nickname} content={collab.nickname}>
          <div className="flex flex-col items-center text-xs">
            <CollaboratorItem
              nickname={collab.nickname}
              imageUrl={collab.imageUrl}
              size={48}
            />
          </div>
        </Tooltip>
      ))}

      {extraCount > 0 && (
        <Tooltip
          content={`${visibleCollaborators[0].nickname} 외 ${extraCount}명`}
        >
          <div className="flex flex-col items-center text-xs">
            <div className="Text-white flex size-48 items-center justify-center rounded-full bg-gray-300 text-sm font-semibold">
              +{extraCount}
            </div>
          </div>
        </Tooltip>
      )}
    </div>
  )
}
