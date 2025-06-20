import Image from 'next/image'

export default function PointSection() {
  return (
    <>
      <section className="mobileS:pl-0 mobileS:pt-60 BG-section tabletS:flex-col tabletS:max-w-664 tabletS:gap-224 mobileS:flex-col mobileS:max-w-343 mobileS:gap-194 mb-59 flex h-auto w-full max-w-1200 justify-between rounded-8 pl-60 pt-103">
        <div className="mobileS:self-center mobileS:text-center flex flex-col gap-100 self-start text-left">
          <p className="Text-gray text-18 font-medium">Point 1</p>
          <h2 className="mobileS:text-36 whitespace-nowrap text-48 font-bold">
            일의 <span className="Text-violet">우선순위</span>를 <br />
            관리하세요
          </h2>
        </div>

        <div className="mobileS:pl-47 flex self-end overflow-hidden rounded-8">
          <div className="mobileS:w-296 mobileS:h-248 relative h-497 w-594">
            <Image src="/images/dashboard.png" alt="대시보드" fill />
          </div>
        </div>
      </section>
      <section className="tabletS:pt-63 mobileS:pl-0 mobileS:pt-60 BG-section tabletS:flex-col tabletS:max-w-664 tabletS:gap-224 mobileS:flex-col mobileS:max-w-343 mobileS:gap-194 tabletS:pl-0 justify-centse mb-59 flex h-auto w-full max-w-1200 gap-100 rounded-8 pl-60 pt-103">
        <div className="mobileS:order-1 tabletS:pl-60 mobileS:self-center mobileS:text-center order-2 flex flex-col gap-100 self-start text-left">
          <p className="Text-gray text-18 font-medium">Point 2</p>
          <h2 className="mobileS:text-36 whitespace-nowrap text-48 font-bold">
            해야 <span className="Text-violet">할 일</span>을 <br />
            관리하세요
          </h2>
        </div>

        <div className="tabletS:order-2 order-1 flex items-center justify-center overflow-hidden rounded-8">
          <div className="mobileS:w-217 mobileS:h-250 tabletS:w-360 tabletS:h-415 relative h-502 w-436">
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
