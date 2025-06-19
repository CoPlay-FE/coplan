// 인풋 껍데기
interface Input {
  children: React.ReactNode
  labelName: string
  labelFor: string
  accent?: boolean
}

export default function Input({
  children,
  labelName,
  labelFor,
  accent,
}: Input) {
  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
        <label htmlFor={labelFor}>{labelName}</label>
        {accent && (
          <span className="block pt-6 text-18 leading-none text-[#228DFF]">
            *
          </span>
        )}
      </div>
      {children}
    </div>
  )
}
