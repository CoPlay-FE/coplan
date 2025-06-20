import { Avatar } from '@/app/shared/components/common/Avatar'

import { Assignee } from '../type/Card.type'

export default function MyAssignee({ assignee }: { assignee: Assignee }) {
  return (
    <div className="flex items-center gap-6">
      <Avatar
        size={26}
        name={assignee.nickname}
        imageUrl={assignee.profileImageUrl}
      />
      <span className="regular Text-black block pt-1 text-16 leading-none">
        {assignee.nickname}
      </span>
    </div>
  )
}
