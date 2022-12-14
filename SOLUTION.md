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


<br/>
<br/>

## 커밋2: 리스트 추가 버튼 작업 및 상태관리 recoil setting
----
*1. mui 설치: icon*
```
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
```

*2. 상태관리 recoil 라이브러리 setting*
```
npm install recoil
```

*3. 리스트 추가 버튼 작업*

*4. 리스트 컴포넌트 생성*

## 커밋3: 컴포넌트 폴더구조 잡기 및 전체적인 스타일링 작업
----
*1. recoil-persist 설치: 새로고침 해도 데이터 남아있게 관리*
```
npm install recoil-persist
```

*2. 컴포넌트 폴더 구조 잡기: List, Card, ListCreator 컴포넌트 생성*

*3. 전체적인 css 스타일링 작업*

## 커밋 4: 코드 리펙토링 및 칸반 컬럼 작업 완료
----
*1. recoil 상태관리: atom family로 변경*

*2. 컴포넌트 폴더구조 및 네이밍 재변경: Column, ColumnCreator, Item*

*3. 칸반 컬럼 생성, 제목 수정, 삭제 기능 추가, 컬럼 간 드래그 기능 추가*

## 커밋 5: 디폴트 컬럼 2개 설정 및 아이템 추가 수정 삭제 기능 작업 완료 
----
*1. 디폴트 컬럼 2개 설정*

*2. 아이템 추가 수정 삭제 기능 작업 완료*

*3. 아이템 드래그 기능 작업 완료(같은 컬럼 내)*

## 커밋 6: 드래깅 기능 작업 완료 
----
*1. 소스코드 정리: 불필요 코드 삭제, 주석 추가 등*

*2. 상태관리 변경: for 드래깅 기능*

*3. 드래깅 기능 작업 완료*







