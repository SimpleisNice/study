# 1장 리액트 프로젝트 시작하기

## 1.1 리액트란 무엇인가?
리액트는 페이스북에서 개발하고 관리하는 UI 라이브러리

리액트와 같은 라이브러리 혹은 프레임워크를 사용하는 이유?
- UI 를 자동으로 업데이트해 준다는 점
- 리액트의 장점은 가상 돔(virtual dom)을 통해 UI를 빠르게 업데이트 한다는 점
- 가상 돔은 이전 UI 상태를 메모리에 유지해서, 변경될 UI의 최소 집합을 계산하는 기술
- 가상 돔 덕분에 불필요한 UI 업데이트는 줄고, 성능은 좋아진다.

리액트는 함수형 프로그래밍을 적극적으로 활용한다는 특징이 있다.
- 코드에서 순수 함수와 불변 변수를 적극적으로 사용하면 복잡도가 낮아지고, 찾기 힘든 버그가 발생할 확률이 줄어든다.
- render 함수는 순수 함수로 작성
- state 불변 변수로 관리 

## 1.2 리액트 개발 환경 직접 구축하기

### 1.2.1 Hello World 페이지 만들기
#### 아래의 파일 다운로드
```
(1) https://unpkg.com/react@16/umd/react.development.js
(2) https://unpkg.com/react@16/umd/react.production.min.js
(3) https://unpkg.com/react-dom@16/umd/react-dom.development.js
(4) https://unpkg.com/react-dom@16/umd/react-dom.production.min.js
```
- 1, 3 개발 환경에서 사용되는 파일
- 2, 4 배포 환경에서 사용되는 파일
- 1, 2 파일은 플랫폼 구분 없이 공통으로 사용되는 리액트의 핵심 기능을 담고 있다.
- 3, 4 파일은 웹에서만 사용되는 파일

```html
<!-- index.html -->
<!DOCTYPE html>

<html>
  <body>
    <h2>안녕하세요! 이 프로젝트가 마음에 드신다면 좋아요 버튼을 눌러주세요!</h2>
    <div id="react-root"></div>
    <script src="react.development.js"></script>
    <script src="react-dom.development.js"></script>
    <script src="simple1.js"></script>
  </body>
</html>
```

```js
// simple.js
function LikeButton() {
  // 초기값과 함께 컴포넌트의 상태값을 정의, 여기서 React 변수는 react.development.js 파일에서 전역 변수로 생성
  const [liked, setLiked] = React.useState(false);
  // 컴포넌트의 상태값에 따라 동적으로 버튼의 문구 결정
  const text = liked ? '좋아요 취소' : '좋아요';

  // createElement 함수는 리액트 요소를 반환한다.
  return React.createElement(
    'button',
    // 버튼을 클릭하면 onCLick 함수가 호출되고, 컴포넌트의 상탯값이 변경된다.
    { onClick: () => setLiked(!liked) },
    text,
  );
}

// 미리 만들어 두었던 돔 요소를 가지고 온다.
const domContainer = document.querySelector('#react-root');
// react-dom.development.js 파일에서 전역 변수로 만든 ReactDOM 변수를 사용해서 우리가 만든 컴포넌트를 react-root 돔 요소에 붙인다.
ReactDOM.render(React.createElement(LikeButton), domContainer);
```

#### createElement 함수 이해하기
- React.createElement(component, props, …children) => ReactElement
    - 첫 번째 매개변수 component는 일반적으로 문자열이나 리액트 컴포넌트
        - 컴포넌트의 인수가 문자열이면 HTML 태그에 해당하는 돔 요소가 생성된다.
        - Ex) ‘p’ 를 입력하면 HTML p 태그가 생성된다.
    - 두 번째 매개변수 props는 컴포넌트가 사용하는 데이터를 나타낸다.
        - 돔 요소의 경우 style, className 등의 데이터가 사용될 수 있다.
    - 세 번째 매개변수 children은 해당 컴포넌트가 감싸고 있는 내부의 컴포넌트를 가리킨다.
- createElement 사용법
    - `<div><p>hello</p><p>world</p></div>`
        - 일반적인 HTML 코드
    - `React.createElement(‘div’, null, createElement(‘p’, null, ‘hello’), createElement(‘p’, null, ‘world’));`
        - 위의 일반적인 HTML 코드를 createElement 함수를 사용해서 작성
    - 대부분 createElement 를 직접 작성하지는 않는다.
    - 일반적으로 바벨(babel)의 도움을 받아서 JSX 문법을 사용
    - createElement 함수보다는 JSX 문법으로 작성하는 리액트 코드가 훨씬 가독성이 좋기 때문

#### 여러개의 돔 요소에 렌더링
```html
<!-- index.html -->
<!DOCTYPE html>

<html>
  <body>
    <h2>안녕하세요! 이 프로젝트가 마음에 드신다면 좋아요 버튼을 눌러주세요!</h2>
    <div id="react-root"></div>
    <div id="react-root2"></div>
    <div id="react-root3"></div>
    <script src="react.development.js"></script>
    <script src="react-dom.development.js"></script>
    <script src="simple2.js"></script>
  </body>
</html>
```

```js
// simple2.js
function LikeButton() {
  const [liked, setLiked] = React.useState(false);
  const text = liked ? '좋아요 취소' : '좋아요';
  return React.createElement('button', { onClick: () => setLiked(!liked) },text,);
}

ReactDOM.render(React.createElement(LikeButton), document.querySelector('#react-root'));
ReactDOM.render(React.createElement(LikeButton), document.querySelector('#react-root2'));
ReactDOM.render(React.createElement(LikeButton), document.querySelector('#react-root3'));
```

### 1.2.2 바벨 사용해 보기
바벨(babel)은 자바스크립트 코드를 변환해 주는 컴파일러

바벨을 사용하면 최신 자바스크립트 문법을 지원하지 않는 환경에서도 최신 문법을 사용할 수 있다.

추가로 다음과 같이 다양하게 활용될 수 있다.
- 코드 내 주석 제거
- 코드 압축

```js
// simple3.js 
// ----- 바벨의 도움을 받아 이부분을 개선해 보자 -----
function LikeButton() {
  const [liked, setLiked] = React.useState(false);
  const text = liked ? '좋아요 취소' : '좋아요';
  return React.createElement('button', { onClick: () => setLiked(!liked) },text,);
}

function Container() {
  const [count, setCount] = React.useState(0);
  return React.createElement(
    'div',
    null,
    React.createElement(LikeButton),
    React.createElement(
      'div',
      { style: { marginTop: 20 }},
      React.createElement('span', null, '현재 카운트: '),
      React.createElement('span', null, count),
      React.createElement('button', { onClick: () => setCount(count + 1)}, '증가'),
      React.createElement('button', { onClick: () => setCount(count - 1)}, '감소'),
    )
  )
}

const domContainer = document.querySelector('#react-root');
ReactDOM.render(React.createElement(Container), domContainer);
```

#### JSX 문법 사용해보기
```
hello-world
┣-- react.development.js
┣-- react.production.min.js
┣-- react-dom.development.js
┣-- react-dom.production.min.js
┣-- index.html
┗-- src
    ┗-- simple4.js
```


```js
// simple4.js
function Container() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <LikeButton />
      <div style={{ marginTop: 20 }}>
        <span>현재 카운트: </span>
        <span>{count}</span>
        <button onClick={() => setCount(count + 1)}>증감</button>
        <button onClick={() => setCount(count - 1)}>감소</button>
      </div>
    </div>
  );
}
```

#### JSX 문법 알아보기
- JSX는 HTML에서 태그를 사용하는 방식과 유사
- createElement 함수를 사용해서 작성하는 것보다 JSX 문법을 사용하는 게 간결하고 가독성이 좋다.
- HTML 태그와 가장 큰 차이는 속성값을 작성하는 방법에 있다.

#### JSX 문법을 바벨로 컴파일하기
- babel 설치
  - npm install @babel/core @babel/cli @babel/preset-react
    - @babel/cli에는 커맨드 라인에서 바벨을 실행할 수 있는 바이너리 파일이 들어 있다.
    - @babel/preset-react에는 JSX로 작성된 코드를 createElement 함수를 이용한 코드로 변환해 주는 플러그인이 들어 있다.
    - @babel/preset-react는 리액트 애플리케이션을 만들 때 필요한 플러그인을 모아 놓은 프리셋이다.
- 스크립트 파일 변환
  - npx babel --watch src --out-dir . --presets @babel/preset-react
    - npx 명령어는 외부 패키지에 포함된 실행 파일을 실행할 때 사용된다.
    - 외부 패키지의 실행 파일은 ./node_modules/./bin 밑에 저장된다.
    - 따라서 npx babel은 ./node_modules/./bin/babel을 입력하는것과 동일하다.
    - watch 모드로 실행했기 때문에 src 폴더의 자바스크립트 파일을 수행할 때마다 자동으로 변환 후 저장한다.

#### 바벨 플러그인과 프리셋
- 바벨은 자바스크립트 파일을 입력으로 받아서 또 다른 자바스크립트 파일을 출력으로 준다.
- 이렇게 자바스크립트 파일을 변환해 주는 작업은 플러그인 단위로 이루어진다.
- 두 번의 변환이 필요하다면 두 개의 플러그인을 사용한다.
- 하나의 목적을 위해 여러개의 플러그인이 필요할 수 있는데, 이러한 플러그인의 집합을 프리셋(preset)이라고 한다.

### 1.2.3 웹팩의 기본 개념 이해하기
- 웹팩은 자바스크립트로 만든 프로그램을 배포하기 좋은 혀앹로 묶어주는 도구이다.
- 웹팩은 ESM(ES6의 모듈 시스템)과 commonJS를 모두 지원

#### 자바스크립트 모듈 시스템
- 하나의 파일이 하나의 모듈이 되고 사용하는 쪽에서는 여러 모듈을 가져다 쓸 수 있다.
이때 모듈 측에서는 필요한 부분만 내보내는 방법이 필요하고, 사용하는 측에서는 필요한것만 가져다 쓸 방법이 필요하다.
이때 내보내고 가져다 쓸 수 있도록 구현된 시스템이 모듈 시스템이다.

### 1.2.4 웹팩 사용해 보기
```
webpack-test
┣-- package.json
┣-- index.html
┗-- src
    ┣-- index.js
    ┗-- Button.js
```
- `npm init - y`
  - package.json 파일이 생성
- index.html 파일 생성 및 작성
  - ```html
    <!DOCTYPE html>

    <html>
      <body>
        <div id="react-root"></div>
        <script src="./dist/main.js"></script>
      </body>
    </html>
    ```
- `npm install webpack webpack-cli react react-dom`
  - 필요한 외부 패키지 설치

- index.js 파일 생성 및 작성
  - ```js
      import React from 'react';
      import ReactDOM from 'react-dom';
      import Button from './Button.js';

      function Container() {
        return React.createElement(
          'div',
          null,
          React.createElement('p', null, '버튼을 클릭해 주세요'),
          React.createElement(Button, { label: '좋아요' }),
          React.createElement(Button, { label: '싫어요' })
        )
      }

      const domContainer = document.querySelector('#react-root');
      ReactDOM.render(React.createElement(Container), domContainer);
    ```
- Button.js 파일 생성 및 작성
  - ```js
      import React from 'react';
      export default function Button(props) {
        return React.createElement('button', null, props.label);
      }
    ```
- npx webpack
  - 웹팩을 이용해 두개의 자바스크립트 파일을 하나 합침

## 1.3 create-react-app으로 시작하기
create-react-app은 리액트 웹 애플리케이션을 만들기 위한 환경을 제공한다.

### 1.3.1 create-react-app 사용해 보기
1. 설치
    - 방식_1: 
      - `npx create-react-app cra-test`
    - 방식_2: 
      - `npm install -g create-react-app`
      - `create-react-app cra-test`
2. 테스트
    - cd cra-test
    - npm start 

```
cra-test
┣-- README.md
┣-- node_modules
┣-- package.json
┣-- public
|   ┣-- favicon.ico 
|   ┗-- index.html
┗-- src
    ┣-- App.css
    ┣-- App.js
    ┣-- App.test.js
    ┣-- index.css
    ┣-- logo.svg
    ┗-- serviceWorker.js
```
- index.html, index.js, package.json 파일을 제외한 나머지 파일은 데모 앱을 위한 파일이기 때문에 마음대로 수정하거나 삭제해도 괜찮다.
- index.js로부터 연결된 모든 자바스크립트 파일 및 CSS 파일은 src 폴더 밑에 있어야 한다.
- src 폴더 바깥에 있는 파일을 import 키워드를 통해 가져오려고 하면 실패 한다.
- index.html에서 참조하는 파일은 public 폴더 밑에 있어야 한다.
- 특별한 이유가 없다면 index.html에 직접 연결하는 것보다 src 폴더 밑에서 import 키워드를 사용해 포함시키는 게 좋다.
- 그래야 자바스크립트 파일이나 CSS 파일의 경우 빌드 시 자동으로 압축된다.

### 1.3.2 주요 명령어 알아보기
- package.json 파일을 열어 보며 네 가지 npm 스크립트 명령어를 확인할 수 있다.
- 개발 모드로 실행하기
  - npm start
  - HMR이 동작하기 때문에 코드를 수정하면 화면에 즉시 반영
  - create-react-app 에서는 https로 실행하는 옵션 제공
    - 맥: `HTTPS=true npm start`
    - 윈도우: `set HTTPS=true && npm start`
- 빌드하기
  - `npm run build`
  - 배포 환경에서 사용할 파일을 만들어줌
- 테스트 코드 실행하기
  - npm test
  - create-react-app 에서는 자바스크립트 파일이 다음 조건을 만족하면 테스트 파일로 인식한다.
    - `__tests__` 폴더 밑에 있는 모든 자바스크립트 파일
    - 파일 이름이 .test.js 끝나는 파일
    - 파일 이름이 .spec.js 끝나는 파일
- 설정 파일 추출하기
  - npm run eject
  - create-react-app의 내부 설정 파일이 밖으로 노출됨
  - 이 기능을 사용하면 바벨이나 웹팩의 설정을 변경할 수 있다.

### 1.3.3 자바스크립트 지원 범위

### 1.3.4 코드 분할하기
- code splitting을 이용하면 사용자에게 필요한 양의 코드만 내려 줄 수 있다.

### 1.3.5 환경 변수 사용하기
