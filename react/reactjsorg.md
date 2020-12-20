# React 배우기
https://ko.reactjs.org/docs/getting-started.html
https://ko.reactjs.org/docs/hello-world.html


# 1. Hello World

가장 단순한 React 예시는 아래와 같다.

```jsx
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```

# 2. JSX 소개

JSX 라 하면 JavaScript 를 확장한 문법이다.

UI 가 어떻게 생겨야 하는지 설명하기 위해 React 와 함께 사용할 것을 권장한다.

JSX 는 React "엘리먼트(element)" 를 생성한다.

```jsx
function formatFunc(user) {
  return user.firstName + ' ' + user.secondName;
}
const user = {
  firstName: 'React',
  secondName: 'Test',
};

const element = (
  <h1>Hello, world! {formatName(user)}</h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

컴파일이 끝나면, JSX 표현식이 정규 JavaScript 함수 호출이 되고 JavaScript 객체로 인식된다.

JSX 는 주입 공격을 방지한다.
- 기본적으로 React DOM 은 JSX 에 삽입된 모든 값을 렌더링하기 전에 이스케이프 하므로, 애플리케이션에 명시적으로 작성되지 않은 내용은 주입되지 않는다.

모든 항목은 렌더링 되기 전에 문자열로 환된다. 이런 특성으로 인해 XSS 공격을 방지할 수 있다.

JSX 는 객체를 표현한다.
- Babel 은 JSX 를 React.createElement() 호출로 컴파일한다.

아래의 두 예시 element 는 동일하다.
```jsx
const element = (
  <h1 className="greeting">Hello, world!"</h1>
)

const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

React.createElement() 는 버그가 없는 코드를 작성하는 데 도움이 되도록 몇가지 검사를 수행하며, 기본적으로 아애와 같은 객체를 생성한다.

이러한 객체를 React 엘리먼트라고 하며, 이를 화면에 표시하려는 항목에 대한 설명이라 생각할 수 있다.
```jsx
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
}
```

React 는 위의 이러한 객체를 읽은 후 DOM 을 구성하고 최신으로 유지하는 데 위와 같은 객체를 사용한다.

# 3. 엘리먼트 렌더링

엘리먼트는 React 앱의 가장 작은 단위 이며, 화면에 표시할 내용을 기술한다.

```jsx
const element = <h1>Hello, world</h1>;
```

React 엘리먼트는 일반 객체이며 쉽게 생성할 수 있다.

React DOM 은 React 엘리먼트와 일치하도록 DOM 을 업데이트한다.

## DOM 에 엘리먼트 렌더링하기
HTML 어딘가에 아래와 같으 내용의 div 가 있다고 가정하자

```html
<div id="root"></div>
```
```jsx
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```
- 위 root 안에 들어가는 모든 엘리먼트를 React DOM 에서 관리하기 때문에 이것을 루트 DOM 노드라고 부른다.
- React 로 구현된 애플리케이션은 일반적으로 하나의 루트 DOM 노드가 있습니다.
- React 를 기존 앱에 통합하려는 경우 원하는 만큼 많은 수의 독립된 루트 DOM 노드가 있을 수 있습니다.
- React 엘리먼트를 루트 DOM 노드에 렌더링하면 둘 다 ReactDOM.render() 로 전달하면 된다.

React 엘리먼트는 불변객체이다.

엘리먼트를 생성한 이후에는 해당 엘리먼트의 자식이나 속성을 변경할 수 없다.

엘리먼트는 영화에서 하나의 프레임과 같이 특정 시점의 UI를 보여준다.

```jsx
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );

  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
```
- 실제로 대부분의 React 앱은 ReactDOM.render() 를 한 번만 호출한다.

React DOM 은 해당 엘리먼트와 그 자식 엘리먼트를 이전의 엘리먼트와 비교하고 DOM 을 원하는 상태로 만드는데 필요한 경우에만 DOM 을 업데이트한다.

# 추가
React 에서는 이벤트가 처리되는 방식, 시간에 따라 state 가 변하는 방식, 화면에 표시하기 위해 데이터가 준비되는 방식 등 렌더링 로직이 본질적으로 다른 UI 로직과 연결된다.

React 는 별도의 파일에 마크업과 로직을 넣어 기술을 인위적으로 분리하는 대신, 둘 다 포함하는 컴포넌트라고 부르는 느슨하게 연결된 유닛으로 관심사를 분리한다.

엘리먼트는 컴포넌트의 구성요소이다.
# 참고
https://gist.github.com/gaearon/683e676101005de0add59e8bb345340c