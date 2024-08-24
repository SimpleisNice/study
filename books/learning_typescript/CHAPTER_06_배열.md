# CHAPTER06 배열

**유연한 배열과 고정된 튜플 모험을 선택하세요!**

타입스크립트는 초기 배열에 어떤 데이터 타입이 있는지 기억하고, 배열이 해당 데이터 타입에서만 작동하도록 제한

```ts
const tempItems = ["temp1", "temp2"];

tempItems.push("temp3");

// Argument of type 'boolean' is not assignable to parameter of type 'string'.
tempItems.push(true);
```

## 6.1 배열 타입

배열을 저장하기 위한 변수는 초깃값이 필요하지 않음

변수는 undefined로 시작해서 나중에 배열 값을 받을 수 있음

타입스크립트는 변수에 타입 애너테이션을 제공해 배열이 포함해야 하는 값의 타입을 알려주려고 함

```ts
let tempArrayItems: number[];
tempArrayItems = [1, 2, 3, 4, 5];
```

### 6.1.1 배열과 함수 타입

배열 타입은 함수 타입에 무엇이 있는지 구별하는 괄호가 필요한 구문 컨테이너의 예이다.

괄호는 애너테이션의 어느 부분이 함수 반환 부분이고 어느 부분이 배열 타입 묶음인지를 나타내기 위해 사용

### 6.1.2 유니언 타입 배열

배열의 각 요소가 여러 선택 타입 중 하나일 수 있음을 나타내려면 유니언 타입을 사용함

```ts
let stringOrArrayOfNumbers: string | number[];
let arrayOfStringOrNumbers: (string | number)[];
```

### 6.1.3 any 배열의 진화

```ts
// any[]
const tempItems = [];

tempItems.push("");

tempItems[0] = 0;

// (string | number)[]
tempItems;
```

위와 같이 변화할 수 있지만, 변수와 마찬가지로 배열이 any 타입이 되도록 허용하거나 일반적으로 any 타입을 사용하도록 하면 타입스크립트의 타입 검사 목적을 부분적으로 무효화 한다.

### 6.1.4 다차원 배열

```ts
let arrayOfArrayOfNumbers: number[][];
```

## 6.2 배열 멤버

타입스크립트는 배열의 멤버를 찾아 해당 배열의 타입 요소를 되돌려주는 전형적인 인덱스 기반 접근 방식을 이해하는 언어

```ts
const arrayOfStrings = ["temp1", "temp2"];
const tempString = arrayOfStrings[0];
```

유니언 타입으로 된 배열의 멤버는 그 자체로 동일한 유니언 타입

```ts
const arrayOfUnions = [1234, true];

// const arrayOfUnions: (number | boolean)[]
const unionTemp = arrayOfUnions[0];
```

### 6.2.1 주의 사항: 불안정한 멤버

```ts
const arrayOfStrings: string[] = [];
const tempString = arrayOfStrings[9000].length;

// const tempString: number
console.log(tempString);
```

- 런타임 시 `Cannot read properties of undefined (reading 'length')` 에러가 발생
- 타입스크립트는 검색된 배열의 멤버가 존재하는지 의도적으로 확인하지 않음

## 6.3 스프레드와 나머지 매개변수

`...` 연산자를 사용하는 나머지 매개변수와 배열 스프레드는 자바스크립트에서 배열과 상호작용하는 핵심 방법

### 6.3.1 스프레드

`...` 스프레드 연산자를 사용해 배열을 결합

타입스크립트는 입력된 배열 . 중하나의 값이 결과 배열에 포함될 것임을 이해함

배열이 동일한 타입이라면, 출력 배열도 동일한 타입

서로 다른 타입의 두 배열을 함께 스프레드해 새 배열을 생성하면 새 배열은 두 개의 원래 타입 중 어느 하나의 요소인 유니언 타입 배열로 이해됨

### 6.3.2 나머지 매개변수 스프레드

타입스크립트는 나머지 매개변수로 배열을 스프레드하는 자바스크립트 실행을 인식하고 이에 대해 타입 검사를 수행함

나머지 매개변수를 위한 인수로 사용되는 배열은 나머지 매개변수와 동일한 배열 타입을 가져야함

```ts
function logTemp(greeting: string, ...names: string[]) {
  for (const name of names) {
    console.log(`${greeting}, ${name}`);
  }
}

const tempArray = ["temp1", "temp2"];

logTemp("Hello", ...tempArray);

const tempArray2 = [1, 2, 3, 4];

// Argument of type 'number' is not assignable to parameter of type 'string'.
logTemp("temp count", ...tempArray2);
```

## 6.4 튜플(tuple)

튜플 배열은 각 인덱스에 알려진 특정 타입을 가지며 배열의 모든 가능한 멤버를 갖는 유니언 타입보다 더 구체적

튜플 타입을 선언하는 구문은 배열 리터럴처럼 보이지만 요소의 값 대신 타입을 작성

```ts
let yearAndTemp: [number, string];

// ok
yearAndTemp = [540, "temp1"];
// Type 'boolean' is not assignable to type 'number'.
yearAndTemp = [false, "temp2"];
// ype '[number]' is not assignable to type '[number, string]'.
//  Source has 1 element(s) but target requires 2.
yearAndTemp = [540];
```

자바스크립트에서는 단일 조건을 기반으로 두개의 변수에 초깃값을 설정하는 것처럼 한 번에 여러 값을 할당하기 위해 튜플과 배열 구조 분해 할당을 함께 자주 사용함

```ts
let [year, temp] = Math.random() > 0.5 ? [340, "temp1"] : [333, "temp2"];
```

### 6.4.1 튜플 할당 가능성

타입스크립트에서 튜플 타입은 가변 길이의 배열 타입보다 더 구체적으로 처리됨

즉, 가변 길이의 배열 타입은 튜플 타입에 해당할 수 없음

```ts
let tempArray = [false, 12];
// Type '(number | boolean)[]' is not assignable to type '[boolean, number]'.
//   Target requires 2 element(s) but source may have fewer.
const tempTuple: [boolean, number] = tempArray;
```

나머지 매개변수로서의 튜플

- 튜플은 구체적인 길이와 요소 타입 정보를 가지는 배열로 간주되며 함수에 전달할 인수를 저장하는 데 특히 유용함
- 타입스크립트는 `...` 나머지 매개변수로 전달된 튜플에 정확한 타입 검사를 제공할 수있음

```ts
function logPair(name: string, value: number) {
  console.log(`${name} ${value}`);
}

const pairArray = ["temp", 1];
// A spread argument must either have a tuple type or be passed to a rest parameter
logPair(...pairArray);

const pairTubleIncorrect: [number, string] = [1, "temp"];
// Argument of type 'number' is not assignable to parameter of type 'string'.
logPair(...pairTubleIncorrect);

const pairTubleCorrect: [string, number] = ["temp", 1];
// ok
logPair(...pairTubleCorrect);
```

#### 6.4.2 튜플 추론

타입스크립트는 생성된 배열을 튜플이 아닌 가변 길이의 배열로 취급함

배열이 변수의 초깃값 또는 함수에 대한 반환값으로 사용되는 경우, 고정된 크기의 튜플이 아니라 유연한 크기의 배열로 가정함

```ts
// function firstCharAndSize(input: string): (string | number)[]
function firstCharAndSize(input: string) {
  return [input[0], input.length];
}
const [firstChar, size] = firstCharAndSize("Guide");
```

구체적인 튜플 타입이어야 함을 다음의 두가지 방법으로 나타 냄

- 명시적 튜플 타입
- const 어서션

명시적 튜플의 경우

```ts
// function firstCharAndSize(input: string): [string, number
function firstCharAndSize(input: string): [string, number] {
  return [input[0], input.length];
}
const [firstChar, size] = firstCharAndSize("Guide");
```

const 어서션의 경우

- const 어서션은 타입스크립트에 타입을 유추할 때 읽기 전용이 가능한 값 형식을 사용하도록 지시함

```ts
const temp1: [number, string] = [123, "temp"];
temp1[0] = 1234;

const temp2: [number, string] = [123, "temp2"] as const;
temp2[0] = 11222;

const temp3 = [1234, "temp3"] as const;
// Cannot assign to '0' because it is a read-only property.
temp3[0] = 12335;
```
