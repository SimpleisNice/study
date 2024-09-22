# CHAPTER09 타입 제한자

"타입 제한자"와 "제네릭"에서는 타입 시스템에서 한걸음 더 나아가 다른 타입을 기반으로 하는 타입뿐만 아니라 더 정확한 타입 작성에 중점을 둔 기능을 다룸

## 9.1 top 타입

top 타입은 시스템에서 가능한 모든 값을 나타내는 타입

모든 다른 타입의 값은 타입이 top인 위치에 제공될 수 있음

즉, 모든 타입은 top 타입에 할당할 수 있음

### 9.1.1 any 다시 보기

any 타입은 모든 타입의 위치에 제공될 수 있다는 점에서 top 타입처럼 작동할 수 있다.

any 는 타입스크립트가 해당 값에 대한 할당 가능성 또한 멤버에 대해 타입 검사를 수행하지 않도록 명시적으로 지시한다는 문제점이 있음

### 9.1.2 unknown

타입스크립트에서 unknown 타입은 진정한 top 타입

모든 객체를 unknown 타입의 위치로 전달할 수 있는 점에서 any 타입과 유사함

unknown 타입과 any 타입의 주요 차이점으로는 타입스크립트는 unknown 타입의 값을 훨씬 더 제한적으로 취급한다는 점

- 타입스크립트는 unknown 타입 값의 속성에 직접 접근할 수 없음
- unknown 타입은 top 타입이 아닌 타입에는 할당할 수 없음

타입스크립트가 unknown 타입에 접근할 수 있는 유일한 방법은 instanceof 나 typeof 또는 타입 어서션을 사용하는 것처럼 값의 타입이 제한된 경우

```ts
function busName(name: unknown) {
  if (typeof name === "string") {
    console.log(`Bus Name is ${name.toUpperCase()}`);
  }
}
```

unknown 타입 값의 두 가지 제한으로 인해 unknown이 any보다 훨씬 안전한 타입으로 사용됨

## 9.2 타입 서술어

타입스크립트에는 인수가 특정 타입인지 여부를 나타내기 위해 boolean 값을 반환하는 함수를 위한 특별한 구문이 있음

이를 타입 서술어(type predicate)라고 부르며 "사용자 정의 타입 가드"라고도 부름

타입 서술어는 일반적으로 매개변수로 전달된 인수가 매개변수의 타입보다 더 구체적인 타입인지 여부를 나타내는 데 사용됨

```ts
function isNumberOfString(value: unknown): value is number | string {
  return ["number", "string"].includes(typeof value);
}

function logValue(value: number | string | null | undefined) {
  if (isNumberOfString(value)) {
    // (parameter) value: string | number
    value.toString();
  }
}
```

타입 서술어는 이미 한 인터페이스의 인스턴스로 알려진 객체가 더 구체적인 인터페이스의 인스턴스인지 여부를 검사하는 데 자주 사용됨

```ts
interface Bus {
  busType: string;
  busName: string;
}

interface SchoolBus extends Bus {
  schoolName: string;
}

function isSchoolBus(value: Bus): value is SchoolBus {
  return "schoolName" in value;
}

function getSchoolBusName(value: Bus) {
  if (isSchoolBus(value)) {
    console.log(value.schoolName);
  }
}
```

## 9.3 타입 연산자

### 9.3.1 keyof

타입스크립트에서는 기존에 존재하는 타입을 사용하고, 해당 타입에 허용되는 모든 키의 조합을 반환하는 keyof 연산자를 제공함

```ts
interface Ratings {
  audience: number;
  critics: number;
}

function getCountKeyof(ratings: Ratings, key: keyof Ratings): number {
  return ratings[key];
}
```

keyof는 존재하는 타입의 키를 바탕으로 유니언 타입을 생성하는 훌륭한 기능

### 9.3.2 typeof

typeof는 제공되는 값의 타입을 반환

typeof는 값의 타입을 수동으로 작성하는 것이 짜증날 정도로 복잡한 경우에 사용하면 매우 유용

```ts
const original = {
  medium: "movie",
  title: "Mean Girls",
};

// let adaptation: {
//     medium: string;
//     title: string;
// }
let adaptation: typeof original;

// ok
adaptation = {
  ...original,
  medium: "play",
};
```

자바스크립트의 typeof 연산자는 타입에 대한 문자열 이름을 반환하는 런타임 연산자

타입스크립트의 typeof 연산자는 타입스크립트에서만 사용할 수 있으며 컴파일된 자바스크립트 코드에는 나타나지 않음

#### keyof typeof

typeof는 값의 타입을 검색하고, keyof는 타입에 허용된 키를 검색함

타입스크립트는 두 키워드를 함께 연결해 값의 타입에 허용된 키를 간결하게 검색할 수 있음

```ts
const original = {
  medium: "movie",
  title: "Mean Girls",
};

function logRating(key: keyof typeof original) {
  console.log(original[key]);
}

// ok
logRating("medium");

// Argument of type '"temp"' is not assignable to parameter of type '"medium" | "title"'.
logRating("temp");
```

## 9.4 타입 어서션

타입스크립트는 값의 타입에 대한 타입 시스템의 이해를 재정의하기 위한 구문으로 타입 어서션을 제공한다.

```ts
const bus = "['bus1', 'bus2']";

// any
const temp1 = JSON.parse(bus);
// string[]
const temp2 = JSON.parse(bus) as string[];
```

타입 어서션은 타입스크립트 타입 시스템에만 존재하며 자바스크립트로 컴파일될 때 다른 타입 시스템 구문과 함께 제거됨

### 9.4.1 포착된 오류 타입 어서션

코드 영역이 Error 클래스의 인스턴스를 발생시킬 거라 틀림없이 확신한다면 타입 어서션을 사용해 포착된 어서션을 오류로 처리할 수 있다.

```ts
try {
  // 오류를 발생 시키는 코드
} catch (error) {
  console.warn("Error", error instanceof Error ? error.message : error);
}
```

### 9.4.2 non-null 어서션

null과 undefined를 제거할 때 타입 어서션을 주로 사용

```ts
const maybeDate = Math.random() > 0.5 ? undefined : new Date();

// 타입이 Date라고 간주됨
maybeDate as Date;

// 타입이 Date라고 간주됨
maybeDate!;
```

### 9.4.3 타입 어서션 주의 사항

any 타입과 마찬가지로 타입 어서션은 타입스크립트의 타입 시스템에 필요한 하나의 도피 수단이다.

따라서 any 타입을 사용할 때처럼 꼭 필요한 경우가 아니라면 가능한 한 사용하지 말아야 한다.

## 9.5 const 어서션

const 어서션은 배열, 원시타입, 값, 별칭 등 모든 값을 상수로 취급해야 함을 나타내는 데 사용함

- 배열은 가변 배열이 아니라 읽기 전용 튜플로 취급됨
- 리터럴은 일반적인 원시 타입과 동등하지 않고 리터럴로 취급됨
- 객체의 속성은 읽기 전용으로 간주

```ts
// const temp1: (string | number)[]
const temp1 = [0, ""];
// const temp2: readonly [0, ""]
const temp2 = [0, ""] as const;
```

### 9.5.1 리터럴에서 원시 타입으로

타입 시스템이 리터럴 값을 일반적인 원시 타입으로 확장하기보다 특정 리터럴로 이해하는 것이 유용할 수 있음

```ts
// const getName: () => string
const getName = () => "my name";
// const getNameConst: () => "my name const"
const getNameConst = () => "my name const" as const;
```

### 9.5.2 읽기 전용 객체

변수의 초깃값으로 사용되는 것과 같은 객체 리터럴은 let 변수의 초깃값이 확장되는 것과 동일한 방식으로 속성 타입을 확장함

값 리터럴에 const 어서션을 적용하면 해당 값 리터럴이 변경되지 않고 모든 멤버에 동일한 const 어서션 로직이 재귀적으로 적용됨

```ts
function descriptionPreference(preference: "maybe" | "no" | "yes") {
  switch (preference) {
    case "maybe":
      return "i suppose";
    case "no":
      return "no thanks";
    case "yes":
      return "yes please";
  }
}

// const preferenceMutable: {
//     movie: string;
//     standup: string;
// }
const preferenceMutable = {
  movie: "maybe",
  standup: "yes",
};

// Argument of type 'string' is not assignable to parameter of type '"maybe" | "no" | "yes"'.
descriptionPreference(preferenceMutable.movie);

// ok
preferenceMutable.movie = "no";

// const preferenceReadonly: {
//     readonly movie: "maybe";
//     readonly standup: "yes";
// }
const preferenceReadonly = {
  movie: "maybe",
  standup: "yes",
} as const;

// ok
descriptionPreference(preferenceReadonly.movie);

// Cannot assign to 'movie' because it is a read-only property.
preferenceReadonly.movie = "no";
```
