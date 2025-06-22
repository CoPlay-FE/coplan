import { InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelName: string
  name: string
  type?: React.HTMLInputTypeAttribute
  autoComplete?: string
  placeholder?: string
  hasError?: boolean
  errorMessage?: string
}
