# 3장 중요하지만 헷갈리는 리액트 개념 이해하기

## 3.1 상탯값과 속성값으로 관리하는 UI 데이터
UI 라이브러리인 리액트는 UI 데이터를 관리하는 방법 제공

UI 데이터는 컴포넌트 내부에서 관리되는 상탯값과 부모 컴포넌트에서 내려 주는 속성값으로 구성된다.

UI 데이터가 변경되면 화면을 다시 그려야 한다.

리액트는 화면을 그리는 모든 코드를 컴포넌트 함수에 선언형으로 작성하도록 했다.

UI 데이터가 변경되면 리액트가 컴포넌트 함수를 이용해서 화면을 자동으로 갱신해 주며, 이것이 리액트의 가장 중요한 역할

<br>

### 3.1.1 리액트를 사용한 코드의 특징
```js
function MyComponent() {
  const [desc, setDesc] = useState('');
  const [currentId, setCurrentId] = useState(1);
  const [todoList, setTodoList] = useState([]);

  function onAdd() {
    const todo = { id: currentId, desc};
    setCurrentId(currentId + 1);
    setTodoList([...todoList, todo])
  }

  function onDelete(e) {
    const id = Number(e.target.dataset.id);
    const newTodoList = todoList.filter(todo => todo.id !== id);
    setTodoList(newTodoList);
  }

  function onSaveToServer() {
    // todo list 전송
  }
  // 컴포넌트가 반환하는 값은 화면에 무엇을 그려야 하는지 설명하는 UI 코드
  return (
    <div>
      <h3>할 일 목록</h3>
      <ul>
        {
          todoList.map(
            todo => (
              <li key={todo.id}>
                <span>{todo.desc}</span>
                <button data-id={todo.id} onClick={onDelete}>삭제</button>
              </li>
            )
          )
        }
      </ul>
      <input />
      <button onClick={onAdd}>추가</button>
      <button onClick={onSaveToServer}>서버에 저장</button>
    </div>
  )
}
```
- 선언형 프로그래밍은 명령형 프로그래밍보다 추상화 단계가 높다고 할 수 있다.
- 추상화 단계가 높을수록 비즈니스 로직에 좀 더 집중할 수 있다는 강점이 있다.

<br>

### 3.1.2 컴포넌트의 속성값과 상탯값
- 속성값과 상탯값으로 관리하는 UI 데이터
  - 리액트에서 UI 데이터는 반드시 상탯값과 속성값을 관리해야 한다.
  - UI 데이터를 상탯값과 속성값으로 관리하지 않으면 UI 데이터가 변경돼도 화면이 갱신되지 않을 수 있다.
- 불변 객체로 관리하는 속성값과 상탯값
  - 불변 변수로 관리하면 코드의 복잡도가 낮아지는 장점이 있다.

<br>

### 3.1.3 컴포넌트 함수의 반환값
```js
// 우리가 작성한 컴포넌트
return <MyComponent title="hello react" />;
// 문자열
return '안녕하세요';
// 숫자
return 123;
// 배열, 이때 각 리액트 요소는 key 속성값을 갖고 있어야 한다.
return [ <p key='a'>a</p>, <p key='b'>b</p> ];
// 프래그먼트
return (<React.Fragment><p>a</p><p>b</p></React.Fragment>);
// 프래그먼트
return (<><p>a</p><p>b</p></>);
// null을 반환하면 아무것도 렌더링하지 않는다.
return null;
// false을 반환하면 아무것도 렌더링하지 않는다.
return false;
// 리액트 포털을 사용하면 컴포넌트의 현재 위치와 상관 없이 특정 돔 요소에 렌더링할 수 있다.
return ReactDOM.createPortal(<p>hello react</p>, domNode);
```

## 3.2 리액트 요소와 가상 돔
리액트 요소(element)는 리액트가 UI를 표현하는 수단

리액트는 렌더링 선능을 위해 가상 돔을 활용한다.
- 브라우저에서 돔을 변경 하는 것은 비교적 오래 걸리는 작업
- 따라서 빠른 렌더링을 위해서는 돔 변경을 최소화해야 한다.
- 리액트에서는 가상 돔을 올려 놓고 이전과 이후의 가상 돔을 비교해서 변경된 부분만 실제 돔에 반영하는 전략을 채택

<br>

### 3.2.1 리액트 요소 이해하기

<br>

### 3.2.2 리액트 요소가 돔 요소로 만들어지는 과정
- 하나의 화면을 표현하기 위해 여러 개의 리액트 요소가 트리 구조로 구성된다.
- 리액트에서 데이터 변경에 의한 화면 업데이트는 다음과 같다.
  - 랜더 단계(render phase 또는 reconcilication phase 라고 불림)
    - 최초의 리액트 요소 트리로부터 가상 돔을 만들고 이전 가상 돔과 비교해서 실제 돔에 반영할 내용을 결정하는 단계
    - 렌더 단계는 ReactDOM.render 함수와 상탯값 변경 함수에 의해 시작
  - 커밋 단계(commit phase)
    - 파악된 변경 사항을 실제 돔에 반영하는 단계

<br>

## 3.3 리액트 훅 기초 익히기
훅은 함수형 컴포넌트에 기능을 추가할 때 사용하는 함수

훅을 이용하면 함수형 컴포넌트에서 상탯값을 사용할 수 있고, 자식 요소에 접근할 수도 있다.

<br>

### 3.3.1 상탯값 추가하기: useState
- useState 훅을 이용하면 컴포넌트에 상탯값을 추가할 수 있다.
- 배치로 처리되는 상탯값 변경 함수
  - useState 훅이 반환하는 배열의 두 번째 원소는 상탯값 변경 함수
  - 리액트는 상탯값 변경 함수가 호출되면 해당 컴포넌트를 다시 그린다.
  - 이 과정에서 자식 컴포넌트도 같이 렌더링 된다.
  - 리액트는 가능하다면 상탯값 변경을 배치(batch)로 처리한다.
  - ```js
      import React, { useState } from 'react';

      export default function TestComponent() {
        const [count, setCount] = useState({ value: 0});

        function onClick() {
          setCount({ value: count.value + 1 });
          setCount({ value: count.value + 1 });
        }

        console.log('render called');

        return (
          <div>
            <h2>{count.value}</h2>
            <button onClick={onClick}>증가</button>
          </div>
        )
      }
    ```
    - 상탯값 변경 함수가 비동기로 동작하기 때문에 의도와 달리 1만큼만 증가
    - 리액트는 효율적으로 렌더링하기 위해 여러 개의 상탯값 변경 요청을 배치로 처리
    - 리액트 상탯값 변경 함수를 동기로 처리하면 하나의 상탯값 변경 함수가 호출될 때마다 화면을 다시 그리기 때문에 성능 이슈가 생길 수 있다.
- 상탯값 변경 함수에 함수 입력하기
  - ```js
      import React, { useState } from 'react';

      export default function TestComponent1() {
        const [count, setCount] = useState(0);

        function onClick() {
          setCount(prev => prev + 1);
          setCount(prev => prev + 1);
        }

        console.log('render called');

        return (
          <div>
            <h2>{count}</h2>
            <button onClick={onClick}>증가</button>
          </div>
        )
      }
    ```
- 호출 순서가 보장되는 상탯값 변경 함수
  - 상탯값 변경 함수는 비동기로 처리되지만 그 순서가 보장된다.
- useState 훅 하나로 여러 상탯값 관리하기
  - 클래스형 컴포넌트의 setState 메서드는 기존 상탯값과 새로 입력된 값을 병합
  - useState 훅은 상탯값 변경 함수는 이전 상탯값을 덮어씀
  - ```js
      import React, { useState } from 'react';

      export default function TestComponent() {
        const [state, setState] = useState({ name: '', age: 0 });
        return (
          <div>
            <p>{`name is ${state.name}`}</p>
            <p>{`age is ${state.age}`}</p>
            <input
              type='text'
              value={state.name}
              onChange={e => setState({ ...state, name: e.target.value })}
            />
            <input
              type='number'
              value={state.age}
              onChange={e => setState({ ...state, age: e.target.value })}
            />
          </div>
        )
      }
    ```
    - 두 상탯값을 하나의 객체로 관리한다.
    - useState 훅은 이전 상탯값을 덮어쓰기 때문에 `...state`같은 코드가 필요
    - 이렇게 상탯값을 하나의 객체로 관리할 때는 useReducer 훅을 사용하는게 좋다

#### 상탯값 변경이 배치로 처리되지 않는 경우
- 리액트는 내부에서 관리하는 이벤트 처리 함수에 대해서만 상탯값 변경을 배치로 처리한다.
- 리액트 외부에서 관리되는 이벤트 처리 함수의 경우에는 상탯값 변경이 배치로 처리되지 않는다.

### 3.3.2 컴포넌트에서 부수 효과 처리하기: useEffect
- 함수 실행 시 함수 외부의 상태를 변경하는 연산을 부수 효과라고 부른다.
- 특별한 이유가 없다면 모든 부수 효과는 useEffect 훅에서 처리하는 게 좋다.
- 부수 효과?
  - API 호출
  - 이벤트 처리 함수를 등록하고 해제하는 것
  - etc...
- ```js
  import React, { useState, useEffect } from 'react';

  function MyComponent() {
    const [count, setCount] = useState(0);

    useEffect(() => {
      document.title = `업데이트 횟수: ${count}`;
    })
    // 부수효과 함수는 렌더링 결과가 실제 돔에 반영된 후에 비동기로 호출된다.
    return (
      <button onClick={() => setCount(count + 1)}>increase</button>
    )
  }

  export default MyComponent;
  ```
  - useEffect 훅에 입력하는 함수를 부수 효과 함수라고 한다.
  - 부수 효과 함수는 렌더링 결고가 실제 돔에 반영된 후 호출되고, 컴포넌트가 사라지기 직전 마지막으로 호출된다. 
- 컴포넌트에서 API 호출하기
  - ```js
      import React, { useState, useEffect } from 'react';
      function MyComponent({userId}) {
        const [user, setUser] = useState(null);
        useEffect(
          () => {
            getUserApi(userId).then(data => setUser(data));
          },
          [userId]
        );
        return (
          <div>
            {!user && <p>사용자 정보를 가져오는 중 ...</p>}
            {user && (
              <>
                <p>{`name is ${user.name}`}</p>
                <p>{`age is ${user.age}`}</p>
              </>
            )}
          </div>
        )
      }
      export default MyComponent;
    ```
  - useEffect 훅의 두번째 매개변수로 배열을 입력하면, 배열의 값이 변경되는 경우에만 함수가 호출된다.
  - 이 배열을 의존성 배열이라 한다.
- 이벤트 처리 함수를 등록하고 해제하기
  - ```js
      import React, { useState, useEffect } from 'react';

      function MyComponent() {
        const [width, setWidth] = useState(window.innerWidth);

        useEffect(() => {
          const onResize = () => setWidth(window.innerWidth);
          window.addEventListener('resize', onResize);

          return () => {
            window.removeEventListener('resize', onResize);
          }
        }, [])

        return <div>{`width is ${width}`}</div>
      }

      export default MyComponent;
    ```
    - 의존성 배열로 빈 배열을 입력하면 컴포넌트가 생성될 때만 부수 효과 함수가 호출되고, 컴포넌트가 사라질 때만 반환된 함수가 호출된다.

### 3.3.3 훅 직접 만들기
- 리액트가 제공하는 훅을 이용해서 커스텀(custom) 훅을 만들 수 있다.
- 커스텀 훅을 이용해서 또 다른 커스텀 훅을 만들 수도 있다.
- 훅을 직접 만들어서 사용하면 쉽게 로직을 재사용할 수 있다.
- 리액트의 내장 훅처럼 커스텀 훅의 이름은 use로 시작하는 게 좋다.
- 코드의 가독성 및 리액트 개발 도구의 도움도 쉽게 반을 수 있다.
- ```js
  function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
      const onResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', onResize);

      return () => {
        window.removeEventListener('resize', onResize);
      }
    }, [])
    return width;
  }
  ```
- useMounted 커스텀 훅
  - 리액트에서 마운트란 컴포넌트의 첫 번째 렌더링 결과가 실제 돔에 반영된 상태를 말함
  - 컴포넌트 마운트 여부를 알려 주는 useMounted 훅은 다음과 같이 작업할 수 있다.
  - ```js
      function useMounted() {
        const [mounted, setMounted] = useState(false);
        useEffect(() => setMounted(true), []);

        return mounted;
      }
    ```
### 3.3.4 훅 사용 시 지켜야 할 규칙
- 아래의 규칙을 지켜야 리액트가 각 훅의 상태를 제대로 기억할 수 있다.
  - 하나의 컴포넌트에서 훅을 호출하는 순서는 항상 같아야 한다.
  - 훅은 함수형 컴포넌트 또는 커스텀 훅 안에서만 호출되어야 한다.

<br>

## 3.4 콘텍스트 API로 데이터 전달하기
콘텍스트 API를 사용하면 컴포넌트의 중첩 구조가 복잡한 상황에서도 비교적 쉽게 데이터를 전달할 수 있다.
- 콘텍스트 API를 사용하면 상위 컴포넌트에서 하위에 있는 모든 컴포넌트로 직접 데이터를 전달할 수 있다.
- 이때 중간에 있는 컴포넌트는 콘텍스트 데이터의 존재를 몰라도 되므로 속성값을 반복해서 내려 주던 문제가 사라짐

콘텍스트 API 적용 전
```js
function App() {
  return (
    <div>
      <div>상단 메뉴</div>
      <Profile username="mike"/>
      <div>하단 메뉴</div>
    </div>
  );
}


function Profile({ username }) {
  return (
    <div>
      <Greeting  username={username}/>
    </div>
  )
}

function Greeting({ username }) {
  return <p>{`${username}님 안녕하세요~`}</p>
}
export default App;
```

콘텍스트 API 적용 후
```js
import React from 'react';
const UserContext = React.createContext('');

function App() {
  return (
    <div>
      <UserContext.Provider value='mike'>
        <div>상단 메뉴</div>
        <Profile />
        <div>하단 메뉴</div>
      </UserContext.Provider>
    </div>
  );
}


function Profile() {
  return (
    <div>
      <Greeting />
    </div>
  )
}

function Greeting() {
  return (
    <UserContext.Consumer>
      {username => <p>{`${username}님 안녕하세요~`}</p>}
    </UserContext.Consumer>
  )
}
export default App;
```
- createContext 함수를 호출하면 콘텍스트 객체가 생성된다.
  - `React.createContext(default) => {Provider, Consumer}`
- 상위 컴포넌트에서는 Provider 컴포넌트를 이용해서 데이터를 전달
- 하위 컴포넌트에서는 Consumer 컴포넌트를 이용해서 데이터를 사용한다.
- Consumer 컴포넌트는 데이터를 찾기 위해 상위로 올라가면서 가장 가까운 Provider 컴포넌트를 찾는다.
- 만약 최상위에 도달할 때까지 Provider 컴포넌트를 찾지 못한다면 기본값이 사용된다.
- 기본값 덕분에 Provider 컴포넌트가 없어도 되므로, 어렵지 않게 Greeting 컴포넌트의 테스트 코드를 작성할 수 있다.
- Provider 컴포넌트의 속성값이 변경되면 하위의 모든 Consumer 컴포넌트는 다시 렌더링된다.

# 찾아보기!!
React fiber