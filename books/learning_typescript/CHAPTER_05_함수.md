# CHAPTER05 함수

** 한쪽 끝에는 함수 인수가 있고 다른 쪽 끝에는 반환 타입이 있습니다.**

## 5.1 함수 매개변수

```ts
function singA(song) {
  console.log(`${song}`);
}
function singB(song: string) {
  console.log(`${song}`);
}
```

### 5.1.1 필드 매개변수

타입스크립트는 함수에 선언된 모든 매개변수가 필수라고 가정

함수가 잘못된 수의 인수로 호출되면, 타입스크립트는 타입 오류의 형태로 이의를 제기함

함수에 필드 매개변수(required parameter)를 제공하도록 강제하면 예상되는 모든 인숫값을 함수 내에 존재하도록 만들어 타입 안정성을 강화하는 데 도움이 됨

```ts
function sing(first: string, second: string) {
  console.log(`${first} / ${second}`);
}

// Expected 2 arguments, but got 1.
sing("sample1");
// ok
sing("sample1", "sample2");
// Expected 2 arguments, but got 3.
sing("sample1", "sample2", "sample3");
```

- 매개변수는 인수로 받을 것으로 예상되는 함수의 선언을 나타냄
  - first, second는 매개변수
- 인수는 함수를 호출할 때 매개 변수에 제공되는 값을 나타냄
  - "sample1"와 같은 문자열은 인수

### 5.1.2 선택전 매개변수

타입스크립트에서는 선택적 객체 타입 속성과 유사하게 타입 애너테이션의 `:` 앞에 `?`를 추가해 매개변수가 선택적이라고 표시함

선택적 매개변수는 항상 `| undefined`가 유니언 타입으로 추가되어 있음

함수에 사용되는 모든 선택적 매개변수는 마지막 매개변수여야 함

```ts
// 'song' is declared but its value is never read.
function announceSinger(singer?: string, song: string) {}
```

### 5.1.3 기본 매개변수

타입스크립트는 함수의 매개변수에 대한 인수를 누락하거나 undefined 인수를 사용해서 호출하는 것을 여전히 허용 함

타입스크립트의 타입 추론은 초기 변숫값과 마찬가지로 기본 함수 매개변수에 대해서도 유사하게 작동

매개변수에 기본값이 있고 타입 애너테이션이 없는 경우, 타입스크립트는 해당 기본값을 기반으로 매개변수 타입을 유추

```ts
function sing(singer: string, rating = 0) {
  console.log(`${singer} ${rating}`);
}

// ok
sing("temp");
// ok
sing("temp", 5);
// Argument of type 'string' is not assignable to parameter of type 'number'
sing("temp", "100");
```

### 5.1.4 나머지 매개변수

`...` 스프레드 연산자는 함수 선언의 마지막 매개변수에 위치하고, 해당 매개변수에서 시작해 함수에 전달된 `나머지(rest)`인수가 모두 단일 배열에 저장되어야 함을 나타냄

타입스크립트는 이러한 나머지 매개변수의 타입을 일반 매개변수와 유사하게 선언할 수 있음

단, 인수 배열을 나타내기 위해 끝에 [] 구문이 추가된다는 점

```ts
function sings(singer: string, ...songs: string[]) {
  for (const song of songs) {
    console.log(`${song}, by ${singer}`);
  }
}

// ok
sings("TEMP1");
// ok
sings("TEMP1", "song1");
// ok
sings("TEMP1", "song1", "song2");
// Argument of type 'number' is not assignable to parameter of type 'string'
sings("TEMP1", 2000);
```

## 5.2 반환 타입

타입스크립트는 지각적(perceptive)이다.

함수가 반환할 수 있는 가능한 모든 값을 이해하면 함수가 반환하는 타입을 알 수 있음

```ts
// function getSong(songs: string[], index: number): string | undefined
function getSong(songs: string[], index: number) {
  return index < songs.length ? songs[index] : undefined;
}
```

### 5.2.1 명시적 반환 타입

변수와 마찬가지로 타입 애너테이션을 사용해 함수의 반환 타입을 명시적으로 선언하지 않는 것이 좋다.

그러나 특히 함수에서 반환 타입을 명시적으로 선언하는 방식이 매우 유용할 때가 종좋있음

- 가능한 반환값이 많은 함수가 항상 동일한 타입의 값을 반환하도록 강제
- 타입스크립트는 재귀 함수의 반환 타입을 통해 타입을 유추하는 것을 거부함
- 수배 개 이상의 타입스크립트 파일이 있는 매우 큰 프로젝트에서 타입스크립트 타입 검사 속도를 높일 수 있다.

```ts
function sing(): number {
  return 100;
}
const singArrow = (): number => {
  return 100;
};
```

## 5.3 함수 타입

함수를 가지기 위해 매개변수 또는 변수의 타입을 선언하는 방법이 필요함

```ts
let sample_1: () => string;
let sample_2: (songs: string[], count?: number) = number;
```

함수 타입은 콜백 매개변수(함수로 호출되는 매개변수)를 설명하는 데 자주 사용 됨

### 5.3.1 함수 타입 괄호

함수 타입은 다른 타입이 사용되는 모든 곳에 배치할 수 있음

유니언 타입의 애너테이션에서 함수 변환 위치를 나타내거나 유니언 타입을 감싸는 부분을 표시할 때 괄호를 사용함

```ts
let returnsStringOrUndefined: () => string | undefined;
let maybeReturnsString: (() => string) | undefined;
```

### 5.3.2 매개변수 타입 추론

타입스크립트는 선언된 타입의 위치에 제공된 함수의 매개변수 타입을 유추할 수 있음

```ts
let singer: (song: string) => string;

// (local function)(song: string): string
singer = function (song) {
  // ok
  return `to: ${song.toString()}`;
};
```

### 5.3.3 함수 타입 별칭

함수 타입에서도 타입 별칭을 사용할 수 있음

```ts
type StringToNumber = (input: string) => number;
let stringToNumber: StringToNumber;

stringToNumber = (input) => input.length;
```

## 5.4 그 외 반환 타입

void, never 두 반환 타입에 대해 알아봅시다.

### 5.4.1 void 반환 타입

타입스크립트는 void 키워드를 사용해 반환 값이 없는 함수의 반환 타입을 확인할 수 있습니다.

```ts
function logSong(song: string | undefined): void {
  // ok
  if (!song) {
    return;
  }

  console.log(`${song}`);

  // Type 'boolean' is not assignable to type 'void'
  return true;
}
```

함수 타입 선언 시 void 반환 타입은 매우 유용함

- 함수 타입을 선언언할 때 void를 사용하면 함수에서 반횐되는 모든 값은 무시됨
- void와 undefined는 동일하지 않음
- void 타입은 함수의 반환값이 자체적으로 반환될 수 있는 값도 아니고, 사용하기 위한 것도 아니라는 표시임

```ts
function returnsVoid() {
  return;
}

let lazyValue: string | undefined;

// Type 'void' is not assignable to type 'string | undefined'.
lazyValue = returnsVoid();
```

### 5.4.2 never 반환 타입

never 반환 함수는 (의도적으로) 항상 오류를 발생시키거나 무한 루프를 실행하는 함수

함수가 절대 반환하지 않도록 의도하려면 명시적 `: never` 타입 애너테이션을 추가해 해당 함수를 호출한 후 모든 코드가 실행되지 않음을 나타냄

```ts
function fail(message: string): never {
  throw new Error(`invariant failure: ${message}`);
}

function workWithUnsafeParam(param: unknown) {
  if (typeof param !== "string") {
    fail(`param should be a string, not ${typeof param}`);
  }

  // ok
  param.toUpperCase();
}
```

- 타입스크립트의 제어 흐름 분석(control flow analysis)을 도와 줌

## 5.5 함수 오버로드

일부 자바스크립트 함수는 선택적 매개변수와 나머지 매개변수만으로 표현할 수 없는 매우 다른 매개변수들로 호출될 수 있다.

- 위와 같은 함수는 `오버로드 시그니처` 라고 불리는 타입스크립트 구문으로 설명할 수 있다.
- 즉, 하나의 최종 `구현 시그니처`와 그 함수의 본문 앞에 서로 다른 버전의 함수 이름, 매개변수, 반환 타입을 여러 번 선언

오버로드된 함수 호출에 대해 구문 오류를 생성할지 여부를 결정할 때 타입스크립트는 함수의 오버로드 시그니처만 확인

- 구현 시그니처는 함수의 내부 로직에만 사용됨

```ts
function createDate(timestamp: number): Date;
function createDate(month: number, day: number, year: number): Date;
function createDate(monthOrTimestap: number, day?: number, year?: number) {
  return day === undefined || year === undefined
    ? new Date(monthOrTimestap)
    : new Date(year, monthOrTimestap, day);
}

// ok
createDate(55435050);
// ok
createDate(7, 27, 1987);

// No overload expects 2 arguments, but overloads do exist that expect either 1 or 3 arguments
createDate(4, 1);
```

- 타입스크립트를 컴파일해 자바스크립트로 출력하면 다른 타입 시스템 구문처럼 오버로드 시그니처도 지워짐
- 함수 오버로드는 복잡하고 설명하기 어려운 함수 타입에 사용하는 최후의 수단
  - 함수를 단순하게 유지하고 가능하면 함수 오버로드를 사용하지 않는 것이 좋음

### 5.5.1 호출 시그니처 호환성

오버로드된 함수의 구현에서 사용되는 구현 시그니처는 매개변수 타입과 반환 타입에 사용하는 것과 동일함

따라서 함수의 오버로드 시그니처에 있는 반환 타입과 각 매개변수는 구현 시그니처에 있는 동일한 인덱스의 매개변수에 할당할 수 있어야 함

- 구현 시그니처는 모든 오버로드 시그니처와 호환되어야 함

```ts
function format(data: string): string;
function format(data: string, needle: string, haystack: string): string;
// This overload signature is not compatible with its implementation signature.
function format(getDate: () => string): string;
function format(data: string, needle?: string, haystack?: string) {
  return needle && haystack ? data.replace(needle, haystack) : data;
}
```

## 5.6 마치며

타입스크립트에서 함수의 매개변수와 반환 타입을 유추하거나 명시적으로 선언하는 방법을 살펴 보았음
