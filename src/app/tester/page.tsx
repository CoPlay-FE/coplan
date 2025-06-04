import Image from 'next/image'
import ThemeToggle from '@components/ThemeToggle'

//<초기 설정 안내>

// 이미지 파일에 접근할 때: /images/파일명
// 그 외, alias 설정 참고: alias규칙은 - tsconfig.json파일 내의 "paths": {}에 작성
// 그 외, e.g. import { someUtil } from '@shared/utils';
// ㄴ이 부분은 테스트 안 해봐서, 이상 있으면 공유 부탁드림

// pxr 단위 사용
// - 원래 gap-4는 16px인데, pxr적용 시에는 gap-16으로 작성
// - 원래 [300px] -> 300으로 작성

// next-themes 라이트, 다크 모드 안내

export default function Home() {
  return (
    <>
      <div>
        <h1 className="bg_blue">- test page -</h1>
        <ThemeToggle />
        <Image
          src="/images/logo-light.svg"
          alt="Logo"
          width={200}
          height={100}
        />
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
      <div className="flex gap-16 bg-gray-100 p-4">
        <div className="bg-blue-300 p-4">AAA</div>
        <div className="bg-green-300 p-4">BBB</div>
        <div className="bg-red-300 p-4">CCC</div>
      </div>
    </>
  )
}
