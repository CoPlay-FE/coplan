'use client'

import useColumns from '@/app/api/useColumns'

import Column from './Column/Column'
export default function DashboardID() {
  const dashboard = 15120
  const { data: columns, isLoading, error } = useColumns(dashboard)
  if (isLoading) return <p>loading...</p>
  if (error) return <p>error...{error.message}</p>

  return (
    <>
      <div className="fixed left-0 h-1080 w-300 bg-gray-100">사이드바</div>
      <div className="ml-300">
        <div className="flex">
          {columns?.map((column) => <Column key={column.id} column={column} />)}
        </div>
      </div>
    </>
  )
}
