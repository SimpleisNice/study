# CHAPTER10 제네릭

**타입 시스템에서 선언된 변수는 완전히 새롭게 타입된 세계가 된다!**

타입스크립트는 제네릭(generic)을 사용해 타입 간읜 관계를 알아낸다.

타입스크립트는 함수와 같은 구조체는 제네릭 타입 매개변수를 원하는 수만큼 선언할 수 있다.

제네릭 타입 매배견수는 제네릭 구조체와 각 사용법에 따라 타입이 결정됨

## 10.1 제네릭 함수

매개변수 괄호 바로 앞 홑화살괄호(<,>)로 묶인 타입 매개변수에 별칭을 배치해 함수를 제네릭으로 만듬

그러면 해당 타입 매개변수를 함수의 본문 내부의 매개변수 타입 에너테이션, 반환 타입 에너테이션, 타입 에너테이션에서 사용할 수 있음

```ts
function identity<T>(input: T) {
  return input;
}
// 제네릭 화살표 함수 구문은 .tsx 파일에서 JSX 구문과 충돌하므로 일부 제한이 있음
const identityArrow = <U>(input: U) => input;

// const genericStr: "me"
const genericStr = identity("me");
// const genericNum: 10
const genericNum = identity(10);
```

### 10.1.1 명시적 제네릭 호출 타입

제네릭 함수를 호출할 때 대부분의 타입스크립트는 함수가 호출되는 방식에 따라 타입 인수를 유추 함

```ts
function logWrapper<Input>(callback: (input: Input) => void) {
  return (input: Input) => {
    console.log("Input: ", input);
    callback(input);
  };
}

// function logWrapper<string>(callback: (input: string) => void): (input: string) => void
logWrapper((input: string) => {
  console.log(input.length);
});

// function logWrapper<unknown>(callback: (input: unknown) => void): (input: unknown) => void
logWrapper((input) => {
  // 'input' is of type 'unknown'.
  console.log(input.length);
});
```

기본값이 unknown으로 설정되는 것을 피하기 위해 타입스크립트에 해당 타입 인수가 무엇인지 명시적으로 알려주는 "명시적 제네릭 타입 인수"를 사용해 함수를 호출할 수 있음

타입스크립트는 매개변수가 타입 인수로 제공된 것과 일치하는지 확인하기 위해 제네릭 호출에서 타입 검사를 수행

```ts
function logWrapper<Input>(callback: (input: Input) => void) {
  return (input: Input) => {
    console.log("Input: ", input);
    callback(input);
  };
}

// function logWrapper<string>(callback: (input: string) => void): (input: string) => void
logWrapper<string>((input) => {
  console.log(input.length);
});
```

### 10.1.2 다중 함수 타입 매개변수

임의의 수의 타입 매개변수를 쉼표로 구분해 함수를 정의

제네릭 함수의 각 호출은 각 타입 매개변수에 대한 자체 값 집합을 확인할 수 있음

함수가 여러 개의 타입 매개변수를 선언하면 해당 함수에 대한 호출은 명시적으로 제네릭 타입을 모두 선언하지 않거나 모두 선언해야함

타입스크립트는 아직 제네릭 호출 중 일부 타입만을 유추하지 못함

```ts
function makeTuple<First, Second>(first: First, second: Second) {
  return [first, second] as const;
}

// function makeTuple<boolean, string>(first: boolean, second: string): readonly [boolean, string]
let tuple = makeTuple(true, "abc");

// function makeTuple<boolean, number>(first: boolean, second: number): readonly [boolean, number]
let tuple2 = makeTuple(true, 1234);

// Expected 2 type arguments, but got 1
let tuple3 = makeTuple<boolean>(false, 1234);
```

- 제네릭 구조에서 두 개보다 더 많은 타입 매개변수를 사용하지 마세요
- 런타임 함수 매개변수처럼 많이 사용할수록 코드를 읽고 이해하는 것이 점점 어려워짐

## 10.2 제네릭 인터페이스

인터페이스도 제네릭으로 선언할 수 있음

인터페이스는 함수와 유사한 제네릭 규칙을 따르며 인터페이스 이름 뒤 `<`과 `>` 사이에 선언된 임의의 수의 타입 매개변수를 갖는다.

해당 제네릭 타입은 나중에 멤버 타입과 같이 선언의 다른 곳에서 사용할 수 있음

```ts
interface Box<T> {
  inside: T;
}

// ok
let stringBox: Box<string> = {
  inside: "abc",
};

// ok
let numberBox: Box<number> = {
  inside: 123,
};

// Type 'boolean' is not assignable to type 'number'.
let incorrectBox: Box<number> = {
  inside: false,
};
```

### 10.2.1 유추된 제네릭 인터페이스 타입

제네릭 인터페이스의 타입 인수는 사용법에서 유추할 수 있음

타입스크립트는 제네릭 타입을 취하는 것으로 선언된 위치에 제공된 값의 타입에서 타입 인수를 유추함

```ts
interface LinkedNode<Value> {
  next?: LinkedNode<Value>;
  value: Value;
}

function getLast<Value>(node: LinkedNode<Value>): Value {
  return node.next ? getLast(node.next) : node.value;
}

// let lastDate: Date
let lastDate = getLast({
  value: new Date("09-13-1993"),
});

// let lastFruit: string
let lastFruit = getLast({
  next: {
    value: "banana",
  },
  value: "apple",
});

// Type 'boolean' is not assignable to type 'number'.
let lastMismatch = getLast({
  next: {
    value: 123,
  },
  value: false,
});
```

인터페이스가 타입 매개변수를 선언하는 경우, 해당 인터페이스를 참조하는 모든 타입 애너테이션은 이에 상응하는 타입 인수를 제공해야 함

## 10.3 제네릭 클래스

```ts
class Secret<Key, Value> {
  key: Key;
  value: Value;

  constructor(key: Key, value: Value) {
    this.key = key;
    this.value = value;
  }

  getValue(key: Key): Value | undefined {
    return this.key === key ? this.value : undefined;
  }
}

// const storage: Secret<number, string>
const storage = new Secret(1234, "temp");
```

제네릭 인터페이스와 마찬가지로 클래스를 사용하는 타입 애너테이션은 해당 클래스의 제네릭 타입이 무엇인지를 타입스크립트에 나타내야 함

### 10.3.1 명시적 제네릭 클래스 타입

제네릭 클래스 인스턴스화는 제네릭 함수를 호출하는 것과 동일한 타입 인수 유추 규칙을 따름

하지만 생성자에 전달된 인수에 클래스 타입 인수를 유추할 수 없는 경우에는 타입 인수의 기본값은 unknown이 됨

```ts
class Bus<Input> {
  #callback: (input: Input) => void;

  constructor(callback: (input: Input) => void) {
    this.#callback = (input: Input) => {
      console.log("INPUT", input);
      callback(input);
    };
  }
  call(input: Input) {
    this.#callback(input);
  }
}

// constructor Bus<string>(callback: (input: string) => void): Bus<string>
new Bus((input: string) => {
  console.log(input.length);
});

new Bus((input) => {
  // input' is of type 'unknown'.
  console.log(input.length);
});

// Argument of type '(input: boolean) => void' is not assignable to parameter of type '(input: string) => void'.
//   Types of parameters 'input' and 'input' are incompatible.
//     Type 'string' is not assignable to type 'boolean'.
new Bus<string>((input: boolean) => {
  // input' is of type 'unknown'.
  console.log(input.length);
});
```

### 10.3.2 제네릭 클래스 확장

제네릭 클래스는 extends 키워드 다음에 오는 기본 클래스로 사용할 수 있음

타입스크립트는 사용법에서 기본 클래스에 대한 타입 인수를 유추하지 않음

기본값이 없는 모든 타입 인수는 명시적으로 애너테이션을 사용해 지정해야함

```ts
class Quote<T> {
  lines: T;

  constructor(lines: T) {
    this.lines = lines;
  }
}

class SpokenQuote extends Quote<string[]> {
  speck() {
    console.log(this.lines.join("\n"));
  }
}

// (property) Quote<string>.lines: string
new Quote("sample.").lines;
// (property) Quote<number[]>.lines: number[]
new Quote([4, 1, 2, 3, 4]).lines;
// (property) Quote<string[]>.lines: string[]
new SpokenQuote(["sample1", "sample2"]).lines;
// Type 'number' is not assignable to type 'string'.
new SpokenQuote([4, 1, 2, 4, 5]).lines;
```

### 10.3.3 제네릭 인터페이스 구현

제네릭 클래스는 모든 필요한 매개변수를 제공함으로써 제네릭 인터페이스를 구현함

제네릭 인터페이스는 제네릭 기본 클래스를 확장하는 것과 유사하게 작동

기본 인터페이스의 모든 타입 매개변수는 클래스에 선언되어야 함

```ts
interface ActingCredit<Role> {
  role: Role;
}

class MoviePart implements ActingCredit<string> {
  role: string;
  speacking: boolean;

  constructor(role: string, speaking: boolean) {
    this.role = role;
    this.speacking = speaking;
  }
}

const part = new MoviePart("sample 1", true);
// (property) MoviePart.role: string
part.role;

// Property 'role' in type 'IncorrectExtension' is not assignable to the same property in base type 'ActingCredit<string>'.
//   Type 'boolean' is not assignable to type 'string'.
class IncorrectExtension implements ActingCredit<string> {
  role: boolean;
}
```

### 10.3.4 메서드 제네릭

클래스 메서드는 클래스 인스턴스와 별개로 자체 제네릭 타입을 선언할 수 있음

제네릭 클래스 메서드에 대한 각각의 호출은 각 타입 매개변수에 대해 다른 타입 인수를 갖음

```ts
class CreatePairFactory<Key> {
  key: Key;

  constructor(key: Key) {
    this.key = key;
  }

  createPair<Value>(value: Value) {
    return { key: this.key, value };
  }
}

const factory = new CreatePairFactory("role");

// const numPair: {
//     key: string;
//     value: number;
// }
const numPair = factory.createPair(10);
// const stringPair: {
//     key: string;
//     value: string;
// }
const stringPair = factory.createPair("sample");
```

### 10.3.5 정적 클래스 제네릭

클래스의 정적 멤버는 인스턴스 멤버와 구별되고 클래스의 특정 인스턴스와 연결되어 있지 않음

클래스의 정적 멤버는 클래스 인스턴스에 접근할 수 없거나 타입 정보를 지정할 수 없음

따라서 정적 클래스 메서더는 자체 타입 매개변수를 선언할 수 있지만 클래스에 선언된 어떤 타입 매개변수에도 접근할 수 없음

```ts
class BothLogger<OnInstance> {
  instanceLog(value: OnInstance) {
    console.log(value);
    return value;
  }

  static staticLog<OnStatic>(value: OnStatic) {
    // Static members cannot reference class type parameters.
    // let fromInstance: OnInstance;
    console.log(value);
    return value;
  }
}

const logger = new BothLogger<number[]>();
// const logger: BothLogger<number[]>
logger.instanceLog([1, 2, 3, 4]);
// (method) BothLogger<OnInstance>.staticLog<boolean[]>(value: boolean[]): boolean[]
BothLogger.staticLog([false, true]);
// (method) BothLogger<OnInstance>.staticLog<string>(value: string): string
BothLogger.staticLog<string>("sample1");
```

## 10.4 제네릭 타입 별칭

```ts
type Nullish<T> = T | null | undefined;
type CreatesValue<Input, Output> = (input: Input) => Output;
```

### 10.4.1 제네릭 판별된 유니온

제네릭 타입과 판별된 타입을 함께 사용하면 재사용 가능한 타입을 모델링하는 훌륭한 방법을 제공할 수 있음

```ts
interface FailureResult {
  error: Error;
  succeeded: false;
}

interface SuccessfulResult<Data> {
  data: Data;
  succeeded: true;
}

type Result<Data> = FailureResult | SuccessfulResult<Data>;

function handleResult(result: Result<string>) {
  if (result.succeeded) {
    console.log("we did ", result.data);
  } else {
    console.error("Awwww... ", result.error);
  }
  // Property 'data' does not exist on type 'Result<string>'.
  //   Property 'data' does not exist on type 'FailureResult'.
  result.data;
}
```

## 10.5 제네릭 제한자

타입스크립트는 제네릭 타입 매개변수의 동작을 수정하는 구문도 제공함

### 10.5.1 제네릭 기본값

기본값은 타입 인수가 명시적으로 선언되지 않고 유추할 수 없는 모든 후속 타입에 사용됨

```ts
interface Quote<T = string> {
  value: T;
}

// ok
let explicit: Quote<number> = { value: 1234 };
// ok
let implicit: Quote = { value: "sample" };
// Type 'number' is not assignable to type 'string'.
let misMatch: Quote = { value: 1234 };
```

```ts
interface KeyValuePair<Key, Value = Key> {
  key: Key;
  value: Value;
}

let allExplicit: KeyValuePair<string, number> = {
  key: "sample1",
  value: 10,
};
```

모든 기본 타입 매개변수는 기본 함수 매개변수처럼 선언 목록의 제일 마지막에 와야함

## 10.6 제한된 제네릭 타입

기본적으로 제네릭 타입에는 클래스, 인터페이스, 원싯값, 유니언, 별칭 등 모든 타입을 제공할 수 있음

하지만 일부 함수는 제한된 타입에서만 작동해야 함

```ts
interface WithLength {
  length: number;
}

function logWithLength<T extends WithLength>(input: T) {
  console.log(`Length: ${input.length}`);
  return length;
}

// ok
logWithLength("sample1");
logWithLength([false, true]);
logWithLength({ length: 123 });

// Argument of type 'Date' is not assignable to parameter of type 'WithLength'.
//   Property 'length' is missing in type 'Date' but required in type 'WithLength'.
logWithLength(new Date());
```

### 10.6.1 keyof와 제한된 타입 매개변수

extends와 keyof를 함께 사용하면 타입 매개변수를 이전 타입 매개변수의 키로 제한할 수 있음

또한 제네릭 타입의 키를 지정하는 유일한 방법이기도 함

```ts
function get<T, Key extends keyof T>(container: T, key: Key) {
  return container[key];
}
```

## 10.7 Promise

Promise는 네트워크 요청과 같이 요청 이후 결과를 받기까지 대기가 필요한 것을 나타냄

Promise는 타입스크립트 타입 시스템에서 최종적으로 resolve된 값을 나타내는 단일 타입 매개변수를 가진 Promise 클래스로 표현됨

### 10.7.1 Promise 생성

타입스크립트에서 Promise 생성자는 단일 매개변수를 받도록 작성됨

```ts
// const resolvesUnknown: Promise<unknown>
const resolvesUnknown = new Promise((resolve) => {
  setTimeout(() => resolve("DONE!"), 1000);
});

// const resolvesString: Promise<string>
const resolvesString = new Promise<string>((resolve) => {
  setTimeout(() => resolve("DONE!"), 1000);
});
```

### 10.7.2 async 함수

자바스크립트에서 async 키워드를 사용해 선언한 모든 함수는 Promise를 반환

```ts
// function sampleFunc(text: string): Promise<void>
async function sampleFunc(text: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
}
// function sampleNumFun(text: string): Promise<number>
async function sampleNumFun(text: string) {
  return text.length;
}
```

## 10.8 제네릭 올바르게 사용하기

### 10.8.1 제네릭 황금률

### 10.8.2 제네릭 명명 규칙

타입스크립트를 포함한 많은 언어가 지키는 타입 매개변수에 대한 표준 명명 규칙은 기본적으로 첫 번째 타입 인수로 T를 사용하고, 후속 타입 매개변수가 존재하면 U,V 등을 사용하는 것

타입 인수가 어떻게 사용되어야 하는지 맥랙과 관련된 정보가 알려진 경우 명명 규칙은 경우에 따라 해당 용어의 첫 글자를 사용하는 것으로 확장

구조체가 여러 개의 타입 매개변수를 갖거나 단일 인수의 목적이 명확하지 않을 떄마다 단일 문자 약어 대신 가독성을 위해 완전히 작성된 이름을 사용하는 것이 좋다.
