# Banbok

![Banbok img](https://github.com/user-attachments/assets/8ea93104-f71b-457a-bc48-00fa5addab3b)

해결한 코딩 테스트 링크를 등록하여 알림을 일정주기대로 받아 반복 학습을 할 수 있도록 도와주는 웹 사이트입니다.

배포 주소 : https://banbok.vercel.app/  
피그마 주소 : https://www.figma.com/design/gXeeN0mnDPOViAcoA4mQU3/banbok?node-id=6-3&t=r7KwQ9gSiT5HCE0p-0

### 🔐 테스트 계정

서버 배포가 안되어 현재 로그인은 진행 불가능한 상태입니다. FE 코드와 [BE 코드](https://github.com/Banbok/BE)를 내려 받아 도커 컨테이너를 실행한 뒤 네이버 OAuth 로그인을 진행해야합니다.

#### 도커 실행 방법

```
도커 생성
docker-compose up --build -d

도커 닫기

docker-compose down -v


데이터 확인 방법 mysql 컨테이너로 들어간 뒤 Exec에서

mysql -u banbok -p 입력 후

패스워드(banbok)를 입력하시면 됩니다.
```

## 🔨 사용 기술

<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=FFFFFF"/>
<img src="https://img.shields.io/badge/TypeScript-orange?style=flat&logo=TypeScript&logoColor=FFFFFF"/>
<img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat&logo=Tailwind CSS&logoColor=FFFFFF"/>
<img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=Next.js&logoColor=FFFFFF"/>
<img src="https://img.shields.io/badge/Zustand-764ABC?style=flat&logo=Zustand&logoColor=FFFFFF"/>
<img src="https://img.shields.io/badge/API-0000FF?style=flat&logo=Backendless&logoColor=FFFFFF"/>
<img src="https://img.shields.io/badge/Vercel-000000?style=flat&logo=Vercel&logoColor=FFFFFF"/>

## ✨ 구현 기능 및 시연

### 홈화면

![홈화면](https://github.com/user-attachments/assets/a7c884f3-7096-446a-8e20-7718478604ae)

### 로그인

![로그인](https://github.com/user-attachments/assets/0a2af36f-4d57-41af-860c-c041f7638c9b)

### 로그아웃

![로그아웃](https://github.com/user-attachments/assets/e38d05a1-5277-4379-811c-666699774240)

### Web Speech API 기반 음성 제어 기능

![Web Speech API 기반 음성 제어 기능](https://github.com/user-attachments/assets/70cf5ca0-204e-4d40-a232-e0c3571e00c9)

### 뽀모도로 타이머

![뽀모도로 타이머](https://github.com/user-attachments/assets/8a8316f2-2770-45f7-ac00-7ce6f083f11a)

## 📦 폴더 구조

```
app/
├── components/ # 재사용 가능한 컴포넌트
│ ├── Button/ # 버튼 관련 컴포넌트
│ ├── Header/ # 헤더 관련 컴포넌트
│ ├── Timer/ # 뽀모도로 타이머 컴포넌트
│ └── sections/ # 페이지 섹션 컴포넌트
│
├── hooks/ # 커스텀 훅
│ └── useScrollPosition.ts
│
├── store/ # Zustand 상태 관리
│ ├── authStore.ts # 인증 관련 상태
│ └── voiceCommands.ts # 음성 명령 관련 상태
│
├── type/ # TypeScript 타입 정의
│ ├── crawler.type.ts
│ ├── sectionprops.type.ts
│ └── userInfo.type.ts
│
├── api/ # API 라우트
│ └── scrape/ # 크롤링 관련 API
│
├── utils/ # 유틸리티 함수
│ └── crawlers/ # 크롤러 관련 유틸리티
│
├── (route)/ # 페이지 라우트
│ ├── login/ # 로그인 페이지
│ └── profile/ # 프로필 페이지
│
├── globals.css # 전역 스타일
├── layout.tsx # 루트 레이아웃
└── page.tsx # 메인 페이지
```

## 🔥 트러블 슈팅

<details>
 <summary> 로그인 상태 확인 전 잘못된 리다이렉션 문제 해결 </summary>

### 1. 문제 상황

로그인한 유저가 프로필 페이지로 이동했을 때, /login으로 리다이렉션되는 현상이 발생했습니다. 이는 isLoading의 초기값을 false로 설정했기 때문에, useEffect에서 fetchUser()가 실행되기 전에 로그인되지 않은 상태로 잘못 판단하여 리다이렉션이 발생한 것이 원인이었습니다.

#### 해결 방법

클라이언트 상태가 hydrate되기 전에는 아무런 판단도 하지 않도록 하기 위해, hasHydrated라는 플래그를 추가하여 클라이언트 상태가 완전히 초기화되었는지를 명확히 구분했습니다. 이로써 fetchUser()가 완료되기 전에는 렌더링이나 리다이렉션이 발생하지 않도록 안전장치를 추가했습니다.

#### 개선 효과

클라이언트 상태가 hydrate되기 전에는 판단을 보류하여 잘못된 리다이렉션을 방지할 수 있었습니다.
로그인 여부 판단이 fetchUser() 완료 이후에만 실행되도록 제어함으로써 정확한 유저 상태 반영이 가능해졌습니다.
초기 렌더링 시 플래시나 깜빡임 없이, 더 안정적인 사용자 경험을 제공할 수 있게 되었습니다.

</details>

<details>
<summary> 웹과 앱에 따른 반응형 구현 </summary>

### 2. 문제 상황

반응형 구현 과정 중에 뽀모도로 타이머의 css 디자인을 모바일 버전을 추가해서 넣어줬다. 그 과정에서 가로모드에도 해당 디자인을 추가해줬는데 width 값을 통해 css를 넣어주는 방법을 사용을 하니 데스크탑 버전에서 화면을 최소에서 최대로 늘릴 때 모바일 -> 데탑 -> 모바일 이렇게 css가 구성되는 오류가 발생하였습니다. 하지만 저는 최대 width일 때 데탑 전용 뽀모도로 타이머를 표현하고 싶었습니다.

#### 해결 방법

모바일 웹 반응형구현 중 가로모드 활성화를 했는데 width에 따라 짤리는걸 방지하기 위해 width 조건이 아닌 heigth 조건을 가로모드와 함께 사용하여 수정함

</details>
