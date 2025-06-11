'use client'

import Image from 'next/image'
import { forwardRef, InputHTMLAttributes, useState } from 'react'

import { cn } from '../lib/cn'

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelName: string
  name: string
  type?: React.HTMLInputTypeAttribute
  autoComplete?: string
  placeholder?: string
  hasError?: boolean
  errorMessage?: string
}

const Input = forwardRef<HTMLInputElement, CustomInputProps>(
  function Input(props, ref) {
    const {
      labelName,
      name,
      type = 'text',
      placeholder,
      hasError,
      errorMessage,
      autoComplete,
      ...rest
    } = props

    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'
    const inputType = isPassword && showPassword ? 'text' : type

    return (
      <div className="flex flex-col gap-8">
        <label htmlFor={name} className="Text-black text-base font-normal">
          {labelName}
        </label>

        {isPassword ? (
          <div className="relative w-full">
            <input
              id={name}
              className={cn(
                'Text-black h-50 w-full rounded-8 px-16 py-12 text-base font-normal',
                hasError ? 'Border-error' : 'Border-btn',
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
        ) : (
          <input
            id={name}
            className={cn(
              'Text-black h-50 w-full rounded-8 px-16 py-12 text-base font-normal',
              hasError ? 'Border-error' : 'Border-btn',
            )}
            type={inputType}
            placeholder={placeholder}
            name={name}
            autoComplete={autoComplete}
            {...rest}
            ref={ref}
          />
        )}

        {hasError && errorMessage && (
          <p className="Text-error text-sm font-normal">{errorMessage}</p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export default Input
