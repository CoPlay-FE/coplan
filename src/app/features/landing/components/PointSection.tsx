import Image from 'next/image'

export default function PointSection() {
  return (
    <>
      <section className="mobile-wide:pl-0 mobile-wide:pt-60 BG-section tablet-wide:flex-col tablet-wide:max-w-664 tablet-wide:gap-224 mobile-wide:flex-col mobile-wide:max-w-343 mobile-wide:gap-194 mb-59 flex h-auto w-full max-w-1200 justify-between rounded-8 pl-60 pt-103">
        <div className="mobile-wide:self-center mobile-wide:text-center flex flex-col gap-100 self-start text-left">
          <p className="Text-gray text-18 font-medium">Point 1</p>
          <h2 className="mobile-wide:text-36 whitespace-nowrap text-48 font-bold">
            일의 <span className="Text-violet">우선순위</span>를 <br />
            관리하세요
          </h2>
        </div>

        <div className="mobile-wide:pl-47 flex self-end overflow-hidden rounded-8">
          <div className="mobile-wide:w-296 mobile-wide:h-248 relative h-497 w-594">
            <Image src="/images/dashboard.png" alt="대시보드" fill />
          </div>
        </div>
      </section>
      <section className="tablet-wide:pt-63 mobile-wide:pl-0 mobile-wide:pt-60 BG-section tablet-wide:flex-col tablet-wide:max-w-664 tablet-wide:gap-224 mobile-wide:flex-col mobile-wide:max-w-343 mobile-wide:gap-194 tablet-wide:pl-0 justify-centse mb-59 flex h-auto w-full max-w-1200 gap-100 rounded-8 pl-60 pt-103">
        <div className="mobile-wide:order-1 tablet-wide:pl-60 mobile-wide:self-center mobile-wide:text-center order-2 flex flex-col gap-100 self-start text-left">
          <p className="Text-gray text-18 font-medium">Point 2</p>
          <h2 className="mobile-wide:text-36 whitespace-nowrap text-48 font-bold">
            해야 <span className="Text-violet">할 일</span>을 <br />
            관리하세요
          </h2>
        </div>

        <div className="tablet-wide:order-2 order-1 flex items-center justify-center overflow-hidden rounded-8">
          <div className="mobile-wide:w-217 mobile-wide:h-250 tablet-wide:w-360 tablet-wide:h-415 relative h-502 w-436">
            <Image
              src="/images/todomodal.svg"
              alt="대시보드"
              fill
              className="object-cover object-top"
            />
          </div>
        </div>
      </section>
    </>
  )
}
