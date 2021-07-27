# TypeScript

## TS for the New Programmer

### TypeScrip
- 정적 타입 검사자
- 프로그램을 실행시키기 전에 값의 종류를 기반으로 프로그램의 오류를 찾는다.

### 타입이 있는 JavaScript 의 상위 집합(A typed superset of javascript)
- TypeScript 는 JS 구문이 허용되는, JavaScript 의 상위 집합 언어
- TypeScript 는 다른 종류의 값들을 사용할 수 있는 방법이 추가된, 타입이 있는 상위 집합
- TypeScript 의 타입 검사자는 일반적으로 오류를 최대한 많이 검출하면서 올바른 프로그램을 만들 수 있게 설계되었다.

### 런타임 특성(Runtime behavior)
- TypeScript 는 JavaScript 의 런타임 특성을 가진 프로그래밍 언어
- TypeScript 는 JavaScript 코드의 런타임 특성을 절대 변화시키지 않음
- JavaScript 와 동일한 런타임 동작을 유지 

### 삭제된 타입(Erased Types)
- 개략적으로, TypeScript 의 컴파일러가 코드 검사를 마치면 타입을 삭제해서 결과적으로 컴파일된 코드를 만든다.
  - 코드가 한 번 컴파일 되면, 결과로 나온 일반 JS 코드에는 타입 정보가 없다.
  - 타입 정보가 없다는 것은 TypeScript 가 추론한 타입에 따라 프로그램의 특성을 변화시키지 않는다는 의미
  - 결론적으로 컴파일 도중에는 타입 오류가 표출될 수 있지만, 타입 시스템 자체는 프로그램이 실행될 때 작동하는 방식과 관련이 없다.

### JavaScript 와 TypeScript 학습(Learning JavaScript and TypeScript)
- JavaScript 를 배우지 않고선 TypeScript 를 배울 수 없다.
- TypeScript 는 컴파일-타임 타입 검사가자가 있는 JavaScript 런타임

## TS for JS Programmers
TypeScript 는 타입 시스템이다.
- JavaScript 의 기능들을 제공하면서 그 위에 자체 레이어(이 레이어가 TypeScript 타입 시스템을 의미) 추가한다.

### 타입 추론(Types by Inference)

### 타입 정의하기(Defining Types)
```ts
interface IUser {
  name: string;
  id: number;
}

class UserAccount {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }

  getUserInfo(): IUser {
    return { this.name, this.id }
  }
  setUserInfo(userInfo: IUser) {
    this.name = userInfo.name;
    this.id = userInfo.id;
  }
}

const user: IUser = new UserAccount('TestUser', 1);
```
### 타입 구성(Composing Types)

### 유니온(Unions)

### 제네릭(Generics)

### 구조적 타입 시스템(Structural Type System)

## 5분 안에 보는 TypeScript

TypeScript 설치하기
```
npm install -g typescript
```
- local install 은 아래와 같다.
  - npm install typescript --save-dev


### 1. TypeScript 파일 생성 및 컴파일
```ts
// greeter.ts
function greeter(person: string) {
  return 'Hello, ' + person;
}

let user = 'Jane User';

document.body.textContent = greeter(user);
```

커맨드 라인에서 아래와 같이 TypeScript 컴파일러를 실행

```
tsc greeter.ts
```


### 3. 타입 표기
TypeScript 의 타입 표기는 함수나 변수의 의도된 계약을 기록하는 간단한 방법


### 4. 인터페이스 
TypeScript에서, 내부 구조가 호환되는 두 타입은 서로 호환 된다.

그래서 명시적인 implements 절 없이, 인터페이스가 요구하는 형태를 사용하는 것만으로도 인터페이스를 구현할 수 있다.
```ts
interface IPerson {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  return 'Hello, ' + person.firstName + ' ' + person.lastName;
}

let uesr = { firstName: 'Jane', lastName: 'User' };

document.body.textContent = greeter(user)
```

### 5. 클래스
TypeScript는 클래스 기반 객체 지향 프로그래밍 지원과 같은 JavaScript의 새로운 기능을 지원

# 참고
https://typescript-kr.github.io/

[정적 프로그램 분석](https://ko.wikipedia.org/wiki/%EC%A0%95%EC%A0%81_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8_%EB%B6%84%EC%84%9D)
- static program analysis 은 실제 실행 없이 컴퓨터 소프트웨어를 분석하는 것을 말함