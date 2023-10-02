# Hook 의 개요

## 동기
hook은 계층의 변화 없이 상태 관련 로직을 재사용할 수 있도록 도와줌

hook을 통해 서로 비슷한 것을 하는 작은 함수의 묶음으로 컴포넌트를 나누는 방법을 사용할 수 있다.(구독 설정 및 데이터를 불러오는 것과 같은 로직)

Class는 코드의 최소화를 힘들게 만들고, 핫 리로딩을 깨지기 쉽고 신뢰할 수 없게 만든다. 이러한 문제를 해결하기 위해, hook는 Class 없이 React 기능들을 사용하는 방법을 제시

## 개요
hook은 React 16.8에 새로 추가된 기능

hook은 class를 작성하지 않고도 state와 다른 React의 기능들을 사용할 수 있게 해줌

hook는 함수 컴포넌트에서 React state와 생명주기 기능을 연동할 수 있게 해주는 함수

hook는 class안에서 동작하지 않는다.

대신 class 없이 React를 사용할 수 있게 해준다.

## State Hook
```jsx
import React, { useState } from 'react';

export default function Eaxmple() {
  const [count, setCount] = useState(0);

  function onIncreaseCount() {
    setCount(count + 1);
  }
  return (
    <div>
      <p>YOU CLICK {count} TIME</p>
      <button onClick={onIncreaseCount}>증가 버튼</button>
    </div>
  )
}
```
useState
- 현재의 state 값과 이 값을 업데이트 하는 함수를 쌍으로 제공
- 이 함수를 이벤트 핸들러나 다른곳에서 호출할 수 있다.
- useState는 인자로 초기 state값을 하나 받는다.
- 하나의 컴포넌트 내에서 state hook를 여러 개 사용할 수 도 있다.
- 컴포넌트가 렌더링할 때 오직 한 번만 생성


## Effect Hook
```jsx
import React, { useState, useEffect } from 'react';

export default function Eaxmple() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `YOU CLICKED ${count} TIMES`    
  }, [count]);

  function onIncreaseCount() {
    setCount(count + 1);
  }
  return (
    <div>
      <p>YOU CLICK {count} TIME</p>
      <button onClick={onIncreaseCount}>CLICK ME</button>
    </div>
  )
}
```
useEffect
- useEffect는 함수 컴포넌트 내에서 이런 side effects를 수횅할 수 있게 해준다.
- componentDidMount, componentDidUpdate, componentWillUnmount와 같은 목적으로 제공되지만, 하나의 API로 통합된 것이다.
- useEffect를 사용하면, React는 DOM을 바꾼 뒤에 "effect" 함수를 실행할 것이다
- Effects는 컴포넌트 안에 선언되어있기 때문에 props와 state에 접근할 수 있다.
- 기본적으로 React는 첫 번째 렌더링을 포함하여 매 렌더링 이후에 effects를 실행한다.
- Effect를 "해제"할 필요가 있다면, 해제하는 함수를 반환해주면된다.(선택적)
- 정리(Clean-up)를 이용하지 않는 Effects
  - React DOM을 업데이트한 뒤 추가로 코드를 실행하는 경우


## Hook 사용 규칙
Hook은 그냥 JavaScript 함수이지만, 두가지 규칙을 준수해야 한다.
- 최상위(at the top level)에서만 Hook을 호출해야 한다.
  - 반복문, 조건문, 중첩된 함수 내에서 Hook을 실행하지 마세요
- React 함수 컴포넌트 내에서만 Hook을 호출해야 한다.
  - 일반 JavaScript 함수에서는 Hook을 호출해서는 안된다.
  - Hook을 호출할 수 있는 곳이 딱 한둔데 더 있다. 바로 직접 작성한 custom hook 이다.

## 나만의 Hook 만들기
개발을 하다 보면 가끔 상태 관련 로직을 컴포넌트 간에 재사용하고 싶은 경우가 생김

이 문제를 해결하기 위해서는 전통적인 방법 2가지가 있다.
- higher-order components
- render props

`Custom Hook`은 이 둘과 달리 컴포넌트 트리에 새 컴포넌트를 추가하지 않고도 이것을 가능하게 한다.

```jsx
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}

function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

## 다른 내장 Hook


9.12 1주차
금일 진행 관련
- 진행 회의 날짜: 화요일 저녁 이후( *협의 및 조정 가능 )
- 진행 회의 시간: 3시간( *최대 시간 )
- 진행 간 1달 일정: 프로젝트 스터디 및 기획

9.20
- O

9.26

10.4

10.1x

10.17 마지막