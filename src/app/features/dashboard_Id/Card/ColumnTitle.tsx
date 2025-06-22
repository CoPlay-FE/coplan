export default function ColumnTitle({ title }: { title: string }) {
  return (
    <div className="BG-lightblue flex w-fit items-center gap-6 rounded-16 px-10 py-4">
      <div className="size-6 rounded-25 bg-[#228DFF]"></div>
      <div className="Text-deepblue whitespace-nowrap pb-4 pt-6 text-14 font-medium leading-none">
        {title}
      </div>
    </div>
  )
}
