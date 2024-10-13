# CHAPTER11 선언 파일

**선언 파일에는 런타임 구성에는 없는 순수 타입 시스템 코드가 있다.**

타입스크립트로 코드를 작성하는 일은 멋있고 여러분이 원하는 모든 것일 테지만, 타입스크립트 프로젝트에 원시 자바스크립트 파일로 작업할 수 있어야함.

타입스크립트는 구현과 별도로 타입 형태를 선언할 수 있어야 함

타입 선언은 파일 이름이 `.d.ts` 확장자로 끝나는 선언파일에 작성됨

선언 파일은 일반적으로 프로젝트 내에서 작성되고, 프로젝트의 컴파일된 npm 패키지로 빌드 및 배포되거나 독립 실행형 typings 패키지로 공유됨

## 11.1 선언 파일

`.d.ts`선언 파일은 런타임 코드를 포함할 수 없다는 주목할 만한 제약 사항을 제외하고는 `.ts`파일과 유사하게 작동함

- 사용 가능한 런타임 값
- 인터페이스
- 모듈
- 일반적인 타입의 설명

`.d.ts` 파일은 자바스크립트로 컴파일할 수 있는 모든 런타임 코드를 포함할 수 없다.

선언 파일은 값이 아닌 타입만 선언할 수 있는 코드 영역을 의미하는 `엠비언트 컨텍스트(ambient context)`를 생성함

```ts
// types.d.ts
export interface Character {
  catchPhrase?: string;
  name: string;
}
```

```ts
// index.ts
import { Character } from "./types";

export const character: Character = {
  catchPhrase: "Yee-haw!",
  name: "Snady Cheeks",
};
```

## 11.2 런타임 값 선언

선언 파일은 함수 또는 변수 같은 런타임 값을 생성하지 않을 수 있지만, declare 키워드를 사용해 이러한 구조체가 존재한다고 선언할 수 있음

- 웹 페이지의 `<script>` 태그 같은 일부 외부 작업이 특정 타입의 이름을 사용해 값을 생성했음을 타입 시스템에 알림

`declare`로 변수를 선언하면 초깃값이 허용되지 않는다는 점을 제외하고 일반적인 변수 선언과 동일한 구문을 사용함

```ts
// types.d.ts

// ok
declare let declared: string;
// Initializers are not allowed in ambient contexts.
declare let initializer: string = "sample";
```

함수와 클래스도 일반적인 형식과 유사하게 선언되지만 함수 또는 메서드의 본문이 없다.

```ts
// bus.d.ts

// ok
declare function getBusName(busNumber: number): string;

// // An implementation cannot be declared in ambient contexts.
declare function setBusName(busNumber: number) {
  return `todo-bus-${busNumber}`;
};

class Bus {
  // ok
  getBusName(busNumber: number): string;
  // An implementation cannot be declared in ambient contexts.
  setBusName(busNumber: number) {
    return `todo-bus-${busNumber}`;
  }
}
```

declare 키워드를 사용한 타입 선언은 `.d.ts`선언 파일에서 사용하 게 가장 일반적이지만, 선언 파일 외부에서도 사용할 수 있음

전역으로 사용 가능한 변수가 해당 파일에서만 사용되어야 하는 경우 declare 키워드는 유용함

```ts
// global.d.ts
declare const myGlobalValye: string;
```

```ts
// index.ts
// ok
console.log(myGlobalValye);
```

## 11.2.2 전역 인터페이스 병합

인터페이스 병합을 이용하면 `types/www.d.ts`와 같은 파일에서 `Window` 타입의 전역 window 변수에 존재하는 변수를 선언할 수 있도록 허용

```ts
// types/window.d.ts
interface Window {
  myVersion: string;
}
```

```ts
export function logWindowVersion() {
  console.log(`Window version is: ${window.myVersion}`);
  window.alert("Built-in window types still work!");
}
```

### 11.2.3 전역 확장

타입스크립트에서 declare global 코드 블록 구문을 사용해 해당 블록 내용이 전역 컨텍스트에 있다고 표시

```ts
// types.d.ts

// 모듈 컨텍스트
declare global {
  // 전역 컨텍스트
}
```

```ts
// types/data.d.ts
export interface Data {
  version: string;
}
```

위와 같은 경우 types/data.d.ts 파일은 Data 인터페이스를 보내고, 나중에 types/globals.d.ts와 런타입 index.ts파일에서 이 인터페이스를 가져옴

## 11.3 내장된 선언

Array, Function, Map, Set과 같은 전역 객체는 타입 시스템이 알아야 하지만 코드에서는 선언되지 않는 구문

이와 같은 전역 객체는 디노, Node.js, 웹 브라우저 등에서 실행되는 런타임 코드에 의해 제공됨

### 11.3.1 라이브러리 선언

모든 자바스크립트 런타임에 존재하는 Array, Function 같은 내장된 전역 객체는 `lib.[target].d.ts` 파일 이름으로 선언됨

라이브러리 target

- 타입스크립트는 기본적으로 tsc CLI 또는 프로젝트의 tsconfig.json에서 제공된 target 설정에 따라 적절한 lib 파일을 포함함

- 자바스크립트 최신 버전에 대한 연속적인 lib 파일들은 인터페이스 병합을 사용해 서로 빌드됨

### 11.3.2 DOM 선언

DOM 타입은 `lib.dom.d.ts` 파일과 다른 `lib.*.d.ts` 선언 파일에도 저장됨

## 11.4 모듈 선언

선언 파일의 또 다른 중요한 기능은 모듈의 상태를 설명하는 기능

모듈의 문자열 이름 앞에 declare 키워드를 사용하면 모듈의 내용을 타입 시스템에 알릴 수 있음

하지만 코드에서 declare module을 자주 사용해서는 안됨

- 와일드카드 모듈 선언 및 패키지 타입과 함께 사용됨

```ts
// module.d.ts
declare module "my-example-lib" {
  export const value: string;
}
```

```ts
// index.ts
import { value } from "my-example-lib";

console.log(value);
```

### 14.1.1 와일드카드 모듈 선언

모듈 선언은 자바스크립트와 타입스크립트 파일 확장자가 아닌 특정 파일의 내용을 코드로 가져올 수 있음을 웹 애플리케이션에 알리기 위해 사용

모듈 선언으로 하나의 `*` 와일드카드를 포함해 해당 패턴과 일치하는 모든 모듈을 나타낼 수 있음

```ts
// styles.d.ts
declare module "*.module.css" {
  const styles: { [i: string]: string };
  export default styles;
}
```

```ts
import styles from "./styles.module.css";
styles.anyClassName; // 타입: string
```

- 기본적인 `{ [i: string]: string }` 타입의 객체를 내보내는 `*.module.css`와 같은 패턴으로 모듈을 정의함

## 11.5 패키지 타입

타입스크립트로 작성된 프로젝트는 여전히 .js로 컴파일된 파일이 포함된 패키지를 배포함

일반적으로 `.d.ts` 파일을 사용해 이러한 자바스크립트 파일 뒤에 타입스크립트 타입 시스템 형태를 지원하도록 선언함

### 11.5.1 선언

타입스크립트는 입력된 파일에 대한 `.d.ts` 출력 파일과 자바스크립트 출력 파일을 함께 생성하는 선언 옵션을 제공함

자동으로 생성된 .d.ts 파일은 프로젝트에서 사용자가 사용할 타입 정의를 생성하는 가장 좋은 방법

일반적으로 .js 파일로 생성하는 타입스크립트로 작성된 대부분의 패키지도 해당 파일과 함께 .d.ts를 번들로 묵는 것이 좋음

### 11.5.2 패키지 타입 의존성

타입스크립트는 프로젝트의 node_modules 의존성 내부에서 번들로 제공되는 .d.ts 파일을 감지하고 활용할 수 있음

- 이러한 파일은 해당 패키지에서 내보낸 타입 형태에 대해 마치 동일한 프로젝트에서 작성되었거나 선언 모듈 블록으로 선언된 것처럼 타입 시스템에 알림

### 11.5.3 패키지 타입 노출

프로젝트가 npm에 배포되고 사용자를 위한 타입을 제공하려면 패키지의 package.json 파일에 types 필드를 추가해 루트 선언 파일을 가리킴

types 필드는 main 필드와 유사하게 작동하고 종종 동일한 것처럼 보이지만 .js 확장자를 대신에 .d.ts 확장자를 사용함

- types 필드가 패키지의 package.json에 존재하지 않으면 타입스크립트는 기본적으로 `./index.d.ts`를 기본값으로 가정

## 11.6 DefinitelyTyped

타입스크립트 팀과 커뮤니티는 작성된 패키지 정의를 수용하기 위해 DefinitelyTyped라는 거대한 저장소를 만듬

저장소에는 변경 제안 검토 및 업데이트 게시와 관련된 자동화 부분과 수천 개의 .d.ts 정의 패키지가 포함되어 있음
