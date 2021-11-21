
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
`-- save` 또는 `-S` 
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