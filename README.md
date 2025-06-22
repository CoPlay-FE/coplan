# <img src="https://github.com/user-attachments/assets/28cc58ac-93bf-43f8-bee3-c0d912714813" width="36" height="36" /> CoPlan - 협업을 위한 일정/태스크 관리 서비스

![favicon](https://github.com/user-attachments/assets/432cf916-abef-4338-805f-f0b2f2cdee5c)


- CoPlan은 협업에 특화된 일정 및 할 일 관리 서비스입니다.  
- 팀 단위의 대시보드, 실시간 초대, 드래그앤드롭 기반의 직관적인 카드 이동 등  
- Taskify를 벤치마킹하여 협업에 최적화된 경험을 제공합니다.

[배포 링크](https://coplan.work) | [발표자료ppt](https://www.figma.com/slides/Duu7NKWqOWpNlgqOlbqXwl/CoPlanPPT?node-id=2-40&t=riojR8QiqRYQG5f7-0)

---

## 🖼️ 데모
- 로그인 / 회원가입 화면
  
- 대시보드 생성 / 수정

- 카드 드래그 앤 드롭

- 협업자 초대 및 실시간 반영

---

## 🔧 기술 스택

| 구분 | 사용 기술 |
|------|-----------|
| 프레임워크 | Next.js 14 (App Router) |
| 언어 | TypeScript |
| 상태관리 | Zustand |
| 서버 상태 | Tanstack Query |
| 스타일 | TailwindCSS, Dark Mode (`next-themes`) |
| API 통신 | Axios |
| 인터랙션 | dnd-kit |
| UI / UX | react-hook-form, sonner (Toast) |
| 인프라 | AWS EC2, Docker, Nginx |

---

## 📁 폴더 구조
```yaml
src/
├── app/ # 페이지 라우트
│ ├── (auth)/signin/ # 로그인
│ ├── dashboard/ # 대시보드
│ └── api/ # Next API Routes
├── features/ # 기능 모듈 단위 관리
│ ├── auth/
│ ├── dashboard/
│ └── board/
├── shared/ # 공통 컴포넌트, 훅, 스토어 등
│ ├── components/
│ ├── lib/
│ ├── hooks/
│ └── store/
```

- Colocation 방식 적용, 기능별 디렉토리 분리로 유지보수 용이성 확보

---

## 🧩 주요 기능

- ✅ 회원가입 / 로그인 (JWT 기반 인증)
- ✅ 대시보드 생성 / 수정 / 삭제
- ✅ 컬럼 및 카드 생성 / 수정 / 삭제
- ✅ 카드 드래그 앤 드롭
- ✅ 협업자 초대 및 표시
- ✅ 다크모드 지원
- ✅ 토스트 알림

---

## 👥 팀원 및 역할 (Team: CoPlay)

| 프로필 | 이름 | 역할 |
|--------|------|------|
| <img src="https://github.com/dkslel1225.png" width="32"/> | 전지윤 (팀장) | 대시보드 상세, 할 일 카드 모달, 다크모드, 페이지네이션 |
| <img src="https://github.com/LeeCh0129.png" width="32"/> | 이찬호 (팀원) | 인프라 구축, 마이 대시보드, 대시보드/컬럼 생성 모달, 사이드바 |
| <img src="https://github.com/yuj2n.png" width="32"/> | 전유진 (팀원) | 대시보드 수정 페이지, 초대 모달, 공통 헤더, 프로필 이미지, 토스트 |
| <img src="https://github.com/Insung-Jo.png" width="32"/> | 조인성 (팀원) | 로그인/회원가입, 메인 랜딩, 계정 관리, 가입 완료/에러 모달 |


---

## 🗓️ 프로젝트 기간

- **기획 및 설계**: 2025.06.02 ~ 2025.06.10
- **1차 중간 점검**: 2025.06.11
- **2차 중간 점검**: 2025.06.16
- **최종 제출**: 2025.06.24

---

## 🛠️ 설치 및 실행

```bash
# 1. 레포지토리 클론
git clone https://github.com/your-team/coplan.git
cd coplan

# 2. 패키지 설치
npm install

# 3. 개발 서버 실행
npm run dev
.env 파일에 API 주소 설정 필요
```env
NEXT_PUBLIC_API_URL=https://sp-taskify-api.vercel.app/
NEXT_PUBLIC_TEAM_ID=15-2
```

---

## 📄 커밋 & 브랜치 규칙
브랜치 규칙: git flow
```bash
main
└── develop
	└── feature/공통 컴포넌트
	└── feature/페이지
		└── feature/페이지-컴포넌트
```

```bash
feature/login, feature/dashboard-edit, fix/signup-error 등
커밋 컨벤션:
✨ feat: 비밀번호 재설정 기능 구현
```

---

## 💻 프로젝트 리소스
- [기획안](https://www.notion.so/_-Taskify-1fc6fd228e8d812ba53be0c85e3c9e38?pvs=21) 
- [디자인(Figma)](https://www.figma.com/design/dcbwJF5AMJcnlf2aaYb659/CoPlan) 
- [API 명세](https://sp-taskify-api.vercel.app/docs/#/) 
- [프로젝트 관련 문서(Notion)](https://www.notion.so/B-1fec90b4efb6805d80f2d54085755289)

---

## 💭 회고
[팀 회고](https://www.figma.com/board/M6hy1K7K1XqnC9Kk6O9pkl/%ED%9A%8C%EA%B3%A0-%ED%85%9C%ED%94%8C%EB%A6%BF--Copy-?node-id=0-1&p=f&t=HCz53CXFNyAXprKC-0)
