
# 타입스크립트 프로젝트 만들기

```
/**
  1. package.json 생성
*/
npm init --y


/**
  2. tsconfig.json 생성
  - 실제 개발을 진행하는 데 필요한 많은 옵션이 비활성화되어 있다.
  - 보통은 프로젝트에 필요한 옵션만 설정해서 간략하게 한다.
*/
tsc --init


/**
  3. tsconfig.json 옵션 설정
  - tsconifg.json
  {
    "compilerOptions": {
      "target": "es5",
      "module": "commonjs",                                
      "moduleResolution": "node",
      "baseUrl": ".",
      "paths": { "*": ["node_modules/*"]},
      "sourceMap": true,
      "outDir": "dist",
      "downlevelIteration": true,
      "esModuleInterop": true,
      "forceConsistentCasingInFileNames": true,
      "strict": true,
      "noImplicitAny": false,
      "skipLibCheck": true
    },
    "include": ["src/**/*"]
  }
*/


/**
  4. src 디렉터리와 소스파일 만들기
  - 앞에서 만든 tsconfig 파일에서 include 항목이 있다.
  - 이 항목에서는 ["src/**/*"]라는 값이 설정되어 있다.
    - 이것은 ./src 와 ./src/utils 디렉터리에 이 프로젝트의 모든 타입스크립트 소스 파일이 있다는 뜻이다.
*/
mkdir -p src/utils
touch src/index.ts src/utils/makePerson.ts


/**
  5. src/index.ts

    import { testMakePerson } from './utils/makePerson';
    testMakePerson();
*/


/**
  6. src/utils/makePerson.ts

    export function makePerson (name: string, age: number) {
      return { name: name, age: age };
    }
    export function testMakePerson() {
      console.log(
        makePerson('Jane', 22),
        makePerson('Jack', 33)
      );
    }
*/


/**
  7. package.json 수정
  - 타입스크립트 프로젝트를 개발할 때는 ts-node 를 사용하지만
  - 개발이 완료되면 타입스크립트 소스코드를 ES5 자바스크립트 코드로 변환해 node 로 실행해야 한다.
  - 이를 위해 다음과 같이 package.json 파일을 열고 scripts 항목에 dev 와 build 명령어를 추가한다.
  - package.json
  {
    ...,
    "scripts": {
      "dev": "ts-node src",
      "build": "tsc && node dis"
    },
    ....
  }
*/

/**
  8. index.ts 파일 컴파일 및 실행
  - 7번에서 설정한 명령어들은 'npm run 명령어' 형태로 사용한다.
*/
npm run dev
npm run build

```
<br>


## 패키지 설치 명령 옵션
`--save` 또는 `-S` 
- 프로젝트를 실행할 때 필요한 패키지로 설치
- 패키지 정보가 package.json 파일의 dependencies 항목에 등록

`--save-dev` 또는 `-D`
- 프로젝트를 개발할 때만 필요한 패키지로 설치
- 패키지 정보가 package.json 파일의 devDependencies 항목에 등록
<br><br>

## 검증
타입스크립트는 자바스크립트와는 완전히 다른 언어이다.

그러므로 자바스크립트로 개발된 `chance`, `ramda` 와 같은 라이브러리들은 추가로 `@types/chance` 와 `@types/ramda` 와 같은 라이브러리들을 제공해야 한다.

`@type/` 가 앞에 붙는 타입 라이브러리들은 항상 `index.d.ts`라는 이름의 파일을 가지고 있으며

타입스크립트 컴파일러는 이 파일의 내용을 바탕으로 `chance`, `ramda` 와 같은 라이브러리가 제공하는 함수들을 올바르게 사용했는지 검증한다.

타입스크립트는 또한 웹 브라우저나 nodejs 가 기본적으로 제공하는 타입들의 존재도 그냥 알지 못한다.

그러므로 `Promise` 와 같은 타입을 사용하려면 `@types/node` 라는 패키지를 설치해야 한다.
<br><br>


## 시작 소스 파일 명을 index 로 짓는 이유
node 나 ts-node 로 소스 파일을 실행하려면 `ts-node ./src/index.ts` 명령을 사용한다.

하지만 소스 파일명이 index 이면 파일명을 생략하고 단순히 `ts-node ./src` 로 실행할 수 있다

이 때문에 프로젝트의 시작 함수(엔트리 함수)가 있는 소스 파일명은 보통 index 로 짓는다.
<br><br><br><br>



# 모듈 이해하기
타입스크립트에서는 index.ts 와 같은 소스 파일을 모듈(module) 이라고 부른다.

보통은 코드 관리와 유지 보수를 편리하게 하려고 모듈마다 고유한 기능을 구현하는 방식으로 소스코드를 분할 한다.

이러한 작업을 모듈화(modulization) 라고 한다.

<br>

## index.ts 파일을 분리해 모듈화 진행
<br>

1 - 모듈화 하기전의 src/index.ts
```ts
// src/index.ts
let MAX_AGE = 100;

interface IPerson {
  name: string;
  age: number;
}

class Person implements IPerson {
  constructor(public name: string, public age: number) {}
}

function makeRandomNumber(max: number = MAX_AGE): number {
  return Math.ceil((Math.random() * max));
}

const makePerson = (name: string, age: number = makeRandomNumber()) => ({ name, age });

const testMakePerson = (): void => {
  let jane: IPerson = makePerson('Jane');
  let jack: IPerson = makePerson('Jack');

  console.log(jane, jack);
}

testMakePerson();
```

<br>

2 - src/index.ts 를 아래의 형태로 분리
- src/index.ts
- src/utils/makeRandomNumber.ts
- src/person/IPerson.ts
- src/person/Person.ts
```ts
// src/index.ts
import IPerson from './person/IPerson';
import Person, { makePerson } from './person/Person'

const testMakePerson = (): void => {
  let jane: IPerson = makePerson('Jane');
  let jack: IPerson = makePerson('Jack');

  console.log(jane, jack);
}

testMakePerson();
```
```ts
// src/utils/makeRandomNumber.ts
let MAX_AGE = 100;

export function makeRandomNumber(max: number = MAX_AGE): number {
  return Math.ceil((Math.random() * max));
}
```
```ts
// src/person/IPerson.ts
export default interface IPerson {
  name: string;
  age: number;
}
```
```ts
// src/person/Person.ts
import * as U from '../utils/makeRandomNumber';
import IPerson from './IPerson';

export default class Person implements IPerson {
  constructor(public name: string, public age: number = U.makeRandomNumber()) {}
}

export const makePerson = (name: string, age: number = U.makeRandomNumber()): IPerson => ( {name, age} )
```

<br>

## 외부 패키지를 사용할 때 import 문
```
npm i -S chance ramda
npm i -D @types/chance @types/ramda
```


```ts
// src/index.ts
import IPerson from './person/IPerson';
import Person, { makePerson } from './person/Person';
import Chance from 'chance';
import * as R from 'ramda';

const chance = new Chance();

let persons: IPerson[] = R.range(0, 2)
  .map((n: number) => new Person(chance.name(), chance.age()));

console.log(persons);
```

<br><br>

# tsconfig.json 파일 살펴보기
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "node",
    "target": "es5",
    "baseUrl": ".",
    "outDir": "dist",
    "paths": { "*": ["node_modules/*"]},
    "esModuleInterop": true,
    "sourceMap": true,
    "downlevelIteration": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitAny": false,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]   /* 대상 파일 목록을 나타냄 */
}
```
<br>

`compilerOptions: tsc` 명령 형식에서 옵션을 나타냄
```
"module": "commonjs",
- 플랫폼에 맞는 모듈 방식으로 컴파일하려는 목적으로 설정
  - web browser: amd
  - nodejs: commonjs
"moduleResolution": "node",
- "module" 키값에 따라 다음과 같이 설정한다
  - amd 인 경우: classic
  - commonjs 인 경우: node
"target": "es5",
- 트랜스파일할 대상 자바스크립트 버전을 설정
"baseUrl": ".",
"outDir": "dist",
- baseUrl 과 outDir 키에는 트랜스파일된 ES5 자바스크립트 파일을 저장하는 디렉터리를 설정한다.
- tsc 는 tsconfig.json 파일이 있는 디렉터리에서 실행됨
- 따라서 현재 디렉터리를 의미하는 "." 로 baseUrl 키값을 설정하는 것이 보통
- outDir 키는 baseUrl 설정값을 기준으로 했을 때 하위 디렉터리의 이름
- 앞서 이 키는 dist 라는 값을 설정했으므로 빌드된 결과가 dist 디렉터리에 만들어짐
"paths": { "*": ["node_modules/*"]},
- 소스 파일의 import 문에서 from 부분을 해석할 때 찾아야 하는 디렉터리를 설정
- import 문이 찾아야 하는 소스가 외부 패키지이면
- node_modules 디렉터리에서 찾아야 하므로 키값에 node_modules/* 도 포함
"esModuleInterop": true,
- 오픈소스 자바스크립트 라이브러리 중에서 웹 브라우저에서 동작한다는 가정으로 만들어 진것이 있다.
- 이들은 CommonJS 방식으로 동작하는 타입스크립트 코드에 혼란을 술 수 있다.
- 이러한 라이브러리를 동작시키기 위해서는 해당 키값을 true 로 설정해야 한다.
"sourceMap": true,
- 키값이 true 이면 트랜스파일 디렉터리에는 .js 파일 이외에도 .js.map 파일이 만들어진다.
- 이 소스맵 파일은 변환된 자바스크립트 코드가 타입스크립트 코드의 어디에 해당하는지를 알려준다.
- 주로 디버깅할 때 사용
"downlevelIteration": true,
- 생성기라는 타입스크립트 구문이 있는데, 이는 책의 6장에서 설명
- 이 생성기 구문이 정상적으로 동작하려면 키값이 반드시 true 로 설정해야 한다.
"noImplicitAny": false,
- 키값이 true 인 경우, 타입을 명시하지 않으면 오류 메시지를 통해 개발자에게 문제를 알려준다.
"forceConsistentCasingInFileNames": true,
"strict": true,
"skipLibCheck": true
```


include 항목
- 대상 파일 목록을 나타냄
- `["src/**/*"]` 는 src 디렉터리는 물론 src 하위 디렉터리에 있는 모든 파일을 컴파일 대상으로 포함한다는 의미

<br><br>

# 객체와 타입

|유형|자바스크립트 타입|타입스크립트 타입|
|---|-------|---|
|수 타입|Number|number|
|불리언 타입|Boolean|boolean|
|문자열 타입|String|string|
|객체 타입|Object|object|

<br>

### 타입 주석
타입스크립트는 자바스크립트 변수 선언문을 확장해 다음과 같은 형태로 타입을 명시할 수 있다.

이를 타입 주석(type annotation)이라고 한다.

```ts
// let 변수이름: 타입 [= 초깃값];
// const 변수이름: 타입 = 초깃값;

let n: number = 1;
let b: boolean = false;
let o: object = {};
```

### 타입 추론
타입스크립트는 자바스크립트와 호환성을 위해 타입 주석 부분을 생략할 수 있다.

타입스크립트 컴파일러는 아래와 같은 코드를 만나면 대입 연산자 `=` 오른쪽 값에 따라 변수의 타입을 지정

이를 타입 추론(type inference) 라고 한다.

```ts
let n = 1;        // n 의 타입을 number 로 판단
let b = false;    // b 의 타입을 boolean 으로 판단.
```
- 컴파일러가 초깃값에 따라 타입을 추론하므로 각 변수는 초깃값에 해당하는 타입으로 지정됨
- 따라서 이후에 각 변수에는 해당하는 타입의 값만 저장할 수 있다.

### 타입에 관하여
```
                  any
                   │
  ┌────────────────┴────────────────┐
  ↓                                 ↓
number, boolean, string           object
                                    ↓
                                  interface, class
                                  ...
  │                                 │
  └────────────────┬────────────────┘
                   ↓
                undefined
```
any 타입
- 타입스크립트는 자바스크립트와 호환을 위해 any 라는 이름의 타입을 제공
- any 는 값의 타입과 무관하게 어떤 종류의 값도 저장할 수 있다.

undefined 타입
- 타입스크립트에서 undefined 는 타입이기도 하고 값이기도 하다.

object 타입
- 인터페이스와 클래스의 상위 타입
- 속성 이름이 다른 객체를 모두 자유롭게 담을 수 있다.

인터페이스 선언문
```
interface 인터페이스이름 {
  속성이름[?]: 속성타입[,...]
}
```
- 타입스크립트는 객체 타입을 정의할 수 있게 하는 interface 키워드를 제공
- 인터페이스는 객체의 타입을 정의하는 것이 목적이므로 다음처럼 객체를 의미하는 중괄호 {} 로 속성의 이름과 타입을 나열하는 형태로 사용
- 인터페이스 속성들을 여러 줄로 구현할 때는 세미콜론 또는 줄바꿈만 해도 된다.

```ts
interface IPerson {
  name: string;
  age: number;
  etc?: boolean   // 선택 속성
}
```
- 선택 속성(optional property): 인터페이스에서 있어도 되고 없어도 되는 형태의 속성

익명 인터페이스 (anonymous interface)
```ts
let ai: {
  name: string;
  age: number;
  etc?: boolean;
} = { name: 'Jack', age: 32 };

function printMe(me: { name: string, age: number, etc?: boolean }): void {
  console.log(me.etc ? `${me.name} ${me.age} ${me.etc}` : `${me.name} ${me.age} ${me.etc}` );
}

printMe(ai)
```
- interface 키워드도 사용하지 않고 인터페이스의 이름도 없는 인터페이스를 만들 수 있다.
- 주로 함수를 구현할 때 사용된다.

객체와 클래스
```ts
interface IPerson {
  name: string;
  age?: number;
}

abstract class MoreInfo {
  abstract height: number;
  constructor(public height: number)
}

class Person implements IPerson {
  constructor(public name: string, publi age?: number) {

  }
}

class Student extends Person {
  static STUDENT_COUNT: number = 0;

  constructor(public name: string, public age?: number) {
    super(name, age);
  }
}

let jack: Student = new Student('Jack', 32);

Student.STUDNET_COUNT += 1;
```
- 클래스 선언문
- 접근 제한자
- 생성자
- 인터 페이스 구현
  - 인터페이스는 이러한 속성이 있어야 한다는 규약(spec)에 불과할 뿐 물리적으로 해당 속성을 만들지 않는다.
- 추상 클래스
  - abstract 키워드를 사용해 추상 클래스를 만들 수 있다.
  - 추상 클래스는 new 연산자를 적용해 객체를 만들 수 없다.
- 클래스의 상속
  - extends 키워드를 사용해 상속 클래스를 만들 수 있다.
  - 타입스크립트에서는 부모 클래스의 생성자를 super 키워드로 호출할 수 있다.
- static 속성
  - 타입스크립트 클래스는 정적인 속성을 가질 수 있다.
  - `클래스이름.정적속성이름` 형태의 점 표기법을 사용해 값을 얻거나 설정할 수 있다.

객체의 비구조화 할당문
```ts
let address: any = {
  country: 'korea',
  city: 'Seoul',
  address1: 'Gangname-gu',
  address2: 'Sinsa-dong 123-456',
  address3: '789 street, 2 Floor ABC building',
}

// rest operator
const { country, city, ...detail } = address;

// spread operator
let coord = { ...{x: 0}, ...{y: 0}}
```
- destructuring
  - 변수가 새롭게 만들어지고, 각 값들은 해당하는 초기값으로 할당 받음
  - 그러므로 비구조화가 아닌 비구조화 할당으로 해석함
- 잔여 연산(rest operator)
- 전개 연산자(spread operator)


### 타입 변환(type conversion)
타입이 있는 언어들은 특정 타입의 변숫값을 다른 타입의 값으로 변환할 수 있는 기능을 제공한다.

```ts
let person: object = { name: 'Jack', age: 32 };
(<{name: string}>person).name
```


type conversion 과 type casting 그리고 type coercion 의 차이
- 타입 변환으로 번역되는 세가지 프로그래밍 용어는 type conversion, type casting, type coercion 이 있다.
- type conversion 은 type casting 과 type coercion 을 모두 포함하는 의미로 사용된다.
- type casting 은 명시적인 타입 변환(explicit type conversion) 을 의미
- type coercion 은 암시적 타입 변환(implicit type conversion) 을 의미


### 타입 단언(type assertion)
```ts
/**
  타입 단언의 두가지 구문은 서로 형태만 다를 뿐 내용상으로는 같다.
  (<타입>객체)
  (객체 as 타입)
*/

interface INameable {
  name: string;
}

let obj: Object = { name: 'Jack' }
let name1 = (<INameable>obj).name
let name2 = (obj as INameable).name
```

<br><br>

# 함수와 메서드

<br>

## 함수 선언문
```ts
/**
  function 함수이름(매개변수1: 타입1, 매개변수2: 타입2): 반환값타입 {
    함수몸통
  }
*/

// parameter
function add(a: number, b: number): number {
  return a + b;
}

// argument
let result = add(1, 2);
```

매개변수와 인수,인자
- 일반적으로 parameter 는 매개변수라고 하고, argument 는 인수 혹은 인자라고 한다.
- 매개변수는 함수 선언문에서 함수 이름 뒤 괄호 안에 선언하는 변수
- 인수는 함수를 호출할 때 전달하는 값


함수 시그처(function signature)
```ts
/**
  (매개변수1 타입, 매개변수2 타입[,...]) => 반환값타입
*/
let printMe: (string, number) => void = function(name: string, age: number): void {}
```
- 함수의 타입을 함수 시그니처라고 한다.


type 키워드로 타입 별칭 만들기
```ts
/**
  type 새로운타입 = 기존 타입
*/
type stringNumberFunc = (string, number?) => void;
let f: stringNumberFunc = function(a: string, b: number): void {}
let g: stringNumberFunc = function(c: string, d: number): void {}

```
- 타입스크립트는 type이라는 키워드를 제공
- type 키워드는 기존에 존재하는 타입을 단순히 이름만 바꿔서 사용할 수 있게 해준다.
- 이러한 기는을 타입별칭(type alias) 라고 한다.
- 위와 같이 함수 시그니처를 명시하면 다음 화면에서 보는 것처럼 매개변수의 개수나 타입, 반환 타입이 다른 함수를 선언하는 잘못을 미연에 방지할 수 있다.

<br>

## 함수 표현식(function expression)
```ts
// 함수 표현식
function(a, b) { return a + b; }
```

일등 함수(first-class function)
- 프로그래밍 언어가 일등 함수 기능을 제공하면 함수형 프로그래밍 언어라고 한다.
- 일등 함수란, 함수와 변수를 구분(혹은 차별)하지 않는다는 의미


표현식(expression)
- 리터럴, 연산자, 변수, 함수호출등이 복합적으로 구성된 코드 형태를 의미

계산법
- 컴파일러는 표현식을 만나면 계산법(evaluation)을 적용해 어떤 값을 만든다.
- 계산법에는 조급한 계산법(eager evaluation)과 느긋한 계산법(lazy evaluation) 두가지가 있다.
  - 컴파일러는 1 + 2 라는 표현식을 만나면 조급한 계산법을 적용해 3이라는 값을 만든다.
  - 컴파일러는 function(a,b) { return a + b } 라는 함수 표현식을 만나면 심벌 a 와 b가 어떤 값인지 알 수 없어서 느긋한 계산법을 적용해 계산을 보류한다.
  - 컴파일러는 함수 호출문을 만나면 지금까지 미뤘던 함수 표현식에 조급한 계산법을 적용해 함수 표현식을 값으로 바꿈

익명 함수(anonymous function)
- 함수 표현식은 사실 대부분 언어에서 언급되는 익명함수의 다른 표현


## 화살표 함수와 표현식 문
```ts
/**
  const 함수이름 = (매개변수1: 타입1, 매개변수2: 타입2, [, ...]): 반환타입 => 함수몸통
*/

// 실행문 방식 몸통
const arrow1 = (a: number, b: number): number => { return a + b; }
// 표현식 문 방식 몸통
const arrow2 = (a: number, b: number): number => a + b;
```
- 중괄호 사용 여부에 따라 타입스크립트 문법이 동작하는 방식이 실행문 방식과 표현식 문 방식으로 달라짐

실행문과 표현식 문
- 실행문 지향 언어(execution-oriented language)
  - 프로그래밍 언어에서 실행문은 CPU 에서 실행되는 코드를 의미
  - 실행문은 CPU 에서 실행만 될 뿐 결과를 알려주지 않는다.
  - 실행문이 실행된 결과를 알려면 반드시 return 키워드를 사용해야 한다.
- 표현식 지향 언어(expression-oriented language)
  - CPU 에서 실행된 결과를 굳이 return 키워드를 사용하지 않아도 알려줌

## 일등 함수 살펴보기
일등 함수는 프로그래밍 언어가 제공하는 기능

일등 함수 기능을 제공하는 언어에서 함수는 함수 표현식이라는 일종의 값이다.

따라서 변수에 담을 수 있으며, 이 말은 함수 표현식을 매개변수로 받을 수 있다는 것을 의미한다.

이처럼 매개변수 형태로 동작하는 함수를 콜백 함수(callback function) 라고 한다.

<br>

고차 함수와 클로저, 그리고 부분 함수
```ts
const add = (a: number): (number) => number => (b: number): number => a + b;
const result = add(1)(2);
console.log(result);

// 위의 함수는 아래와 같다.
type NumberToNumberFunc = (number) => number;

const add = (a: number): NumberToNumberFunc => {
  const _add: NumberToNumberFunc = (b: number): number => {
    return a + b;   // 글로저
  }
  return _add;
}

```
- 고차 함수(high-order function)는 또 다른 함수를 반환하는 함수를 말함
- 함수형 언어에서 함수는 단순히 함수 표현식이라는 값이므로 다른 함수를 반환할 수 있다.

## 함수 구현 기법
매개 변수 기본값 지정하기

객체 생성시 값 부분을 생략할 수 있는 타입 스크립트 구문

객체를 반환하는 화살표 함수 만들기
```ts
// 소괄호가 없는 경우, 복합 실행문으로 해석한다.
export const makePerson = (name: string, age: number = 10): Person => ({ name, age })
```

매개변수에 비구조화 할당문 사용하기
```ts
type Person = { name: string, age: number }
const printPerson = ({ name, age }: Person): void =>  console.log(`name: ${name}, age: ${age}`);
```

색인 키와 값으로 객체 만들기
```ts
const makeObj = (key, value) => ({ [key]: value })

console.log(makeObj('name', 'Jack'))      // { name: 'Jack' }
console.log(makeObj('firstName', 'Jane')) // { firstName: 'Jane' }

/**
  타입스크립트에서는 {[key]: value} 형태의 타입을 '색인 가능 타입' 이라고 하며
  다음과 같은 형태로 key 와 value 의 타입을 명시한다.
*/
type KeyType = {
  [key: string]: string;
}
export const makeObject = (key: string, value: string): KeyValue => ({ [key]: value })
console.log(makeObject('name', 'Jack'))      // { name: 'Jack' }
console.log(makeObject('firstName', 'Jane')) // { firstName: 'Jane' }
```