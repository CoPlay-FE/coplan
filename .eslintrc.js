module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // TypeScript 문법을 ESLint가 이해하게 해주는 파서.
  parserOptions: {
    ecmaVersion: 'latest', // 최신 ECMAScript 문법을 사용(ES2021 이상..)
    sourceType: 'module', // ES 모듈(import/export) 문법 사용을 명시
    ecmaFeatures: {
      jsx: true, // JSX 문법을 사용을 허용
    },
    project: './tsconfig.json', // 타입 기반 규칙을 확실하게 활성화하는 트리거(전체 TypeScript 분석 기준 설정)
  },
  env: {
    browser: true, // 브라우저 전역 객체(window 등)를 사용하겠다는 의미.
    es2021: true, // 해당 환경의 글로벌 변수와 기본적인 실행 컨텍스트를 설정해주는 옵션(e.g.Promise 인지함)
    node: true, // Node.js 환경에서 실행되는 코드임을 명시. --> Node.js 전역 변수 사용 가능
  },
  extends: [
    // 타입스크립트, 리액트, 넥스트 전용 규칙 적용
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended', // Hook은 반드시 컴포넌트 최상단에서만 사용하도록 함. & 의존성 배열 누락 경고 등
    'plugin:@next/next/core-web-vitals',
    'plugin:prettier/recommended', // Prettier 연동
    'plugin:tailwindcss/recommended', //추가해봄........................
  ],
  plugins: [
    // 규칙 처리용 플러그인.
    '@typescript-eslint',
    'react',
    'react-hooks',
    'prettier',
    'import',
    'tailwindcss',
    'simple-import-sort', // ✅ import 정렬
  ],
  rules: {
    'no-console': 'warn', // console.log 사용 시 경고만. 개발 중 허용하되 남기지 않도록.
    'prefer-const': 'warn', // let → const 가능하면 const 사용 권장.
    'func-style': ['warn', 'declaration', { allowArrowFunctions: true }], // 함수 선언식 허용, 화살표 함수 허용, 함수 표현식 경고
    // 함수 표현식도 경고 없이 허용하고 싶다면: 'func-style': 'off' 로 수정해서 사용 가능
    // 일단 저희는 함수 선언식을 기본으로 사용하기로 했으니, 경고정도는 걸어두는거로 합시당

    // 'no-unused-vars': 선언만 해놓고 사용하지 않은 변수나 함수 인자 등을 잡아냄. *JS용은 비활성화 하고, TS버전으로 교체함
    // argsIgnorePattern: '^_': 사용하지 않는 매개변수는 _로 시작하면 허용 (예: (_, index) => ...)
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'prettier/prettier': 'warn', // Prettier 경고 (설정은 .prettierrc 따름)

    'simple-import-sort/imports': 'warn', // ✅
    'simple-import-sort/exports': 'warn', // ✅

    'import/no-anonymous-default-export': [
      // 익명 default export를 import에서 제한해둠
      'error',
      {
        allowArrowFunction: true, // export default () => {} 는 허용 // 저렇게 작성하는 경우가 거의 없었던거 같지만..
        allowAnonymousFunction: false,
        allowAnonymousClass: false,
      },
    ],

    // TailwindCSS 관련
    // 'tailwindcss/classnames-order': 정렬검사는, 자동 정렬 사용한다면 생략.
    'tailwindcss/no-contradicting-classname': 'warn', // 모순되는 Tailwind CSS 클래스가 같이 쓰인 경우 경고 (예: block + hidden)
    'tailwindcss/no-unknown-classname': 'warn', // Tailwind에 정의되지 않은 클래스명 사용 경고
    'tailwindcss/enforces-shorthand': 'warn', // 축약 가능한 클래스 축약 여부 검사 (경고)

    //Next.js 12부터는 JSX 사용할 때 import React from 'react'를 명시적으로 쓸 필요가 없다고 함
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    react: {
      version: 'detect', // 일단 리액트 버전 자동 감지하는거로 // 실제 사용: '18.2.0' ??
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // import 시 확장자 생략 가능하게
      },
    },
    tailwindcss: {
      config: './tailwind.config.js', // Tailwind CSS 설정 파일 경로 (커스터마이징 필요 시)
      whitelist: ['html', 'js', 'jsx', 'ts', 'tsx'], // Tailwind 클래스 검색할 확장자 지정. 정확한 분석을 위함
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: './tsconfig.json', // 특정 파일에서 타입 분석 보장. 일부 규칙은 이 설정 없으면 작동 안 한다고 함
      },
    },
  ],
}
