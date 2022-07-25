# 2장 ES6+를 품은 자바스크립트, 매력적인 언어가 되다.

## 2.1 변수를 정의하는 새로운 방법: const, let

### 2.1.1 var가 가진 문제
- 정의된 변수가 함수 스코프를 가짐
- 호이스팅
- 기타 문제들
  - var를 이용하면 한 번 정의된 변수를 재정의할 수 있다.

### 2.1.2 var의 문제를 해결하는 const, let
- const, let은 블록 스코프
- const, let에서의 호이스팅
- const는 변수를 재할당 불가능하게 만듬

## 2.2 객체와 배열의 사용성 개선
### 2.2.1 객체와 배열을 간편하게 생성하고 수정하기
```js
const name = 'test';
const obj = {
  age,
  name,
  getName() { return this.name; },
}
```
- 단축 속성명(shorthand propetry names)
  - 객체 리터럴 코드를 간편하게 작성할 목적으로 만들어진 문법

```js
function makeObj(key, value) {
  return { [key]: value };
}
```
- 계산된 속성명(computed propetry names)
  - 객체의 속성명을 동적으로 결정하기 위해 나온 문법

### 2.2.2 객체와 배열의 속성값을 간편하게 가져오기
```js
const numbers = [1, 3, 7, 9];
Math.max(...numbers);
```
- 전개 연산자(spread operator)
  - 배열이나 객체의 모든 속성을 풀어놓을 때 사용하는 문법