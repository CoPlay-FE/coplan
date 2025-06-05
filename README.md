<<<<<<< HEAD
# Coplan

## 프로젝트 시작하기 전에

- develop에서 분기하는 feature 브랜치는 각자 직접 생성하여 작업
- 폴더구조는 colocation 방식을 따름
- 라이브러리 사용 시 설치된 버전 미리 참고하기: package.json
- alias, 커스텀 유틸 클래스는 자율적으로 작성 및 사용하며, 공용으로 사용하는 경로나 클래스를 수정한다면 미리 알려주기

## 규칙

### 1. 함수 선언식 사용

```tsx
export default function Navbar() {}
```

### 2. map()의 파라미터

- item이 아닌 배열명 기준으로 작성
  - ~~cards.map(item) (X)~~
  - cards.map(card) (O)

### 3. JSDoc 작성

유틸 함수나 공통 컴포넌트 관련하여 다른 팀원들이 사용하는 경우 이에 대한 설명 적어주기

```tsx
/**
 * 두 숫자를 더한 값을 반환하는 함수입니다.
 *
 * @param {number} a - 첫 번째 숫자
 * @param {number} b - 두 번째 숫자
 * @returns {number} 두 숫자의 합
 *
 * @example
 * add(5, 7); // 12
 */
function add(a, b) {
  return a + b
}
```

## 기타 참고사항

### 1. 파일 경로

- 이미지 파일에 접근: /images/파일명
- 그 외, alias 활용: tsconfig.json파일 내의 "paths": {}에 작성 가능
  - e.g. import { someUtil } from '@shared/utils';

### 2. pxr 단위 사용

- 원래 gap-4는 16px인데, pxr적용 시에는 gap-16으로 작성
- 원래 [300px] -> 300으로 작성

### 3. next-themes 라이트, 다크 모드

- globals.css에 작성한 커스텀 유틸 클래스(@apply) 참고하여, 클래스명 가져다 사용하거나 직접 커스텀 가능
=======
# coplan
>>>>>>> main
