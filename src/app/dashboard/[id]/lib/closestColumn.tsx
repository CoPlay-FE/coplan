// using in handleTouchEnd()
// 가장 가까운 column 요소가 타겟 컬럼임
export function closestColumn(e: React.TouchEvent) {
  const touch = e.changedTouches?.[0]
  const touchX = touch.clientX
  const touchY = touch.clientY
  const elementBelow = document.elementFromPoint(touchX, touchY)
  const columnEl = elementBelow?.closest(
    '[data-column-id]',
  ) as HTMLElement | null
  return columnEl
}
