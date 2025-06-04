import ThemeToggle from '@components/ThemeToggle'
import Image from 'next/image'

//<초기 설정 안내>

// 이미지 파일에 접근할 때: /images/파일명
// 그 외, alias 설정 참고: alias규칙은 - tsconfig.json파일 내의 "paths": {}에 작성
// 그 외, e.g. import { someUtil } from '@shared/utils';

// pxr 단위 사용
// - 원래 gap-4는 16px인데, pxr적용 시에는 gap-16으로 작성
// - 원래 [300px] -> 300으로 작성

// next-themes 라이트, 다크 모드
// globals.css에 작성한 커스텀 유틸 클래스(@apply) 참고해서, 클래스명 가져다 사용하거나 직접 커스텀

export default function Home() {
  return (
    <>
      <div>
        <h1 className="BG-blue">- test page -</h1>
        <ThemeToggle />
        <div className="relative h-[200px] w-[300px]">
          <Image
            src="/images/logo-light.svg"
            alt="Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
      {/*  <pxr 단위 사용>
      - [300px] -> 300으로 작성하면 브라우저에서는 알아서 rem으로 변환하여 적용됨 */}
      <div className="bg-blue-100 p-[32px] text-[16px]">
        <p>This text should be 16px</p>
      </div>
      <div className="bg-blue-100 p-32 text-16">
        <p>This text should be 1rem → converted 16 to 1rem: using pxr</p>
      </div>
      {/*  <pxr 단위 사용>
      - 원래 gap-4는 16px인데, pxr적용 시에는 gap-16으로 작성*/}
      <div className="gap-16 bg-gray-100 p-4 marker:flex">
        <div className="bg-blue-300 p-4">AAA</div>
        <div className="bg-green-300 p-4">BBB</div>
        <div className="bg-red-300 p-4">CCC</div>
      </div>
    </>
  )
}
