
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