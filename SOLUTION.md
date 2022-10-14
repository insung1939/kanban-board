# 문제 해결 과정
(커밋 단위로 어떻게 문제를 해결해 나가는지 작성했습니다.)                    
<br/>
<br/>
## 커밋1: 프로젝트 시작 및 세팅
----
*1. 리액트 타입스크립트 프로젝트 생성*
```
npx create-react-app [프로젝트 명] --template typescript
```

*2. 스타일드 컴포넌트 설치, 스타일 초기화*

=>  스타일 setting(global-style.ts: 전역 스타일 파일, theme.ts: 프로젝트에 쓰이는 색상 모음)
```
npm i styled-components && npm i -D @types/styled-components
npm i styled-reset
```

*3. 불필요한 파일 및 소스코드 삭제*

*4. App.tsx, index.tsx 전체적인 틀 잡기 작업*