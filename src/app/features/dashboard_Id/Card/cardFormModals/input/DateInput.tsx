import React, { forwardRef } from 'react'

// DatePicker에 들어갈 커스텀 인풋
const DateInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      inputMode="none"
      readOnly
      className="Input-readOnly w-520"
      id="dueDate"
      placeholder="날짜와 시간을 선택하세요"
    />
  )
})
DateInput.displayName = 'DateInput' // React DevTools에서 익명함수가 아닌, 컴포넌트 이름이 나오게 하려면 displayName을 직접 지정

export default DateInput
