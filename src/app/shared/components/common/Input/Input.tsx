'use client'

import { cn } from '@lib/cn'
import { forwardRef } from 'react'

import { InputProps } from '@/types/input.type'

const Input = forwardRef<HTMLInputElement, InputProps>(
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

    return (
      <div className="flex flex-col gap-8">
        <label htmlFor={name} className="Text-black text-base font-normal">
          {labelName}
        </label>

        <input
          id={name}
          className={cn(
            'Text-black h-50 w-full rounded-8 px-16 py-12 text-base font-normal',
            hasError ? 'Border-error' : 'Border-btn',
            props.readOnly && 'Text-gray cursor-default',
          )}
          type={type}
          placeholder={placeholder}
          name={name}
          autoComplete={autoComplete}
          {...rest}
          ref={ref}
        />

        {hasError && errorMessage && (
          <p className="Text-error text-sm font-normal">{errorMessage}</p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export default Input
