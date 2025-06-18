import React, { forwardRef } from 'react'

// forwardRef로 ref 전달하기
const DateInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      inputMode="none"
      readOnly
      className="Input-readOnly"
      id="dueDate"
      placeholder="날짜와 시간을 선택하세요"
    />
  )
})
DateInput.displayName = 'DateInput' // 익명 함수로 forwardRef 를 쓰면 이름이 없는 함수가 등록되니까, React DevTools 에서 컴포넌트 이름이 나오게 하려면 displayName 을 직접 지정

export default DateInput
