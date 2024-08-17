# CHAPTER04 객체

**객체 리터럴은 각자의 타입이 있는 키와 값의 집합이다.**

이번 장에서는 복잡한 객체 형태를 설명하는 방법과 타입스크립트가 객체의 할당 가능성을 확인하는 방법에 대해서 다룸

## 4.1 객체 타입

`{...}` 구문을 사용해서 객체 리터럴을 생성하면 타입스크립트는 해당 속성을 기반으로 새로운 객체 타입 또는 타입 형태를 고려함

- 해당 객체 타입은 객체의 값과 동일한 속성명과 원시 타입을 갖음
- 값의 속성에 접근하려면 `value.멤버` 또는 `value['멤버']` 구문을 사용

객체 타입은 타입스크립트가 자바스크립트 코드를 이해하는 방법에 대한 핵심 개념

- null, undefined를 제외한 모든 값은 그 값에 대한 실제 타입의 멤버 집합을 가지므로 타입스크립트는 모든 값의 타입을 확인하기 위해 객체 타입을 이해해야함

### 4.1.1 객체 타입 선언

객체 타입은 객체 리터럴과 유사하게 보이지만 필드 값 대신 타입을 사용해 설명

```ts
let poetLater: {
  born: number;
  name: string;
};

poetLater = {
  born: 1935,
  name: "Mary Oliver",
};
// Type 'string' is not assignable to type '{ born: number; name: string; }'.
poetLater = "Sappho";
```

### 4.1.2 별칭 객체 타입

`{ born: number, name: string}`과 같은 객체 타입을 계속 작성하는 일은 매우 귀찮음

각 객체 타입에 타입 별칭을 할당해 사용하는 방법이 더 일반적

```ts
type Poet = {
  born: number;
  name: string;
};

let poetLater: Poet;

poetLater = {
  born: 1935,
  name: "Mary Oliver",
};
// Type 'string' is not assignable to type 'Poet'.
poetLater = "Sappho";
```

- 타입스크립트의 할당 가능성 오류 메시지를 좀 더 직접적으로 읽기 쉽게 만듬

## 4.2 구조적 타이핑

타입스크립트의 타입 시스템은 `구조적으로 타입화(structurally typed)`되 어 있다.

즉, 타입을 충족하는 모든 값을 해당 타입의 값으로 사용할 수 있다.

- 매개변수나 변수가 특정 객체 타입으로 선언되면 타입스크립트에 어떤 객체를 사용하든 해당 속성이 었어야 함을 말함

Ex)

```ts
type WithFirstName = {
  firstName: string;
};

type WithLastName = {
  lastName: string;
};

const hasBoth = {
  firstName: "Lucille",
  lastName: "Clifoton",
};

// ok - hasBoth는 'string' 타입의 'firstName'을 포함함
let withFirstName: WithFirstName = hasBoth;
// ok - hasBoth는 'string' 타입의 'lastName'을 포함함
let withLastName: WithLastName = hasBoth;
```

타입스크립트의 타임 검사기에서 구조적 타이핑은 정적 타입을 검사하는 경우

덕 타이핑은 런타임에서 사용될 때까지 객체 타입을 검사하지 않는 것을 말함

**자바스크립트는 덕 타입인 반면 타입스크립트는 구조적 타입화된다.**

### 4.2.1 사용 검사

객체 타입으로 애너테이션된 위치에 값을 제공할 때 타입스크립트는 값을 해당 객체 타입에 할당할 수 있는지 확인

- 할당하는 값에는 객체 타입의 필수 속성이 있어야 함
- 객체 타입에 필요한 멤버가 객체에 없다면 타입스크립트는 오류를 발생시킴

### 4.2.2 초과 속성 검사

변수가 객체 타입으로 선언되고, 초기값에 객체 타입에서 정의된 것보다 많은 필드가 있다면 타입스크립트에서 타입 오류가 발생함

따라서 변수 객체 타입으로 선언하는 것은 타입 검사기가 해당 타입에 예상되는 필드만 있는지 확인하는 방법이기도 함

```ts
type Poet = {
  born: number;
  name: string;
};

//ok
const poetMatch: Poet = {
  born: 1928,
  name: "Maya Angelou",
};

// Object literal may only specify known properties, and 'activity' does not exist in type 'Poet'.
const extraProperty: Poet = {
  activity: "walking",
  born: 1928,
  name: "Maya Angelou",
};

const existingObject = {
  activity: "walking",
  born: 1928,
  name: "Maya Angelou",
};
// ok
const extraPropertyButOk: Poet = existingObject;
```

- 초과 속성 검사는 객체 타입으로 선언된 위치에서 생성되는 객체 리터럴에 대해서만 일어남
- 기존 객체 리터럴을 제공하면 초과 속성 검사를 우회함

타입스크립트에서 초과 속성을 금지하면 코드를 깨끗하게 유지할 수 있고, 예상한 대로 작동하도록 만들 수 있다.

### 4.2.3 중첩된 객체 타입

자바스크립트 객체는 다른 객체의 멤버로 중첩될 수 있으므로 타입스크립트의 객체 타입도 타입 시스템에서 중첩된 객체 타입을 나타낼 수 있어야 함

```ts
type Author = {
  firstName: string;
  lastName: string;
};
type Poem = {
  author: Author;
  name: string;
};

const poemMatch: Poem = {
  author: {
    firstName: "Sylvia",
    lastName: "Plath",
  },
  name: "Lady Lazarus",
};
```

### 4.2.4 선택적 속성

모든 객체에 객체 타입 속성이 필요한 것은 아님

타입의 속성 애너테이션에서 `:` 앞에 `?`를 추가하면 선택적 속성임을 나타낼 수 있음

```ts
type Book = {
  author?: string;
  pages: number;
};

// ok
const ok: Book = {
  author: "Rita Dove",
  pages: 80,
};
// Property 'pages' is missing in type '{ author: string; }' but required in type 'Book'.
const missing: Book = {
  author: "Rita Dove",
};
```

선택적 속성과 undefined를 포함한 유니언 타입 속성 사이에는 차이가 있음

- `?`을 사용해 선택적으로 선언된 속성은 존재하지 않아도 됨
- 필수로 선언된 속성과 `|` undefined는 그 값이 undefined일지라도 반드시 존재해야함

## 4.3 객체 타입 유니언

타입스크립트 코드에서는 속성이 조금 다른, 하나 이상의 서로 다른 객체 타입이 될 수 있는 타입을 설명할 수 있어야 함

또한 속성값을 기반으로 해당 객체 타입 간에 타입을 좁혀야 할수도 있음

### 4.3.1 유추된 객체 타입 유니언

변수에 여러 객체 타입 중 하나가 될 수 있는 초깃값이 주어지면 타입스크립트는 해당 타입을 객체 타입 유니언으로 유추함

유니언 타입은 가능한 각 객체 타입을 구성하고 있는 요소를 모두 가질 수 있음

객체 타입에 정의된 각각의 가능한 속성은 비록 초깃값이 없는 선택적(?) 타입이지만 각 객체 타입의 구성 요소로 주어짐

```ts
const poem =
  Math.random() > 0.5
    ? { name: "Test1", pages: 7 }
    : { name: "Test2", rhymes: true };

// name: string;
poem.name;
// pages?: number;
poem.pages;
// rhymes?: booleans
poem.rhymes;
```

### 4.3.2 명시된 객체 타입 유니언

객체 타입의 조합을 명시하면 객체 타입을 더 명확히 정의할 수 있음

- 코드를 조금 더 작성해야 하지만 객체 타입을 더 많이 제어할 수 있다는 이점
- 값의 타입이 객체 타입으로 구성된 유니언이라면 타입스크립트의 타입 시스템은 이런 모든 유니언 타입에 존재하는 속성에 대한 접근만 허용함

```ts
type PoemWithPages = {
  name: string;
  pages: number;
};

type PoemWithRhymes = {
  name: string;
  rhymes: boolean;
};

type Poem = PoemWithPages | PoemWithRhymes;

const poem: Poem =
  Math.random() > 0.5
    ? { name: "Temp", pages: 7 }
    : { name: "Temp1", rhymes: true };

poem.name;

// Property 'pages' does not exist on type 'Poem'.
//  Property 'pages' does not exist on type 'PoemWithRhymes'
poem.pages;

// Property 'rhymes' does not exist on type 'Poem'.
//   Property 'rhymes' does not exist on type 'PoemWithPages'
poem.rhymes;
```

- 잠재적으로 존재하지 않는 객체의 멤버에 대한 접근을 제한하면 코드의 안전을 지킬 수 있음
- 값이 여러 타입 중 하나일 경우, 모든 타입에 존재하지 않는 속성이 객체에 존재할 거라 보장할 수 없음

### 4.3.3 객체 타입 내로잉

타입 검사가 유니언 타입 값에 특정 속성이 포함된 경우에만 코드 영역을 실행할 수 있음을 알게되면, 값의 타입을 해당 속성을 포함하는 구성 요소로만 좁힘

즉, 코드에서 객체의 형태를 확인하고 타입 내로잉이 객체에 적용

```ts
type PoemWithPages = {
  name: string;
  pages: number;
};

type PoemWithRhymes = {
  name: string;
  rhymes: boolean;
};

type Poem = PoemWithPages | PoemWithRhymes;

const poem: Poem =
  Math.random() > 0.5
    ? { name: "Temp", pages: 7 }
    : { name: "Temp1", rhymes: true };

// ok
if ("pages" in poem) {
  poem.pages;
} else {
  poem.rhymes;
}
```

### 4.3.4 판별된 유니언

자바스크립트와 타입스크립트에서 유니언 타입으로 된 객체의 또 다른 인기 있는 형태는 객체의 속성이 객체의 형태를 나타내도록 하는 것

이러한 타입 형태를 `판별된 유니언`이라고 부르고, 객체 타입을 가리키는 속성이 `판별값`이다.

타입스크립트는 코드에서 판별 속성을 사용해 타입 내로잉을 수행한다.

```ts
type PoemWithPages = {
  name: string;
  pages: number;
  type: "pages";
};

type PoemWithRhymes = {
  name: string;
  rhymes: boolean;
  type: "rhymes";
};

type Poem = PoemWithPages | PoemWithRhymes;

const poem: Poem =
  Math.random() > 0.5
    ? { name: "Temp", pages: 7, type: "pages" }
    : { name: "Temp1", rhymes: true, type: "rhymes" };

// ok
if (poem.type === "pages") {
  poem.pages;
} else {
  poem.rhymes;
}

// Property 'pages' does not exist on type 'Poem'.
//   Property 'pages' does not exist on type 'PoemWithRhymes'
poem.pages;
```

## 4.4 교차 타입

타입스크립트 유니언 타입은 둘 이상의 다른 타입 중 하나의 타입이 될 수 있음을 나타냄

타입스크립트에서도 `&` 교차 타입(intersection type)을 사용해 여러 타입을 동시에 나타 냄

교차 타입은 일반적으로 여러 기존 객체 타입을 별칭 객체 타입으로 결합해 새로운 타입을 생성

```ts
type Artwork = {
  genre: string;
  name: string;
};

type Writing = {
  pages: number;
  name: string;
};

/**
 * 다음과 같음
 * {
 *    genre: string;
 *    name: string;
 *    pages: number;
 * }
 */
type WrittenArt = Artwork & Writing;
```

- 교차 타입은 유니언 타입과 결합할 수 있으며, 이는 하나의 타입으로 판별된 유니언 타입을 설명하는 데 유용함

### 4.4.1 교차 타입의 위험성

교차 타입은 유용한 개념이지만, 여러분 스스로나 타입스크립트 컴파일러를 혼동시키는 방식으로 사용하기 쉽다.

교차 타입을 사용할 때는 가능한 코드를 간결하게 유지해야 함

긴 할당 가능성 오류

- 유니언 타입과 결합하는 것처럼 복잡하고 교차 타입을 만들게 되면 할당 가능성 오류 메시지를 읽기 어려워짐
- 일련의 별칭으로 된 객체 타입으로 분할하면 오류에 관하여 읽기 쉬워 짐

never

- 교차 타입은 잘못 사용하기 쉽고 불가능한 타입을 생성함
- 대부분의 타입스크립트 프로젝트는 never 타입을 거의 사용하지 않지만 코드에서 불가능한 상태를 나타내기 위해 가끔 등장

```ts
// type NotPossible = never
type NotPossible = number & string;
```

## 4.5 마치며

다양한 객체를 다루는 방법을 살펴보며 타입 시스템에 대한 이해를 확장해 보았음

- 타입스크립트가 객체 타입 리터럴의 타입을 해석하는 방법
- 중첩과 선택적 속성을 포함한 객체 리터럴 타입 소개
- 객체 리터럴 타입의 유니언 타입 선언, 추론 및 타입 내로잉
- 판단된 유니언 타입과 판별값
- 교차 타입으로 객체 타입을 결합하는 방법
