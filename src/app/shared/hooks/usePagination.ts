import { useMemo, useState } from 'react'

export function usePagination<T>(items: T[], pageSize: number) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(items.length / pageSize)

  const startIndex = (currentPage - 1) * pageSize

  const currentItems = useMemo(() => {
    return items.slice(startIndex, startIndex + pageSize)
  }, [items, startIndex, pageSize])

  function handlePrev() {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  function handleNext() {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  return {
    currentPage,
    totalPages,
    currentItems,
    handlePrev,
    handleNext,
  }
}
