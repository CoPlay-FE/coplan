'use client'

import { fetchMembers, Member } from '@hooks/useMembers'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import React from 'react'

import CollaboratorItem from '../../CollaboratorItem'
import Tooltip from './Tooltip'

const MAX_COLLABS = 4

export default function CollaboratorList() {
  const { id: dashboardId } = useParams()
  const dashboardIdNum = Number(dashboardId)

  const {
    data: members = [],
    isLoading,
    isError,
  } = useQuery<Member[]>({
    queryKey: ['members', dashboardIdNum],
    queryFn: () => fetchMembers(dashboardIdNum),
    enabled: !!dashboardIdNum,
  })

  if (isLoading && isError) return null

  // 프로필 이미지 및 닉네임만 필요한 경우
  const visibleCollaborators = members.slice(0, MAX_COLLABS)
  const extraCount = members.length - MAX_COLLABS

  return (
    <div className="flex -space-x-10 mobile-sm:hidden">
      {visibleCollaborators.map((collab) => (
        <Tooltip key={collab.id} content={collab.nickname}>
          <div className="flex flex-col items-center text-xs">
            <CollaboratorItem
              nickname={collab.nickname}
              imageUrl={collab.profileImageUrl ?? ''}
              size={36}
            />
          </div>
        </Tooltip>
      ))}

      {extraCount > 0 && (
        <Tooltip
          content={`${visibleCollaborators[0].nickname} 외 ${extraCount}명`}
        >
          <div className="flex flex-col items-center text-xs">
            <div className="Text-white flex size-40 items-center justify-center rounded-full bg-gray-300 text-sm font-semibold">
              +{extraCount}
            </div>
          </div>
        </Tooltip>
      )}
    </div>
  )
}
