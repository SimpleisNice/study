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

# 4. Components and Props
컴포넌트를 통해 UI 를 재사용 가능한 개별적인 여러 조각으로 나누고, 각 조각을 개별적으로 살펴볼 수 있다.

컴포넌트를 정의하는 방법은 2가지가 있다.
```jsx
// 함수 컴포넌트
function Welcome(props) {
  return <h1>Hello, {props.name} </h1>
}

// 클래스 컴포넌트
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name} </h1>
  }
}
```
- React 의 관점에서 볼 때 위 두가지 유형의 컴포넌트는 동일하다.

React 엘리먼트는 사용자 정의 컴포넌트로도 나타낼 수 있다.
```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>
}

const tempElement = <Welcome name="React" />;

ReactDOM.render(
  tempElement,
  document.getElementById('root')
)
```
- React 가 사용자 정의 컴포넌트로 작성한 엘리먼트를 발견하면 JSX 어트리뷰트와 자식을 해당 컴포넌트에 단일 객체로 전달하며, 이 객체를 props 라고 한다.

컴포넌트의 이름은 항상 대문자로 시작
- 소문자로 시작하는 컴포넌트를 DOM 태그로 처리한다.
  - ex) `<div />` 는 HTML div 태그를 나타내지만, `<Welcome />` 는 컴포넌트를 나타내며 범위 안에 `Welcome`이 있어야 한다.


컴포넌트 합성
- 컴포넌트는 자신의 출력에 다른 컴포넌트를 참조할 수 있다.
- 이는 모든 세부 단계에서 동일한 추상 컴포넌트를 사용할 수 있음을 의미한다.
- React 앱에서는 버튼, 폼, 다이얼로그, 화면 등의 모든 것들이 흔히 컴포넌트로 표현된다.

```jsx
function Welcome(props) {
  return <h1>Hello {props.name}</h1>
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Test" />
      <Welcome name="Cora" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

컴포넌트 추출
- 컴포넌트를 여러 개의 작은 컴포넌트로 나누는 것을 두려워 마라

```jsx
function formatDate(date) {
  return date.toLocaleDateString();
}

function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img
          className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="Comment-text">
          {props.text}
        </div>
        <div className="Comment-date">
          {formatDate(props.date)}
        </div>
      </div>
    </div>
  )
}

const comment = {
  date: new Date(),
  text: 'I hope you enjoy learning React!!!',
  author: {
    name: 'Hello Kitty',
    avatarUrl: 'https://placekitten.com/g/64/64',
  },
};

ReactDOM.render(
  <Comment
    date={comment.date}
    text={comment.text}
    author={comment.author}
  />,
  document.getElementById('root')
)
```
- 해당 컴포넌트는 author, text, date 를 props 로 받은 후 웹 사이트의 코멘트를 나타낸다.
- 이 컴포넌트는 구성요소들이 모두 중첩 구조로 이루어져 있어서 변경하기 어려울 수 있으며, 각 구성 요소를 개별적으로 재사용하기 어렵다.

```jsx
function formatDate(date) {
  return date.toLocaleDateString();
}

// Avatar
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}

// UserInfo
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}

// Comment
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
const comment = {
  date: new Date(),
  text: 'I hope you enjoy learning React!!!',
  author: {
    name: 'Hello Kitty',
    avatarUrl: 'https://placekitten.com/g/64/64',
  },
};

ReactDOM.render(
  <Comment
    date={comment.date}
    text={comment.text}
    author={comment.author}
  />,
  document.getElementById('root')
)
```
- 바로 위 내용에서, 큰 컴포넌트를 작은 컴포넌트로 분리한 코드이다.
- 재사용 가능한 컴포넌트를 만들어 놓는 것은 더 큰 앱에서 작업할 때 두각을 나타낸다.
- UI 일부가 여러 번 사용되거나(Button, Panel, Avatar), UI 일부가 자체적으로 복잡한(App, FeedStory, Comment) 경우에는 별도의 컴포넌트로 만드는게 좋다


props 는 읽기 전용이다.
- 함수 컴포넌트나 클래스 컴포넌트 모두 컴포넌트의 자체 props 를 정해서는 안된다.

React 는 매우 유연하지만 한 가지 엄격한 규칙이 있다.
- 모든 React 컴포넌트는 자신의 props 를 다룰 때 반드시 순수 함수처럼 동작해야 한다.
  - 순수 함수란 입력값을 바꾸려 하지 않고 항상 동일한 입력값에 대해 동일한 결과를 반환

# 5. State and Lifecycle
이 섹션에서는 아래의 컴포넌트를 재사용하고 캡슐화 하는 방법에 대해 배울 것이다.

```jsx
// 시계
function tick() {
  const element = (
    <div>
      <h1>Hello, world!!</h1>
      <h2>It is {new Date().toLocaleTimeString()}</h2>
    </div>
  );

  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

일단 시계가 생긴 것에 따라 캡슐화
```jsx
function Clock(props) {
  return (
    <div>
      <h1>Hello, React</h1>
      <h2>It is {props.date.toLocaleTimeString()}</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,  // 이상적인 코드는 <Clock />
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```
- 여기서 중요한 요건이 누락되어 있다.
- Clock 컴포넌트가 타이머를 설정하고 매초 UI 를 업데이트 하는 것이 Clock 컴포넌트의 구현 세부사항이 되어야 한다.
- 이상적으로 한 번만 코드를 작성하고 Clock 이 스스로 업데이트 하도록 만들어야 한다.
- 이를 구현하기 위해서는 state 를 추가해야 한다.


State 는 props 와 유사하지만, 비공개이며 컴포넌트에 의해 완전히 제어된다.


함수에서 클래스로 변환하기
- 다섯 단계로 Clock 과 같은 함수 컴포넌트를 클래스로 변환할 수 있다.
1. React.Component 를 확장하는 동일한 이름의 class 생성
2. render() 라고 불리는 빈 메서드를 추가
3. 함수의 내용을 render() 메서드 안으로 옮김
4. render() 내용 안에 있는 props 를 this.props 로 변경
5. 남아있는 빈 함수 선언 삭제
    ```jsx
    class Clock extends React.Component {
      render() {
        return (
          <div>
            <h1>Hello, world!</h1>
            <h2>It is {this.props.date.toLocaleTimeString()}</h2>
          </div>
        )
      }
    }
    ```
    - render 메서드는 같은 DOM 노드로 `<Clock />` 을 렌더링하는 경우 Clock 단일 인스턴스만 사용된다.
    - 이것은 로컬 state 와 생명 주기 메서드와 같은 부가적인 기능을 사용할 수 있게 해준다.

클래스에 로컬 state 추가하기
- 위의 코드에서 date 를 props 에서 state로 이동을 해볼것이다.
- 가장 먼저 render() 메서드 내 this.props.data 를 this.state.date 로 변경
- 다음 this.state 를 지정하는 class constructor 를 추가 한다.
- 마지막으로 `<Clock />` 요소에서 date prop 을 삭제한다.

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date()};
  }
  render() {
    return (
      <div>
        <h1>Hello, React</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```
클래스 컴포넌트는 항상 props 로 기본 constructor 를 호출해야 한다.

생명주기 메서드를 클래스에 추가하기
- 많은 컴포넌트가 있는 애플리케이션에서 컴포넌트가 삭제될 때 해당 컴포넌트가 사용 중이던 리소스를 확보하는 것이 중요
- 마운트, 언마운트
- 컴포넌트 클래스에서 특별한 메서드를 선언하여 컴포넌트가 마운트 되거나 언마운트 될 때 일부 코드를 작동할 수 있다.
  - 이러한 메서드들은 생명주기 메서드라고 불린다.
```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    }
  }
  
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick() {
    this.setState({
      date: new Date(),
    })
  }
  render() {
    return (
      <div>
        <h1>Hello, React</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}</h2>
      </div>
    )
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root'),
)
```
- componentDidMount() 메서드는 컴포넌트 출력물이 DOM 에 렌더링 된 후 실행
- componentWillUnMount()
- 컴포넌트 로컬 state 를 업데이트하기 위해 this.setState() 를 사용한다.

State 를 올바르게 사용하기
- setState() 에 대해 알아야할 세가지가 있다.

1. 직접 State 를 수정하지마라
```jsx
// wrong
this.state.comment = 'Hello';

// Correct
this.setState({comment: 'Hello'});
```
- this.state 를 지정할 수 있는 유일한 공간은 바로 constructor 이다.

2. State 업데이트는 비동기적일 수도 있다.
```jsx
// wrong
// 아래의 코드는 카운터 업데이트에 실패할 수 있다.
this.setState({
  counter: this.state.counter + this.props.increment,
})

// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
// Correct
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
})
```
- React 는 성능을 위해 여러 setState() 호출을 단일 업데이트로 한꺼번에 처리할 수 있다.
- this.props 와 this.state 가 비동기적으로 업데이트될 수 있기 때문에 다음 state를 계산할 때 해당 값에 의존해서는 안된다.
- 이를 수정하기 위해 객체보다는 함수를 인자로 사용하는 다른 형태의 setState() 를 사용한다.

State 업데이트는 병합된다.
- setState() 를 호출할 때 React 는 제공한 객체를 현재 state 로 병합한다.

```jsx
// 예를 들어 state 는 다양한 독립적인 변수를 포함할 수 있다.
constructor(props) {
  super(props);
  this.state = {
    posts: [],
    comments: []
  };
}

// 별도의 setState() 호출로 이러한 변수를 독립적으로 업데이트할 수 있다.
// 병합은 얕게 이루어지기 때문에 this.setState({comments}) 는 this.state.posts 에 영향을 주진 않지만 this.state.comments 는 완전히 대체된다.
componentDidMount() {
  fetchPosts.then(response => {
    this.setState({posts: response.posts})
  });
  fetchComments().then(response => {
    this.setState({
      comments: response.comments
    });
  });
}
```

데이터는 아래로 흐름
- 부모 컴포넌트나 자식 컴포넌트 모두 특정 컴포넌트가 유상태인지 또는 무상태인지 알 수 없고, 그들이 함수나 클래스로 정의되어 있는지에 대해서 관심을 가질 필요가 없다.
- 이 때문에 state 는 종종 로컬 또는 캡슐화라고 불린다.
- state 가 소유하고 설정한 컴포넌트 이외에는 어떠한 컴포넌트에도 접근할 수 없다.
- 컴포넌트는 자신의 state 를 자식 컴포넌트에 props 로 전달할 수 있다.

```jsx
// FormattedDate 컴포넌트는 date 를 자신의 props 로 받을 것이고
// 이것이 state 또는 props 에서 왔는지, 수동으로 입력한 것인지 알지 못함
<FormattedDate date={this.state.date}>
```
- 일반적으로 이를 하향식(top-down) 또는 단방향식 데이터 흐름이라고 한다.
- 모든 state 는 항상 특정한 컴포넌트가 소유하고 있으며 그 state 로부터 파생된 UI 또는 데이터는 오직 트리구조에서 자신 아래에 있는 컴포넌트에만 영향을 미침

React 앱에서 컴포넌트가 유상태 또는 무상태에 대한 것은 시간이 지남에 따라 변결될 수 있는 구현 세부 사항으로 간주한다.
유상태 컴포넌트 안에서 무상태 컴포넌트를 사용할 수 있으며, 그 반대 경우도 마찬가지로 사용할 수 있다.


# 6. 이벤트 처리하기
React 엘리먼트에서 이벤트를 처리하는 방식은 DOM 엘리먼트에서 이벤트를 처리하는 방식과 매우 유사하다. 하지만 몇 가지 문법차이는 아래와 같다.
- React의 이벤트는 소문자 대신 캐멀 케이스(camelCase)를 사용한다.
- JSX 를 사용하여 문자열이 아닌 함수로 이벤트 핸들러를 전달

```jsx
// HTML
<button onclick="activateLaser()"></button>

// React
<button onClick={activateLaser}></button>
```
- React 에서 false 를 반환해도 기본 동작을 방지할 수 없다.
- 반드시 preventDefault 를 명식적으로 호출해야 한다.

React 는 W3C 명세에 따라 합성 이벤트를 정의하기 때문에 브라우저 호환성에 대해 걱정할 필요가 없다.

React 이벤트는 브라우저 고유 이벤트와 정확히 동일하게 동작하지 않는다.

React 를 사용할 때 DOM 엘리먼트가 생성된 후 리스너를 추가하기 위해 addEventListener 를 호출할 필요가 없다. 대신 엘리먼트가 처음 렌더링될 때 리스너를 제공하면 된다.

```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    )
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
)
```
- this 의 의미에 대해 주의해야함
- javascript 에서 클래스 메서드는 기본적으로 바인딩되어 있지 않다.
- 일반적으로 onClick={this.handleClick} 과 같이 뒤에 () 를 사용하지 않고 메서드를 참조하는 경우, 해당 메서드를 바인딩 해야함


바인딩을 해결하기 위해
```jsx
class LogginButton extends React.Component {
  // 이 문법의 this 가 handleClick 내에서 바인딩 되도록 한다.
  // 주의: 이 문법은 실험적인 문법
  handleClick = () => {
    console.log('this is: ', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}></button>
    )
  }
}

// 또는
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this. is: ', this);
  }
  
  render() {
    return (
      <button onClick={()=> this.handleClick()}>
        Click me
      </button>
    )
  }
}
```

이벤트 핸들러에 인자 전달하기
- 루프 내부에서는 이벤트 핸들러에 추가적인 매개변수를 전달하는 것이 일반적
```jsx
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```


# 7. 조건부 렌더링
React 에서는 원하는 동작을 캡슐화하는 컴포넌트를 만들 수 있다.

이렇게 하면 애플리케이션의 상태에 따라서 컴포넌트 중 몇개만을 렌더링할 수 있다.

React 에서 조건부 렌더링은 JavaScript 에서의 조건 처리와 같이 동작한다.
- if 나 조건부 연산자와 같은 JavaScript 연산자를 현재 상태를 나타내는 엘리먼트를 만드는데 사용
- 그러면 React 는 현재 상태에 맞게 UI 를 업데이트할 것이다.

```jsx
function UserGreeting (props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting (props) {
  return <h1>Please sign up</h1>;
}

function Greeting (props) {
  const isLoggedIn = props.isLoggedIn;

  if (isLoggedIn) {
    return <UserGreeting />;
  }
  
  return <GuestGreeting />;
}

ReactDOM.render(
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
```

엘리먼트 변수
- 엘리먼트를 저장하기 위해 변수를 사용할 수 있다.
- 출력의 다른 부분은 변하지 않은 채로 컴포넌트의 일부를 조건부로 렌더링 할 수 있다.

```jsx
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```

논리 && 연산자로 IF 를 인라인으로 표현하기
- JSX 안에는 중괄호를 이용해서 표현식을 포함할 수 있다.
- && 논리 연산자를 사용하면 쉽게 엘리먼트를 조건부로 넣을 수 있다.
```jsx
function Mailbox (props) {
  const unreadMessages = props.unreadMessages;

  return (
    <div>
      <h1>Hello!!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['1', '2', '3', '4',];

ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```
- JavaScript 에서 `true && expression` 은 항상 expression 으로 평가되고 `false && expression` 은 항상 false 로 평가된다.
- 따라서 && 뒤의 엘리먼트 조건이 true 일때 출력되며, false 라면 React 는 무시한다.
```jsx
class Temp extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const count = 0;
    return (
      <div>
        <h1>Test</h1>
        {count && <h1>{count}</h1>}
      </div>
    )
  }
}

ReactDOM.render(
  <Temp />,
  document.getElementById('root')
)
```
- false 로 평가될 수 있는 표현식을 반환하면 && 뒤에 있는 표현식은 건너뛰지만 false 로 평가 될 수 있는 표현식이 반환된다.

조건부 연산자로 If-Else
```jsx
render() {
  const isLoggedIn = this.state.isLoggedIn;

  return(
    <div>
    {
      isLoggedIn
      ? <LogoutButton onClick={this.handleLogoutClick}>
      : <LogoutButton onClick={this.handleLoginClick}>
    }
    </div>
  )
}
```
- 엘리먼트를 조건부로 렌더링하는 다른 방법은 조건부 연산자인 `condition ? true : false` 를 사용하는 것이다.

컴포넌트가 렌더링하는 것을 막기
- 가끔 다른 컴포넌트에 의해 렌더링될 때 컴포넌트 자체를 숨기고 싶을 대가 있을 수 있다.
- 이때는 렌더링 결과를 출력하는 대신 null 반환하면 해결 할 수 있다.

```jsx
function WarningBanner (props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className='warning'>
      Warning
    </div>
  )
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showWarning: true,
    }
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <buttton onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </buttton>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```

# 리스트와 Key
React 에서 배열을 엘리먼트 리스트로 만드는 방식은 아래와 동일합니다.
```jsx
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
```

여러개의 컴포넌트 렌더링하기
- 엘리먼트 모음을 만들고 중괄호 {} 를 이용하여 JSX 에 포함 시킬 수 있다.
```jsx
const numbers = [1,2,3,4,5,];
const listItems = numbers.map((number) => 
  <li>{number}!!</li>
)

ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

기본 리스트 컴포넌트
- 일반적으로 컴포넌트 안에서 리스트를 렌더링한다.
```jsx
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => <li>{number}</li>);

  return (
    <ul>{listItems}</ul>
  )
}

const numbers = [1,2,3,4,5,6,7];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```
- 위 코드를 실행하면 리스트의 각 항목에 key 를 넣어야 한다는 경고가 표시된다.
- `key` 는 엘리먼트 리스트를 만들 때 포함해야 하는 특수한 문자열 어트리뷰트 이다.
- 이를 해결하기 위해 li 내에 `<li key={number.toString()}>{number}</li>` 로 변경해야한다.

```jsx
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => 
    <li key={number.toString()}>{number}</li>
  );

  return (
    <ul>{listItems}</ul>
  )
}

const numbers = [1,2,3,4,5,6,7,8];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

Key
- Key 는 React 가 어떤 항목을 변경, 추가 또는 삭제할지 식별하는 것을 돕는다.
- Key 는 엘리먼트에 안정적인 고유성을 부여하기 위해 배열 내부의 엘리먼트 지정해야 한다.
- Key 를 선택하는 가장 좋은 방법은 리스트의 다른 항목들 사이에서 해당 항목을 고유하게 식별할 수 있는 문자열을 사용하는 것
- 대부분의 경우 데이터의 ID 를 Key 로 사용
- 렌더링 한 항목에 대한 안정적인 ID 가 없다면 최후의 수단으로 항목의 인덱스를 Key 로 사용할 수 있다.
  -  항목의 순서가 바뀔 수 있는 경우 key 에 인덱스를 사용하는 것은 권장하지 않는다.
  - 이로 인해 성능 저하되거나 컴포넌트의 state 관련 문제가 발생할 수 있음
  - 리스트 항목에 명시적으로 key 를 지정하지 않으면 React 는 기본적으로 인덱스를 key 로 사용
```jsx
// id
const todoItems = todos.map((todo) => 
  <li key={todo.id}>
    {todo.text}
  </li>
);
// index
const todoItems = todos.map((todo, index) => 
  <li key={index}>
    {todo.text}
  </li>
)
```
Key 로 컴포넌트 추출하기
- Key 는 주변 배열의 context 에서만 의미가 있다.

```jsx
function ListItem (props) {
  // 키를 지정할 필요가 없음
  return <li>{props.value}</li>
}

function NumberList (props) {
  const numbers = props.numbers;
  const listItem = numbers.map((number) => 
    <ListItem key={number.toString()} value={number} />
  );

  return (
    <ul>
      {listItem}
    </ul>
  )
}

const numbers = [1,2,3,4,5];

ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root'),
)
```
- 경험상 `map()` 함수 내부에 있는 엘리먼트에 key 를 넣어주는게 좋다

Key 는 형제 사이에서만 고유한 값이어야 한다.
- Key 는 배열안에서 형제 사이에서 고유해야 하고 전체 범위에서 고유할 필요는 없다.

```jsx
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) => 
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );

  const content = props.posts.map((post) => 
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );

  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  )
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];

ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);
```

# 추가
React 에서는 이벤트가 처리되는 방식, 시간에 따라 state 가 변하는 방식, 화면에 표시하기 위해 데이터가 준비되는 방식 등 렌더링 로직이 본질적으로 다른 UI 로직과 연결된다.

React 는 별도의 파일에 마크업과 로직을 넣어 기술을 인위적으로 분리하는 대신, 둘 다 포함하는 컴포넌트라고 부르는 느슨하게 연결된 유닛으로 관심사를 분리한다.

엘리먼트는 컴포넌트의 구성요소이다.

개념적으로 컴포넌트는 JavaScript 함수와 유사하다. props 라고 하는 임의의 입력을 받은 후, 화면에 어떻게 표시되는지를 기술하는 React  엘리먼틀 반환

컴포넌트의 이름은 항상 대문자로 시작한다.
# 참고
https://gist.github.com/gaearon/683e676101005de0add59e8bb345340c