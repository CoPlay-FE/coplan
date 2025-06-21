import Image from 'next/image'

export default function PointSection() {
  return (
    <>
      <section className="BG-section mb-59 flex h-auto w-full max-w-1200 justify-between rounded-8 pl-60 pt-103 mobile-wide:max-w-343 mobile-wide:flex-col mobile-wide:gap-194 mobile-wide:pl-0 mobile-wide:pt-60 tablet-wide:max-w-664 tablet-wide:flex-col tablet-wide:gap-224">
        <div className="flex flex-col gap-100 self-start text-left mobile-wide:self-center mobile-wide:text-center">
          <p className="Text-gray text-18 font-medium">Point 1</p>
          <h2 className="whitespace-nowrap text-48 font-bold mobile-wide:text-36">
            일의 <span className="Text-violet">우선순위</span>를 <br />
            관리하세요
          </h2>
        </div>

        <div className="flex self-end overflow-hidden rounded-8 mobile-wide:pl-47">
          <div className="relative h-497 w-594 mobile-wide:h-248 mobile-wide:w-296">
            <Image src="/images/dashboard.png" alt="대시보드" fill />
          </div>
        </div>
      </section>
      <section className="BG-section mb-59 flex h-auto w-full max-w-1200 justify-center gap-100 rounded-8 pl-60 pt-103 mobile-wide:max-w-343 mobile-wide:flex-col mobile-wide:gap-194 mobile-wide:pl-0 mobile-wide:pt-60 tablet-wide:max-w-664 tablet-wide:flex-col tablet-wide:gap-224 tablet-wide:pl-0 tablet-wide:pt-63">
        <div className="order-2 flex flex-col gap-100 self-start text-left mobile-wide:order-1 mobile-wide:self-center mobile-wide:text-center tablet-wide:pl-60">
          <p className="Text-gray text-18 font-medium">Point 2</p>
          <h2 className="whitespace-nowrap text-48 font-bold mobile-wide:text-36">
            해야 <span className="Text-violet">할 일</span>을 <br />
            관리하세요
          </h2>
        </div>

        <div className="order-1 flex items-center justify-center overflow-hidden rounded-t-8 tablet-wide:order-2">
          <div className="relative h-502 w-436 mobile-wide:h-250 mobile-wide:w-217 tablet-wide:h-415 tablet-wide:w-360">
            <Image
              src="/images/todomodal.svg"
              alt="할 일 모달"
              fill
              className="object-cover object-top"
            />
          </div>
        </div>
      </section>
    </>
  )
}
