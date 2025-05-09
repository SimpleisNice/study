# CHAPTER12 IDE 기능 사용

**IDE에서 하는 첫 프로그래밍은 초능력을 쓰는 것 같았습니다.**

이 장에서는 VS Code 기본 단축키와 일반적으로 유용하게 사용하는 타입스크립트의 IDE 기능 및 몇가지를 자세히 살펴봄

## 12.1 코드 탐색

코드 탐색을 지원하는 도구를 이용하면 시간을 상당히 단축 할 있음

### 12.1.1 정의 찾기

타입스크립트는 타입 정의 또는 값에 대한 참조에서 시작해 코드의 원래 위치로 다시 이동할 수 있음

- 요청된 이름의 원래 정의된 위치로 즉시 이동: F12
- cmd + 이름 클릭: 정의된 곳으로 이동
- option + F12: 정의를 불러오는 Peek 상자를 불러옴

### 12.1.2 참조 찾기

타입 정의 또는 값이 제공되면, 타입스크립트는 이에 대한 모든 참조 목록 또는 프로젝트에서 사용된 위치를 보여 줄 수 있음

shift + F12

- 확장 가능한 Peek 상자가 나타남
- 해당 타임 정의 또는 값의 참조 목록을 보여 줌

## 12.1.3 구현 찾기

cmd + F12

- 인터페이스와 추상 클래스 메서드를 위해 만들어짐
- 코드에서 인터페이스 또는 추상 메서드의 모든 구현을 찾음

## 12.2 코드 작성

### 12.2.1 이름 완성하기

타입스크립트의 API를 이용하면 동일한 파일에 존재하는 이름을 자동 완성할 수 있음

패키지의 의존성에 대해서도 자동 가져오기(automatic import)를 제공함

### 12.2.2 자동 가져오기 업데이트

VS Code 파일 탐색기를 사용해 파일을 드래그 앤드 드롭하거나 중첩된 폴더 경로로 이름을 바꾸면, VS Code에서 타입스크립트를 사용해 파일 경로를 업데이트하도록 제안함

### 12.2.3 코드 액션

타입스크립트의 많은 IDE 유틸리티는 직접 실행할 수 있는 액션으로 제공됨

코드 액션을 사용하면 import 경로를 계산하거나 일반적인 리팩터링 같은 많은 수작업을 타입스크립트가 수행하도록 지시할 수 있음

cmd + .

- 코드 액션 메뉴를 여는 단축키

F2

- 새 이름을 입력할 수 있는 텍스트 상자가 나타남

## 12.3 오류를 효과적으로 처리하기

IDE 기능을 사용해 타입스크립트 컴파일러 오류를 효과적으로 처리하는 능력을 향상시키면 언어를 훨씬 더 생산적으로 사용할 수 있음

### 12.3.1 언어 서비스 오류

F8

- 오류로 이동하는 단축키

타입스크립트 프로젝트에서 작업하는 동안 터미널에서 타입스크립트 컴파일러 watch 모드로 실행하는 것이 좋음

cmd + 클릭

- 텍스트 커서가 해당 파일의 잘못된 행과 열로 이동

cmd + hover

- 해당 타입 정보를 보여주는 호버 정보가 나타남
