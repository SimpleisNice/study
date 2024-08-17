# CHAPTER03 유니언과 리터럴

상수를 제외한 모든 것은 변합니다. 시간이 지나면서도 값도 변할 수 있습니다.

TS가 해당 값을 바탕으로 추론을 수행하는 두 가지 핵심 개념

- 유니언(union): 값에 허용된 타입을 두 개 이상의 가능한 타입으로 확장하는 것
- 내로인(narrowing): 값에 허용된 타입이 하나 이상의 가능한 타입이 되지 않도록 좁히 것

종합하자면 유니온과 내로인은 TS에서 가능한 "코드 정보에 입각한 추론"을 해내는 강력한 개념

## 3.1 유니언 타입

"이것 혹은 저거"와 같은 타입을 `유니언`이라고 한다.

TS는 가능한 값 또는 구성 요소 사이에 `|(수직선)` 연산자를 사용해 유니언 타입을 나타냄

```ts
// let mathmatician: string | undefined
let mathmatician = Math.random() > 0.5 ? undefined : "Mark Goldberg";
```

- mathmatician는 string | undefined 타입으로 간주 됨

### 3.1.1 유니언 타입 선언

변수의 초깃값이 있더라도 변수에 대한 명시적 타입 애너테이션을 제공하는 것이 유용할 때 유니언 타입을 사용 함

### 3.1.2 유니언 속성

값이 유니언 타입일 때 TS는 유니언으로 선언한 모든 가능한 타입에 존재하는 멤버 속성에만 접근할 수 있음

유니언 외의 타입에 접근하려고 하면 타입 검사 오류가 발생함

```ts
let physicist = Math.random() > 0.5 ? "Marie Curie" : 84;

// ok
physicist.toString();

// Property 'toUpperCase' does not exist on type 'string | number'.
//  Property 'toUpperCase' does not exist on type 'number'.
physicist.toUpperCase();

// Property 'toFixed' does not exist on type 'string | number'.
//   Property 'toFixed' does not exist on type 'string'
physicist.toFixed();
```

- 모든 유니언 타입에 존재하지 않는 속성에 대한 접근을 제한하는 것은 안전 조치에 해당 함
- 유니언 타입을 정의된 여러 타입 중 하나의 타입으로 된 값의 속성을 사용하려면 코드에서 값이 보다 구체적인 타입 중 하나라는 것을 TS에 알려줘야함

## 3.2 내로잉(narrowing)

`내로잉`은 값이 정의, 선언 혹은 이전에 유추된 것보다 더 구체적인 타입임을 코드에서 유추하는 것

TS가 값의 타입이 이전에 알려진 것보다 더 좁혀졌다는 것을 알게되면 값을 더 구체적인 타입으로 취급함

타입을 좁히는 데 사용할 수 있는 논리적 검사를 `타입 가드(type guard)`라고 함

### 3.2.1 값 할당을 통한 내로잉

변수에 값을 직접 할당하면 TS는 변수의 타입을 할당된 값의 타입으로 좁힘

```ts
let inventor: number | string = "Hedy Lamarr";

// ok
inventor.toUpperCase();

// Property 'toFixed' does not exist on type 'string'. Did you mean 'fixed'?
inventor.toFixed();
```

- TS는 변수가 나중에 유니언 타입으로 선언된 타입중 하나의 값을 받을 수 있지만, 처음에는 초기에 할당된 값의 타입으로 시작한다.

### 3.2.2 조건 검사를 통한 내로잉

일반적으로 TS에서는 변수가 알려진 값과 같은지 확인하는 if문을 통해 변수 값을 좁히는 방법을 사용

TS는 if문 내에서 변수가 알려진 값과 동일한 타입인지 확인

```ts
let temp = Math.random() > 0.5 ? "Rosalind Frankin" : 51;

// ok
if (temp === "Rosalind Frankin") {
  temp.toUpperCase();
}

// Property 'toUpperCase' does not exist on type 'string | number'.
//   Property 'toUpperCase' does not exist on type 'number'.
temp.toUpperCase();
```

### 3.2.3 typeof 검사를 통한 내로인

TS는 직접 값을 확인해 타입을 좁히기도 하지만, typeof 연산자를 사용할 수도 있음

```ts
let researcher = Math.random() > 0.5 ? "Roslind Franklin" : 51;

// ok
if (typeof researcher === "string") {
  researcher.toUpperCase();
} else {
  researcher.toFixed();
}
```

## 3.3 리터럴 타입(literal type)

원시 타입 값 중 어떤 것이 아닌 특정 원싯값으로 알려진 타입이 리터럴 타입

```ts
let lifespan: number | "ongoing" | "uncertain";

// ok
lifespan = 80;
lifespan = "ongoing";

// Type 'true' is not assignable to type 'number | "ongoing" | "uncertain"'
lifespan = true;
```

### 3.3.1 리터럴 할당 가능성

동일한 원시 타입일지라도 서로 다른 리터럴 타입은 서로 할당할 수 없다.

```ts
let specificallyAda: "Ada";

specificallyAda = "Ada";

// Type '"Byron"' is not assignable to type '"Ada"'
specificallyAda = "Byron";

let someString = "";

// Type 'string' is not assignable to type '"Ada"'.
specificallyAda = someString;
```

## 3.4 엄격한 null 검사

리터럴로 좁혀진 유니언의 힘은 TS에서 엄격한 null 검사라 부르는 타입 시스템 영역인 "잠재적으로 정의되지 않은 undefined 값"으로 작업할 때 특히 두드러짐

### 3.4.1 십억 탈러의 실수

`십억 달러의 실수`는 다른 타입이 필요한 위치에서 null 값을 사용하도록 허용하는 많은 타입 시스템을 가리키는 업계 용어

TS 컴파일러 옵션 중 하나인 `strictNullChecks`는 엄격한 null 검사를 활성화할지 여부를 결정 함

- 엄격한 null 검사를 활성화해야만 코드가 null 또는 undefined 값으로 인한 오류로 부터 안전하지 여부를 쉽게 파악할 수 있다.
- TS의 모범 사례는 일반적으로 엄격한 null 검사를 활성화하는 것이며, 이를 통해 충돌을 방지하고 `십업 달러의 실수`를 제거할 수 있다.

```ts
let nameMyBe = Math.random() > 0.5 ? "Tony Hoare" : undefined;

// 'nameMyBe' is possibly 'undefined'.
nameMyBe.toLowerCase();
```

### 3.4.2 참 검사를 통한 내로잉

TS는 잠재적인 값 중 truthy로 화인된 일부에 한해서만 변수의 타입을 좁힐 수 있음

```ts
let biologist = Math.random() > 0.5 && "Rachel Carson";

if (biologist) {
  // let biologist: string
  biologist;
} else {
  // let biologist: string | false
  biologist;
}
```

### 3.4.3 초깃값 없는 변수

TS는 값이 할당될 때까지 변수 undefined임을 이해할 만큼 충분히 영리함

값이 할당되기 전에 속성 중 하나에 접근하려는 것처럼 해당 변수를 사용하려고 시도하면 아래와 같은 오류 메시지가 나타남

```ts
let mathematician: string;

// Variable 'mathematician' is used before being assigned.
mathematician.toString();

mathematician = "TEMP";
// ok
mathematician.toString();
```

## 3.5. 타입 별칭

TS에는 재사용하는 타입에 더 쉬운 이름을 할당하는 `타입 별칭(type alias)`가 있다.

- 타입 별칭은 `type 새로운 이름 = 타입`의 형태를 갖음
- 편의상 타입 별칭은 파스칼 케이스로 이름을 지정

```ts
type RawData = boolean | number | string | null | undefined;

let rawDataFirst: RawData;
```

### 3.5.1 타입 별칭은 JS가 아님

타입 별칭은 타입 애너테이션처럼 JS로 컴파일되지 않음

순전히 TS 타입 시스템에만 존재

### 3.5.2 타입 별칭 결합

타입 별칭은 다른 타입 별칭을 참조할 수 있음

```ts
type Id = number | string;
type IdMayBe = Id | undefined | null;
```
