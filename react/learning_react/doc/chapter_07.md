# CHAPTER_07 훅스로 컴포넌트 개선하기
렌더링은 리액트 애플리케이션의 심장 박동과도 같다.

렌더링이 일어나야 하는 원인과 시점을 정의하는 여러 가지 원칙을 정의하는 훅스가 더 존재한다.

렌더링 성능을 개선하는 훅스도 있다.

언제나 도움이 될 수 있는 훅스를 항상 찾을 수 있다.

<br>

## 7.1 useEffect 소개
컴포넌트는 단순히 사용자 인터페이스를 렌더링하는 함수일 뿐이다.

렌더링은 앱이 처음 적재될 때 일어나고, 프롭이나 상태 값이 변경될 때도 일어난다.

하지만 렌더링이 끝난 다음에 무언가를 하고 싶으면 어떻게 할까? 이런 경우를 더 자세히 살펴 보자.
- useEffect 함수 안에 alert를 넣는다는 것은 이 함수를 렌더러가 렌더링을 한 직후에 부수 효과로 실행한다는 뜻이다.
- 렌더러가 부수효과로 무언가를 수행하게 하고 싶을 때 useEffect를 사용한다.
- 부수효과를 함수가 반환하는 값에 속하지는 않는 어떤 것이라고 생각하자.
- UI 렌더링 외에 컴포넌트가 수행해야 하는 일을 효과(effect)라고 부른다.
- useEffect를 사용해 DOM에 추가된 특정 텍스트 입력에 초점을 맞출 수도 있다.
- 리액트는 출력을 렌더링한 다음에 useEffect를 호출해서 엘리먼트로 초점을 이동시킨다.
- useEffect는 렌더링된 프롭, 상태, 참조 등의 최종 값에 접근할 수 있다.
- useEffect를 렌더링이 끝난 다음에 발생하는 함수라고 생각하자.
- 렌더가 시작되면 컴포넌트 안에서 현재 상태 값에 접근할 수 있고, 이 현재 값을 사용해 다른 일을 할 수 있다.
- 그 후 렌더링이 다시 시작되면 모든 일이 처음부터 다시 발생한다.
- 새 값이 전달되고, 새로 렌더링이 이뤄지고, 효과가 새로 적용된다.
  - 초기화에 아주 유용하게 쓰일 수 있다.
  - useEffect는 (컴포넌트 생성과 제거에 따른) 설정과 정리에 사용할 수 있다
```js
import React, { useState } from 'react';

function CheckBox() {
  const [checked, setChecked]  = useState(false);

  useEffect(() => {
    alert(`check: ${checked.toString()}`);
    console.log(checked ? 'YES CHECKED' : 'NO, NOT CHECKED');
    txtInputRef.current.focus();
  });

  return (
    <>
      <input
        type="checkbox"
        value={checked}
        onChange={() => setChecked(checked => !checked)}
      />
      {checked ? 'checked' : 'not checked'}
    </>
  )
}
```

<br>

### 7.1.1 의존 관계 배열
useEffect는 useState와 useReducer 등의 다른 상태가 있는 훅스와 함께 작동하도록 설계됐다.

리액트는 상태가 바뀌면 컴포넌트 트리를 다시 렌더링한다.
- 렌더링이 이뤄질 때마다 효과가 호출되는 것을 바라지 않는다.
- useEffect 훅을 구체적으로 데이터 변경과 연동시킬 필요가 있다.
- 이 문제를 해결하기 위해 의존 관계 배열을 사용한다.
- 의존 관계 배열은 이펙트가 호출되는 시점을 제어한다.
- 의존 관계 배열은 배열일 뿐이다.
- 따라서 의존 관계 배열의 여러 값을 검사할 수 있다.
- useEffect 의 두번째 인자로 빈 배열을 넘길 수도 있다.
- 빈 의존 관계 배열은 초기 렌더링 직후 이펙트가 단 한 번만 호출되게 한다.
```js
import React, { useState, useEffect } from 'react';

function App() {
  const [val, set] = useState('');
  const [phrase, setPhrase] = useState('example phrase');

  const createPhrase = () => {
    setPhrase(val);
    set('');
  }

  useEffect(() => {
    console.log(`type "${val}`);
  }, [val]);
  useEffect(() => {
    console.log(`save phrase: ${phrase}`);
  }, [phrase]);
  useEffect(() => {
    console.log('just one call');
  }, [])

  return (
    <>
      <label>FAVORITE PHRASE: </label>
      <input
        value={val}
        placeholder={phrase}
        onChange={e => set(e.target.value)}
      />
      <button onClick={createPhrase}>send</button>
    </>
  )
}

export default App;
```

기능을 여러 useEffect로 나눠 담는 것은 보통 좋은 생각이다.
```js
const [posts, setPosts] = useState([]);
const addPost = post => setPosts(allPosts => [post, ...allPosts]);

useEffect(() => {
  newsFeed.subscribe(addPost);
  return () => newsFeed.unsubscribe(addPost);
}, []);

useEffect(() => {
  welcomeChime.play();
  return () => goodbyeChime.play();
}, []);
```

### 7.1.2 의존 관계를 깊이 검사하기
useMemo ?
- useMemo는 메모화된(memorized) 값을 계산하는 함수를 호출한다.
- 메모화된 함수는 함수 호출 결과를 저장하고 캐시한다.
- 그 후 함수에 같은 입력이 들어오면 캐시된 값을 반환한다.
- useMemo를 사용하면 캐시된 값과 계산한 값을 비교해서 실제 값이 변경됐는지 검사해준다.
- useMemo는 우리가 useMemo에 전달한 함수를 사용해 메모화할 값을 계산함으로써 작동한다
- useMemo는 의존 관계가 바뀐 경우에만 이 값을 재계산한다.
- useMemo에 의존 관계 배열을 전달하지 않으면 렌더링이 일어날 때마다 값을 재계산한다.
- 의존 관계 배열은 콜백 함수가 호출되야 하는 때를 결정한다.
```js
import React, { useState, useEffect, useMemo, } from 'react';

function NewsFeed() {
  const [_posts, setPosts] = useState([]);
  const addPost = post => setPosts(allPosts => [post, ...allPosts]);
  const posts = useMemo(() => _posts, [_posts]);

  useEffect(() => {
    newPostChime.play();
  }, [posts]);

  useEffect(() => {
    NewsFeed.subscribe(addPost);
    return () => NewsFeed.unsubscribe(addPost);
  }, []);

  useEffect(() => {
    welcomeChime.play();
    return () => goodbyeChime.play();
  }, []);

  return posts;
}
export default NewsFeed;
```

### 7.1.3 useLayoutEffect를 사용해야 하는 경우
useLayoutEffect는 렌더링 사이클의 특정 순간에 호출된다.

순서는 아래와 같다.
1. 렌더링
2. useLayoutEffect가 호출됨
3. 브라우저의 화면 그리기: 이 시점에 컴포넌트에 해당하는 엘리먼트가 실제로 DOM에 추가됨
4. useEffect가 호출됨

useLayoutEffect는 렌더링 다음에 호출되지만 브라우저가 변경 내역을 화면에 그리기 전에 호출된다.

대부분의 경우 useEffect로 원하는 작업을 수행하기에 충분하겠지만, 여러분이 사용하는 효과가 브라우저의 화면 그리기(UI 엘리먼트의 모양을 화면에 표시함)에 필수적인 경우에는 useLayoutEffect를 사용하고 싶을 것이다.
- 예를 들어, 창의 크기가 바뀐 경우 엘리먼트의 너비와 높이를 얻고 싶을 수 있다.

```js
function useWindowSize() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const resize = () => {
    setWidth(widnow.innerWidth);
    setHeight(window.innerHeight);
  };

  useLayoutEffect(() => {
    window.addEventListener('resize', resize);
    resize();
    return () => window.removeEventListener('resize', resize);
  }, []);

  return [width, height];
}
```

<br>

### 7.1.4 훅스의 규칙
훅스를 사용할 때는 버그나 예기치 못한 동작을 방지하기 위해 염두할 몇가지 규칙이 있다.

**훅스는 컴포넌트의 영역 안에서만 작동한다**
- 리액트 컴포넌트 내부에서만 훅스를 호출해야 한다.
- 커스텀 훅을 추가할 수도 있지만, 이런 커스텀 훅도 결국에는 컴포넌트에 추가되야 한다.
- 훅스는 일반 자바스크립트가 아니라 리액트 패턴이다.

**기능을 여러 훅으로 나누면 좋다**

**최상위 수준에서만 훅을 호출해야한다.**
리액트 함수의 최상위 수준에서만 훅을 사용해야 한다.
- 조건문이나 루프가 내포된 함수 안에서 훅을 사용해서는 안된다.
- 리액트에서는 이 배열 안에 있는 효과의 위치가 중요하지, 효과가 어떻게 저장되었는지가 중요하지 않다.
- 훅안에 if문이나 루프나 다른 조건을 내포시킬 수 있다.

### 7.1.5 useReducer로 코드 개선하기
리듀서 함수의 가장 간단히 정의하면 현재 상태를 받아서 새 상태를 반환하는 함수라 할 수 있다.
```js
import React, { useReducer } from 'react';

function CheckBox() {
  const [checked, toggle]  = useReducer(checked => !checked, false);
  return (
    <>
      <input type="checkbox" value={checked} onChange={toggle} />
      {checked ? 'checked' : 'not checked'}
    </>
  )
}
export default CheckBox;
```
- useReducer는 리듀서 함수와 초기 상태 false를 받는다.
- 그 후 onChange 함수를 리듀서가 반환하는 두 번째 값인 toggle로 설정한다.
- 이 함수는 리듀서 함수를 호출해준다.
- 함수(모든 값을 단일 값으로 축약해주는 함수)와 초깃값을 받고 한 값을 반환한다.

<br>

### 7.1.6 useReducer로 복잡한 상태 처리하기
useReducer를 사용하면 상태가 더 복잡해질 때 상태 갱신을 더 예측가능하게 처리하는데 도움이 된다.

<br>

### 7.1.7 컴포넌트 성능 개선하기
리액트 애플리케이션에서는 컴포넌트가 일반적으로 아주 많이 렌더링된다.

불필요한 렌더링을 피하고 렌더링 전파되는 데 걸리는 시간을 줄이는 등의 활동이 성능 개선에 포함된다.

리액트는 불필요한 렌더링을 방지할 때 도움이 되는 memo, useMemo, useCallback 등의 도구를 제공한다.

<br>

### 7.1.8 shouldComponentUpdate와 PureComponent

<br>

### 7.1.9 언제 리팩터링할까?
리액트는 빨리 작동하도록 설계되어 있다.

리액트 설계는 컴포넌트가 많이 렌더링되도록 되어 있다.

여러분이 리액트를 사용하기로 한 것이 바로 성능 최적화의 시작이다.

리액트는 빠르다.

성능 최적화를 위한 다른 리팩터링은 개발 단계의 마지막에 이뤄져야만 한다.

리액트 프로파일러를 사용해 각 컴포넌트의 성능을 측정할 수 있다.

리팩터링을 하기 전에는 항상 앱이 잘 작동하는지 확인하고 코드 기반이 만족스러운 상태인지 점검하자

과도하게 리팩터링을 하거나 앱이 제대로 작동하기 전에 리팩터링을 하면 찾아내기 힘든 이상한 버그가 생길 수도 있고, 코드가 제대로 작동하지 않으면 최적화를 위해 시간을 들일만한 가치가 없을 수도 있다.