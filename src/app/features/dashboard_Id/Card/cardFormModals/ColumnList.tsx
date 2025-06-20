import { ControllerRenderProps } from 'react-hook-form'

import { cn } from '@/app/shared/lib/cn'

import { SimpleColumn, useColumnsStore } from '../../store/useColumnsStore'
import { CardFormData } from '../../type/CardFormData.type'
import ColumnTitle from '../ColumnTitle'

interface ColumnListProps {
  setColumn: (selectedColumn: SimpleColumn) => void
  controlField: ControllerRenderProps<CardFormData, 'columnId'>
}

// ✅ ColumnList 컴포넌트: 컬럼 목록을 보여주는 드롭다운 리스트
// 1. 컬럼 목록을 클릭하면:
//    - setColumn(column) 실행 → 선택된 담당자 객체를 부모 컴포넌트 하에 관리 (ex. UI에서 닉네임 표시용)
//    - controlField.onChange(column.columnId) 실행 → react-hook-form에 columnId 값을 전달 (form 제출에는 Id 데이터만 전달함)

export default function ColumnList({
  setColumn,
  controlField,
}: ColumnListProps) {
  const { ColumnsInDashboard } = useColumnsStore() // 컬럼 목록 데이터는 store에서 불러옴

  return (
    <div className="BG-white Border-btn absolute left-0 top-full z-10 mt-4 w-full rounded-6">
      {ColumnsInDashboard.map((column, index) => (
        <div
          className={cn(
            'BG-Input-hovered w-full cursor-pointer px-16 py-11 pt-14 placeholder-gray-400 caret-transparent',
            index !== 0 && 'border-t',
          )}
          key={column.columnId}
          onClick={() => {
            setColumn(column) // 담당자 업데이트
            controlField.onChange(column.columnId) // controlField: 폼의 'columnId' 필드와 연결되어 있음. .columnId 값으로 업데이트
          }}
        >
          <ColumnTitle title={column.columnTitle} />
        </div>
      ))}
    </div>
  )
}
