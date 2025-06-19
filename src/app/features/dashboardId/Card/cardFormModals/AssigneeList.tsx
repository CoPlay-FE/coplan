import { cn } from '@/app/shared/lib/cn'
const mockData = ['aaa', 'bbb', 'ccc']

interface AssigneeListProps {
  setSelectedAssignee: React.Dispatch<React.SetStateAction<string>>
}
export default function AssigneeList({
  setSelectedAssignee,
}: AssigneeListProps) {
  return (
    <div className="BG-white Border-btn Text-gray absolute left-0 top-full z-10 mt-4 w-full rounded-6 text-14">
      {mockData.map((Assignee, index) => (
        <div
          className={cn(
            'BG-Input-hovered w-full cursor-pointer px-16 py-11 pt-14 placeholder-gray-400 caret-transparent',
            index !== 0 && 'border-t',
          )}
          key={index}
          onClick={() => {
            setSelectedAssignee(Assignee)
            console.log(Assignee)
          }}
        >
          {Assignee}
        </div>
      ))}
    </div>
  )
}
