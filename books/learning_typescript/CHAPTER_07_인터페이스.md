# CHAPTER07 인터페이스

**우리가 직접 만들 수 있는데 왜 지루한 내장 타입 형태만 사용하나요!**

인터페이스는 연관된 이름으로 객체 형태를 설명하는 또 다른 방법

인터페이스는 별칭으로 된 객체 타입과 여러 면에서 유사하지만 일반적으로 더 읽기 쉬운 오류 메시지, 더 빠른 컴파일러 성능, 클래스와의 더 나은 상호 운영성을 위해 선호됨

## 7.1 타입 별칭 vs 인터페이스

```ts
type Poet = {
  born: number;
  name: string;
};

let valueLater: Poet;

valueLater = {
  born: 1935,
  name: "temp",
};

// Type 'string' is not assignable to type 'Poet'.
valueLater = "temp2";

valueLater = {
  // Type 'boolean' is not assignable to type 'number'.
  born: true,
  name: "temp3",
};
```

인터페이스에 대한 타입스크립트의 할당 가능성 검사와 오류 메시지는 객체 타입에 실행되는 것과 동일

인터페이스와 타입 별칭 사이에는 몇 가지 주요 차이점이 있음

- 인터페이스는 속성 증가를 위해 병합할 수 있음
- 인터페이스는 클래스가 선언된 구조의 타입을 확인하는 데 사용할 수 있지만 타입 별칭은 사용할 수 없음
- 일반적으로 인터페이스에서 타입스크립트 타입 검사기가 더 빨리 작동
  - 인터페이스는 타입 별칭이 하는 것처럼 새로운 객체 리터럴의 동적인 복사 붙여넣기보다 내부적으로 더 쉽게 캐시할 수 있는 명명된 타입을 선언
- 인터페이스는 이름 없는 객체 리터럴의 별칭이 아닌 이름 있는(명명된) 객체로 간주되므로 어려운 특이 케이스에서 나타나는 오류 메시지를 좀 더 쉽게 읽을 수 있음

가능하다면 인터페이스 사용을 추천함

타입 별칭의 유니언 타입과 같은 기능이 필요할 때까지는 인터페이스를 사용하는 것이 좋음

## 7.2 속성 타입

타입스크립트는 인터페이스가 이런 이상한 부분을 모델링할 수 있도록 유용한 타입 스시템 도구를 제공함

### 7.2.1 선택적 속성

객체 타입과 마찬가지로 모든 객체가 필수적으로 인터페이스 속성을 가질 필요는 없음

타입 애너테이션 `:` 앞에 `?`를 사용해 인터페이스의 속성이 선택적 속성임을 나타낼 수 있음

```ts
interface Book {
  author?: string;
  pages: number;
}
```

### 7.2.2 읽기 전용 속성

경우에 따라 인터페이스에 정의된 객체의 속성을 재할당하지 못하도록 인터페이스 사용자를 차단하고 싶음

타입스크립트 속성 이름 앞에 `readonly` 키워드를 추가해 다른 값으로 설정될 수 없게 나타냄

`readonly` 속성은 평소대로 읽을 수 있지만 새로운 값으로 재할당하지 못함

```ts
interface Book {
  author?: string;
  readonly pages: number;
}

function bookInfo(book: Book) {
  console.log(book.pages);
  // Cannot assign to 'pages' because it is a read-only property.
  book.pages += 1;
}
```

### 7.2.3 함수와 메서드

타입스크립트는 인터페이스 멤버를 함수로 선언하는 두 가지 방법을 제공함

- 메서드 구문
  - 인터페이스 멤버를 `member(): void` 와 같이 객체 멤버로 호출되는 함수로 선언
- 속성 구문
  - 인터페이스의 멤버를 `member: () => void` 와 같이 독립 함수와 동일하게 선언

```ts
interface HasBothFunctionType {
  // 속성 구문
  property: () => string;
  // 메서드 구문
  method(): string;
}

const hasBoth: HasBothFunctionType = {
  property: () => "",
  method() {
    return "";
  },
};

// ok
hasBoth.property();
// ok
hasBoth.method();
```

- 메서드와 속성 선언은 대부분 서로 교환하여 사용할 수 있음
- 메서드는 readonly로 선언할 수 없지만 속성은 가능함
- 인터페이스 병합은 메서드와 속성을 다르게 처리
- 타입에서 수행되는 일부 작업은 메서드와 속성을 다르게 처리함

### 7.2.4 호출 시그니처

인터페이스와 객체 타입은 호출 시그니처(call signature)로 선언할 수 있음

- 호출 시그니처는 값을 함수처럼 호출하는 방식에 대한 타입 시스템의 설명
- 호출 시그니처가 선언한 방식으로 호출되는 값만 인터페이스에 할당할 수 있음
- 호출 시그치너는 함수 타입과 비슷하지만, 콜론 대신 화살표로 표시

```ts
type FunctionAlias = (input: string) => number;
interface CallSignature {
  (input: string): number;
}

// ok
const typedFunctionAlias: FunctionAlias = (input) => input.length;
// ok
const typedCallSignature: CallSignature = (input) => input.length;
```

- 호출 시그니처는 사용자 정의 속성을 추가로 갖는 함수를 설명하는 데 사용 할 수 있음
- 타입스크립트는 함수 선언에 추가된 속성을 해당 함수 선언의 타입에 추가하는 것으로 인식

### 7.2.5 인덱스 시그니처

타입스크립트는 인덱스 시그니처(index signature) 구문을 제공해 인터페이스의 객체가 임의의 키를 받고, 해당 키 아래의 특정 타입을 반환할 수 있음을 나타냄

인덱스 시그니처는 일반 속성 정의와 유사하지만 키 다음에 타입이 있고 `{[i: string]: ...}`과 같이 배열의 대괄호를 갖음

```ts
interface WordCounts {
  [i: string]: number;
}

const counts: WordCounts = {};

// ok
counts.apple = 0;
// ok
counts.banana = 1;
// Type 'boolean' is not assignable to type 'number'.
counts.cherry = false;
```

- 인덱스 시그니처는 객체에 값을 할당할 때 편리하지만 타입 안정성을 완벽하게 보장하지는 않음
- 인덱스 시그니처는 객체가 어떤 속성에 접근하든 간에 값을 반환해야 함을 나타냄

키/값 쌍을 저장하려고 하는데 키를 미리 알 수 없다면 Map을 사용하는 편이 더 안전함

#### 속성과 인덱스 시그니처 혼함

인터페이스는 명시적으로 명명된 속성과 포괄적인 용도의 string 인덱스 시그니처를 한번에 포함할 수 있다.

```ts
interface Temp {
  caseName: string;
  [i: string]: string;
}

const temp: Temp = {
  caseName: "test1",
  caseName2: "test2",
};

// Property 'caseName' is missing in type '{ caseName2: string; }' but required in type 'Temp'.
const temp2: Temp = {
  caseName2: "test2",
};
```

#### 숫자 인덱스 시그니처

인덱스 시그니처는 키로 string 대시 number 타입을 사용할 수 있지만, 명명된 속성은 그 타입을 포괄적인 용도의 string 인덱스 시그니처의 타입을 할당할 수 있어야 함

### 7.2.6 중첩 인터페이스

인터페이스 타입도 자체 인터페이스 타입 혹은 객체 타입을 속성으로 가질 수 있음

```ts
interface Novel {
  author: {
    name: string;
  };
  setting: Setting;
}

interface Setting {
  place: string;
  year: number;
}

let myNovel: Novel;

myNovel = {
  author: {
    name: "temp1",
  },
  setting: {
    place: "place1",
    year: 1812,
  },
};
```

## 7.3 인터페이스 확장

타입스크립트는 인터페이스가 다른 인터페이스의 모든 멤버를 복사해서 선언할 수 있는 확장된 인터페이스를 허용함

확장할 인터페이스의 이름 뒤에 extends 키워드를 추가해서 다른 인터페이스를 확장한 인터페이스라는 걸 표시함

인터페이스 화갖ㅇ은 프로젝트의 한 엔티티 타입이 다른 엔티티의 모든 멤버를 포함하는 상위 집합을 나타내는 실용적인 방법

```ts
interface Writting {
  title: string;
}

interface Novel extends Writting {
  pages: number;
}

let myNovel: Novel = {
  pages: 195,
  title: "my novel",
};
```

### 7.3.1 재정의된 속성

속성을 재선언하는 대부분의 파생 인터페이스는 해당 속성을 유니언 타입의 더 구체적인 하위 집합으로 만들거나 속성을 기본 인터페이스의 타입에서 확장된 타입으로 만들기 위해 사용함

```ts
interface Write {
  name: string | null;
}

// ok
interface WriteWithNull extends Write {
  name: string;
}

// Interface 'WriteNumWithNull' incorrectly extends interface 'Write'.
//   Types of property 'name' are incompatible.
//     Type 'number' is not assignable to type 'string'
interface WriteNumWithNull extends Write {
  name: number;
}
```

### 7.3.2 다중 인터페이스 확장

타입스크립트의 인터페이스는 여러 개의 다른 인터페이스를 확장해서 선언할 수 있음

```ts
interface TempNumber {
  giveNumber(): number;
}

interface TempString {
  giveString(): string;
}

interface TempMerge extends TempNumber, TempString {
  giveEither(): string | number;
}

function useGiveTemp(instance: TempMerge) {
  instance.giveEither();
  instance.giveNumber();
  instance.giveString();
}
```

## 7.4 인터페이스 병합

두 개의 인터페이스가 동일한 이름으로 동일한 스코프에 선언된 경우, 선언된 모든 필드를 포함하는 더 큰 인터페이스가 코드에 추가됨

일반적인 타입스크립트 개발에서는 인터페이스 병합을 자주 사용하지 않음

여러 곳에 선언되노면 코드를 이해하기 어려워지므로 가능하면 인터페이스 병합을 사용하지 않는 것이 좋음

그러나 인터페이스 병합은 외부 패키지 또는 Window 같은 내장된 전역 인터페이스를 보강하는 데 특히 유용함

```ts
interface Merged {
  firstStr: string;
}

interface Merged {
  secondNum: number;
}

/**
 * interface Merged {
 *   firstStr: string;
 *   secondNum: number;
 * }
 */
let tempMerged: Merged = {
  firstStr: "temp",
  secondNum: 1234,
};
```

### 7.4.1 이름이 충돌되는 멤버

병합된 인터페이스는 타입이 다른 동일한 이름의 속성을 여러 번 선언할 수 없음

속성이 이미 인터페이스에 선언되어 있다면 나중에 병합된 인터페이스에서도 동일한 타입을 사용해야 함
