'use client'

import { cn } from '@lib/cn'
import Image from 'next/image'
import { forwardRef, useState } from 'react'

import { InputProps } from '@/types/input.type'

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  function PasswordInput(props, ref) {
    const {
      labelName,
      name,
      type = 'password',
      placeholder,
      hasError,
      errorMessage,
      autoComplete,
      ...rest
    } = props

    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'
    const inputType = isPassword && showPassword ? 'text' : 'password'

    return (
      <div className="flex flex-col gap-8">
        <label htmlFor={name} className="Text-black text-base font-normal">
          {labelName}
        </label>

        <div className="relative w-full">
          <input
            id={name}
            className={cn(
              'Text-black h-50 w-full rounded-8 px-16 py-12 text-base font-normal',
              hasError ? 'Border-error' : 'Border-btn',
              props.readOnly && 'Text-gray cursor-default',
            )}
            type={inputType}
            placeholder={placeholder}
            name={name}
            autoComplete={autoComplete}
            {...rest}
            ref={ref}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-16 top-1/2 translate-y-[-50%]"
          >
            <Image
              src={`/images/visibility-${showPassword ? 'on' : 'off'}.svg`}
              alt={showPassword ? '비밀번호 보기' : '비밀번호 숨기기'}
              width={24}
              height={24}
            />
          </button>
        </div>

        {hasError && errorMessage && (
          <p className="Text-error text-sm font-normal">{errorMessage}</p>
        )}
      </div>
    )
  },
)

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput
