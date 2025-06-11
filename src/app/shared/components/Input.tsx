'use clinet'
import Image from 'next/image'
import { forwardRef, InputHTMLAttributes, useState } from 'react'

import { cn } from '../lib/cn'

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelName: string
  type?: React.HTMLInputTypeAttribute
  placeText?: string
  hasError?: boolean
  errorMessage?: string
}

const Input = forwardRef<HTMLInputElement, CustomInputProps>(
  function Input(props, ref) {
    const {
      labelName,
      type = 'text',
      placeText,
      hasError,
      errorMessage,
      ...rest
    } = props

    const id = props.name
    const [showPassword, setShowPassword] = useState(false)

    const isPassword = type === 'password'
    const inputType = isPassword && showPassword ? 'text' : type

    return (
      <div className="flex flex-col gap-8">
        <label htmlFor={id} className="Text-black text-base font-normal">
          {labelName}
        </label>

        <div className="relative w-full">
          <input
            id={id}
            className={cn(
              'Border-btn Text-black h-50 w-full rounded-8 px-16 py-12 text-base font-normal',
              hasError && 'Border-error border',
            )}
            type={inputType}
            placeholder={placeText}
            ref={ref}
            {...rest}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-16 top-1/4"
            >
              <Image
                src={`/images/visibility-${showPassword ? 'on' : 'off'}.svg`}
                alt={showPassword ? '비밀번호 보기' : '비밀번호 숨기기'}
                width={24}
                height={24}
              />
            </button>
          )}
        </div>

        {hasError && errorMessage && (
          <p className="Text-error text-sm font-normal">{errorMessage}</p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export default Input
