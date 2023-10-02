# 4장 리액트 실전 활용법
- useEffect 훅을 제대로 사용하는 방법
- 가독성과 생산성을 높이는 컴포넌트 코드 작성 방법
- 렌더링 속도를 올리기 위한 성능 최적화 방법

<br>
<br>

## 4.1 가독성과 생산성을 고려한 컴포넌트 코드 작성법
컴포넌트를 작성하는 사람 입장에서는 유지 보수하기 쉬운 코드를, 컴포넌트를 사용하는 사람 입장에서는 컴포넌트의 인터페이스를 쉽게 파악할 수 있는 코드를 작성하는 게 좋다.

<br>

### 4.1.1 추천하는 컴포넌트 파일 작성법
컴포넌트 파일에는 다양한 종류의 함수와 변수가 등장하며, 그로 인해 코드의 가독성이 떨어지고 관리가 힘들어질 수 있다.

#### 컴포넌트 파일 작성 순서


```js
import React from "react";

/*
  파일의 최상단에는 속성 타입 정의
  - 속성값 타입이 가장 먼저 오는 이유는 컴포넌트를 사용하는 입장에서 생각하면 쉽게 이해된다.
*/
MyComponent.propTypes ={
  // ...
};

/*
  컴포넌트 함수의 매개변수는 명명된 매개변수로 정의하는 게 좋다.
  - 속성값을 사용할 때마다 props.을 반복해서 입력하지 않아도 되므로 코드 작성이 편리해진다.
  - 컴포넌트의 이름을 꼭 작성하자. 이름 없는 컴포넌트로 만들면 디버깅이 힘들다.
*/
export default function MyComponent({ prop1, prop2 }) {
  // ...
}


/*
  컴포넌트 바깥의 변수와 함수는 파일의 가장 밑에 정의
  - 특별한 이유가 없다면 변수는 상수 변수로 정의하는 게 좋다.
  - 상수 변수의 이름은 예제처럼 대문자로 작성하는 게 가독성에 좋다.
  - 컴포넌트 내부에서 커다란 객체를 생성하는 코드가 있을 때, 가능하면 커뫂넌트 외부에서 상수 변수로 정의해서 사용하자.
  - 그래야 렌더링 시 불필요한 객체 생성을 피할 수 있어서 성능상 이점이 있다.
*/
const COLUMES = [
  { id: 1, name: 'TEST_A', width: 200, color: 'white' },
  { id: 2, name: 'TEST_B', width: 400, color: 'red' },
]
const URL_PRODUCT_LIST = '/api/products';
function getTotalPrice({ price, total }) {
  // ...
}
```

#### 서로 연관된 코드를 한 곳으로 모으자

### 4.1.2 속성값 타입 정의하기: prop-types
`prop-types`는 속성값의 타입 정보를 정의할 때 사용하는 리액트 공식 패키지

속성값의 타입 정보는 컴포넌트 코드의 가독성을 위해서 필수로 작성하는 게 좋다.

`prop-types`를 사용했을 때 생기는 또 다른 장점은 타입 정의 자체가 훌륭한 문서가 된다는 점

```jsx
User.propTypes ={
  type: PropTypes.oneOf(["gold", "silver", "bronze"]),
  age: PropTypes.number,
  male: PropTypes.bool.isRequired,
  onChnageName: PropTypes.func,
  onChnageTitle: PropTypes.func.isRequired
}

function User({ type, age, male, onChnageName, onChnageTitle }) {
  // ...
}
```
- male, onChangeTitle은 필숫값이므로 부모 컴포넌트에서 이 값을 주지 않으면 에러 메시지가 출력된다.
- type 속성에는 gold, silver, bronze 중의 하나만 입력할 수 있다.

### 4.1.3 가독성을 높이는 조건부 렌더링 방법
컴포넌트 함수 내부에 특정 값에 따라 선택적으로 렌더링하는 것을 조건부 렌더링(conditional rendering)라고 한다.
- 조건부 렌더링을 구현할 때는 삼항 연산자가 유용한 경우도 있지만 대부분 && 연산자가 가독성이 좋다.

### 4.1.4 관심사 분리를 위한 프레젠테이션, 컨테이너 컴포넌트 구분하기
비즈니스 로직과 상탯값의 유무에 따라 프레젠테이션(presentation)과 컨테이너(container)로 불리는 두 가지 컴포넌트로 
구분하는 방법

프로그래밍 세계에서 관심사의 분리란 복잡한 코드를 비슷한 기능을 하는 코드끼리 모아서 별도로 관리하는 것을 말함

댄 아브라모프의 블로그 글에서는 재사용성이 좋은 프레젠테이션 컴포넌트와 그렇지 않은 컨테이너 컴포넌트로 구분하는 방법을 설명

필자가 추천하는 프레젠테이션?
- 비즈니스 로직이 없다.
- 생탯값이 없다. 단, 마우스 오버와 같은 UI 효과를 위한 상탯값은 제외한다.

## 4.2 useEffect 훅 실전 활용법
의존성 배열을 잘 관리하지 못해서 발생한 버그는 디버깅이 쉽지 않으므로 제대로 이해하고 사용해야 한다.

### 4.2.1 의존성 배열을 관리하는 방법

#### 부수 효과 함수에서 API 호출하는 경우
eslint의 exhaustive-deps 규칙 사용 권장
- 잘못 사용된 의존성 배열을 찾아서 알려줌

#### useEffect 훅에서 async await 함수 사용하기
- 부수 효과 함수의 반환값은 항상 함수 타입이어야 한다.
- ```js
  useEffect(() => {
    async function fetchAndSetUser() {
      const data = await fetchUser(userId);
      setUser(data);
    }
    fetchAndSetUser();
  }, [userId])'
  ```
