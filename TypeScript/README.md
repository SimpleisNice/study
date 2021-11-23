
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
node 나 ts-node 로 소스 파일을 실행하려면 ts-node ./src/index.ts 명령을 사용한다.

하지만 소스 파일명이 index 이면 파일명을 생략하고 단순히 ts-node ./src 로 실행할 수 있다

이 때문에 프로젝트의 시작 함수(엔트리 함수)가 있는 소스 파일명은 보통 index 로 짓는다.
<br><br><br><br>



# 모듈 이해하기
타입스크립트에서는 index.ts 와 같은 소스 파일을 모듈(module) 이라고 부른다.

보통은 코드 관리와 유지 보수를 편리하게 하려고 모듈마다 고유한 기능을 구현하는 방식으로 소스코드를 분할 한다.

이러한 작업을 모듈화(modulization) 라고 한다.

## index.ts 파일을 분리해 모듈화 진행

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

2 - src/index.ts 를 아래의 형태로 분리
- src/index.tsm
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
compilerOptions: tsc 명령 형식에서 옵션을 나타냄
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
- outDif 키는 baseUrl 설정값을 기준으로 했을 때 하위 디렉터리의 이름
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