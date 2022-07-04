# CLOSURE
https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures

클로저는 함수와 함수가 선언된 어휘적 환경의 조합이다.

클로저를 이해하려면 자바스크립트가 어떻게 변수의 유효범위를 지정하는지(Lexical scoping)을 먼저 이해해야한다.

## 어휘적 범위 지정(lexical scoping)
```js
function init() {
  var name = 'Mozilla';
  function displayName() {
    console.log(name);
  }
  
  displayName();
}

init();
```
여기서 "lexical"이란, 어휘적 범위 지정(lexical scoping) 과정에서 변수가 어디에서 사용가능한지 알기 위해 그 변수가 소스코드 내 어디에서 선언되었는지 고려한다는 것을 의미한다.

### 클로저(Closure)
```js
function makeFunc() {
  var name = 'Mozilla';
  function displayName() {
    console.log(name);
  }
  return displayName;
}

var myFunc = makeFunc();
myFunc();
```
클로저는 함수와 함수가 선언된 어휘적 환경의 조합이다. 
이 환경은 클로저가 생성된 시점의 유효 범위 내에 있는 모든 지역 변수로 구성된다.
- 첫번째 예시의 경우, myFunc은 myFunc이 실행 될 때 생성된 displayName함수의 인스턴스에 대한 참조다. displayName의 인스턴스는 변수 name이 있는 어휘적 환경에 대한 참조를 유지한다. 이런 이유로 myFunc가 호출될 때 변수 name은 사용할수 있는 상태로 남게된다.

```js
function makeAdder(x) {
  var y = 1;
  return function(z) {
    y = 100;
    return x + y + z;
  }
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2)); // 107
console.log(add10(2)); // 112
```
add5, add10은 둘다 클로저이다.
이들은 같은 함수 본문 정의를 공유하지만 서로 다른 맥락(어휘)적 환경을 저장한다.

## 실용적 클로저
클로저는 어떤 데이터(어휘적 환경)와 그 데이터를 조작하는 함수를 연관시켜주기 대문에 유용하다. 이것은 객체가 어떤 데이터와(그 객체의 속성) 하나 혹은 그 이상의 메소드들을 연관 시킨다는 점에서 객체지향 프로그래밍과 분명히 같은 맥락에 있다.

결론적으로 오직 하나의 메소드를 가지고 있는 일반적으로 사용하는 모든 곳에 클로저를 사용할 수 있다.

## 클로저를 이용해서 프라이빗 메소드(private method) 흉내내기
자바와 같은 몇몇 언어들은 메소드를 프라이빗으로 선언할 수 있는 기능을 제공한다.

이는 같은 클래스 내부의 다른 메소드에서만 그 메소드들을 호출할 수 있다는 의미이다.

프라이빗 메소드는 코드에 제한적인 접근만을 허용한다는 점 뿐만 아니라 전역 네임 스페이스를 관리하는 강력한 방법을 제공하여 불필요한 메소드가 공용 인터페이스를 혼란스럽게 만들지 않도록 한다.

아래와 같이 클로저를 사용하는 것을 모듈 패턴이라고 한다.
```js
var counter = (function() {
  var privateCounter = 0;
  
  function changeBy(val) {
    privateCounter += val;
  }
  
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
    	changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  }
})();


console.log(counter.value()); // 0
counter.increment();
counter.increment();
console.log(counter.value()); // 2
counter.decrement();
console.log(counter.value()); // 1
```

## 클로저 스코프 체인
모든 클로저에는 세가지 스코프(범위)가 있다.
- 지역 범위(local scope, own scope)
- 외부 함수 범위(outer functions scope)
- 전역 범위(global scope)

## 루프에서 클로저 생성하기: 일반적인 실수
