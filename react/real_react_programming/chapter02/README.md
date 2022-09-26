# 2장 ES6+를 품은 자바스크립트, 매력적인 언어가 되다.

<br>
<br>

## 2.1 변수를 정의하는 새로운 방법: const, let

<br>

## 2.2 객체와 배열의 사용성 개선
### 2.2.1 객체와 배열을 간편하게 생성하고 수정하기
```js
const name = 'test';
const obj = {
  age,
  name,   // 객체의 속성값 일부가 이미 변수로 존재하면 간단하게 변수 이름만 적어주면됨
  getName() { return this.name; },  // 속성값이 함수이면 function 키워드 없이 함수명만 적어도됨, 이때 속성명은 함수명과 같아진다.
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
  - 컴포넌트의 상탯값을 변경할 때 유용하게 쓸 수 있다.

### 2.2.2 객체와 배열의 속성값을 간편하게 가져오기
```js
const arr1 = [1, 2, 3];
const arr2 = [...arr1];

const obj1 = { a: 1, b: 2 };
const obj2 = {...obj1 };

const numbers = [1, 3, 7, 9];
Math.max(...numbers);
```
- 전개 연산자(spread operator)
  - 배열이나 객체의 모든 속성을 풀어놓을 때 사용하는 문법
  - 중복된 속성명 사용 시 최종 결과는 마지막 속성명의 값이 된다.
  - 중복된 속성명과 전개 연산자를 이용하면 객체의 특정 속성값을 변경할 때 이전 객체에 영향을 주지 않고 새로운 객체를 만들 수 있다. 이는 변수를 수정 불가능하도록 관리할 때 유용하게 사용될 수 있다.

```js
const arr = [1, 2];
const [a, b] = arr;
console.log(a);  // 1
console.log(b);  // 2

let a2, b2;
[a2, b2] = [1, 2];
[a2, b2] = [b2, a2];;
console.log()

const arr3 = [1];
const [a3 = 10, b3 = 20] = arr3;
console.log(a3);  // 1
console.log(b3);  // 20

const arr4 = [1, 2, 3];
const [a, ,c] = arr4;
console.log(a);  // 1
console.log(c);  // 3

const arr5 = [1, 2, 3];
const [first, ...rest] = arr5;
const [a5, b5, c5, ...rest2] = arr5;
console.log(rest); // [2, 3]
console.log(rest2);  // []

```
- 배열 비구조화(array destructuring)
  - 배열의 여러 속성값을 변수로 쉽게 할당할 수 있는 문법

```js
const obj = { age: 20, name: 'a' }
const { age, name } = obj;
console.log(age);  // 20
console.log(name);  // 'a'

const obj2 = { age2: 21, name2: 'b' }
const { age2: theAge, name2 } = obj2;
console.log(theAge);  // 21
console.log(age2);  // 참조 에러

const obj3 = { age3: undefined, name3: null, grade3: 'A' }
const { age3 = 0, name3 = 'noName', grade3 = 'F' } = obj3;

console.log(age3);  // 0
console.log(name3);  // null
console.log(grade3);  // 'A'

const obj4 = { age4: 21, name4: 'mike', grade: 'A' }
const { age4, ...rest } = obj4;
console.log(rest); // { name4: 'mike', grade: 'A' }

const people = [{ tempA: 1, tempB: 2}, { tempA: 3, tempB: 4}];

for (const { tempA, tempB } of people ) {
  console.log(tempA, tempB)
}

const obj5 = { name5: 'mike', mother: { name: 'sara'}};
const { name5, mother: { name: motherName }} = obj5;

console.log(name5);  // 'mike'
console.log(motherName);  // 'sara'
console.log(mother);  // 참조 에러
```
- 객체 비구조화(object destructuring)
  - 객체의 여러 속성값을 변수로 쉽게 할당할 수 있는 문법

## 2.3 강화된 함수의 기능

## 2.4 향상된 비동기 프로그래밍: 프로미스