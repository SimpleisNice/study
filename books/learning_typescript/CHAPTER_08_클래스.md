# CHAPTER08 클래스

## 8.1 클래스 메서드

```ts
class Greeter {
  greet(name: string) {
    console.log(`${name}, do your stuff`);
  }
}

// ok
new Greeter().greet("Miss Frizzle");
// Expected 1 arguments, but got 0
new Greeter().greet();
```

## 8.2 클래스 속성

타입스크립트에서 클래스의 속성을 읽거나 쓰려면 클래스에 명시적으로 선언해야 함

클래스 속성은 인터페이스와 동일한 구문을 사용해 선언

클래스 속성 이름 뒤에는 선택적으로 타입 애너테이션이 붙음

타입스크립트는 생성자 내의 할당에 대해서 그 멤버가 클래스에 존재하는 멤버인지 추론하려고 시도하지 않음

```ts
class TempField {
  destination: string;

  constructor(destination: string) {
    // ok
    this.destination = destination;
    // Property 'fieldName' does not exist on type 'TempField'.
    this.fieldName = destination;
  }
}
```

### 8.2.1 함수 속성

자바스크립트에는 클래스의 멤버를 호출 가능한 함수로 선언하는 두 가지 구문이 있음

- 메서드 접근 방식
  - 함수를 클래스 프로토타입에 할당하므로 모든 클래스 인스턴스는 동일한 함수 정의를 사용
- 값이 함수인 속성을 선언하는 방식
  - 해당 방식은 클래스의 인스턴스당 새로운 함수가 생성되며, 항상 클래스 인스턴스를 가리켜야 하는 화살표 함수에서 this 스코프를 사용하면 클래스 인스턴스당 새로운 함수를 생성하는 시간과 메모리 비용 측면에서 유용할 수 있음

```ts
class TempField {
  constructor(destination: string) {
    this.destination = destination;
    this.myProperty = () => {};
  }

  destination: string;
  // 메서드 접근 방식
  myMethod() {}
  // 값이 함수인 속성을 선언하는 방식
  myProperty: () => void;
}

// true
console.log(new TempField("temp").myMethod === new TempField("temp").myMethod);
// false
console.log(
  new TempField("temp").myProperty === new TempField("temp").myProperty
);
```

함수 속성에는 클래스 메서드와 독립 함수의 동일한 구문을 사용해 매개변수와 반환 타입을 지정할 수 있음

결국 함수 속성은 클래스 멤버로 할당된 값이고, 그 값은 함수이다.

### 8.2.2 초기화 검사

엄격한 컴파일러 설정이 활성화된 상태에서 타입스크립트는 undefined 타입으로 선언된 각 속성이 생성자에서 할당되어 있는지 확인한다.

위와 같은 엄격한 초기화 검사는 클래스 속성에 값을 할당하지 않는 실수를 예방할 수 있어 용이함

#### 확실하게 할당된 속성

엄격한 초기화 검사를 적용하면 안 되는 속성인 경우에는 이름 뒤에 `!`를 추가해 검사를 비활성하도록 설정한다.

이를 통해 타입스크립트에 속성이 처음 사용되기 전에 undefined 값이 할당된다.

```ts
class ActivitesQueue {
  // ok
  pending!: string[];

  initialize(pending: string[]) {
    this.pending = pending;
  }

  next() {
    return this.pending.pop();
  }
}

const activites = new ActivitesQueue();

activites.initialize(["a", "b", "c"]);
activites.next();
```

- 클래스 속성에 대해 엄격한 초기화 검사를 비활성화하는 것은 종종 타입 검사에서는 적합하지 않은 방식으로 코드가 설정된다는 신호
- 어서션을 추가하고 속성에 대한 타입 안정성을 줄이는 대신 클래스를 리팩터링해서 어셔선이 더 이상 필요하지 않도록 해야함

### 8.2.3 선택적 속성

인터페이스와 마찬가지로 클래스 선언된 속성 이름 뒤에 `?`를 추가해 속성을 옵션으로 선언함

선택적 속성은 `| undefined`를 포함하는 유니언 타입과 거의 동일하게 작동

엄격한 초기화 검사는 생성자에서 선택적 속성을 명시적으로 설정하지 않아도 문제가 되지 않음

```ts
class Temp {
  // ok
  tempName?: string;
  tempAge: number;

  constructor(tempAge: number) {
    this.tempAge = tempAge;
  }
}
```

### 8.2.4 읽기 전용 속성

클래스도 선언된 속성 이름 앞에 readonly 키워드를 추가해 속성을 읽기 전용으로 선언함

readonly 키워드는 타입시스템에만 존재하며 자바스크립트로 컴파일할 때 삭제됨

readonly로 선언된 속성은 선언된 위치 또는 성생자에서 초깃값만 할당할 수 있음

```ts
class Temp {
  readonly tempType: string;

  constructor(tempType: string) {
    this.tempType = tempType;
  }

  getTempType() {
    // ok
    return this.tempType;
  }

  setTempType(tempType: string) {
    // Cannot assign to 'tempType' because it is a read-only property.
    this.tempType = tempType;
  }
}
```

- 진정한 읽기 전용 보호가 필요하다면 # private 필드나 get() 함수 속성 사용을 고려해 보세요

## 8.3 타입으로서의 클래스

타입 시스템에서 클래스는 클래스 선언이 런타임 값 (클래스 자체)과 타입 애너테이션에서 사용할 수 있는 타입을 모두 생성한다는 점에서 상대적으로 독특함

타입스크립트는 클래스의 동일한 멤버를 모두 포함하는 모든 객체 타입을 클래스에 할당할 수 있는 것으로 간주함

타입스크립트의 구조적 타이핑이 선언되는 방식이 아니라 객체의 형태만 고려하기 때문

```ts
class Bus {
  getBusName() {
    return ["1", "blue-bus"];
  }
}

function withBusType(bus: Bus) {
  console.log(bus.getBusName());
}

// ok
withBusType(new Bus());

// ok
withBusType({
  getBusName: () => ["2", "green-bus"],
});

// Type 'string' is not assignable to type 'string[]'.
withBusType({
  getBusName: () => "3 red-bus",
});
```

## 8.4 클래스와 인터페이스

타입스크립트는 클래스 이름 뒤에 `implements` 키워드와 인터페이스 이름을 추가함으로써 클래스의 해당 인스턴스가 인터페이스를 준수한다고 선언할 수 있다.

이렇게 하면 클래스를 각 인터페이스에 할당할 수 있어야 함을 타입스크립트에 나타낸다.

인터페이스를 구현하는 것은 순전히 안정성 검사를 위함이다.

```ts
interface People {
  name: string;
  getName(): string;
}

class Student implements People {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}
```

### 8.4.1 다중 인터페이스 구현

클래스에 구현된 인터페이스 목록은 인터페이스 이름 사이에 쉼표를 넣고, 개수 제한 없이 인터페이스를 사용할 수 있음

## 8.5 클래스 확장

타입스크립트는 다른 클래스를 확장하거나 하위 클래스를 만드는 자바스크립트 개념에 타입 검사를 추가함

기본 클래스에 선언된 모든 메서드나 속성은 파생 클래스라고도 하는 하위 클래스에서 사용할 수 있음

```ts
class Teacher {
  teach() {
    console.log("the teacher, teach");
  }
}

class StudentTeacher extends Teacher {
  learn() {
    console.log("the student teacher, learn");
  }
}

const teacher = new StudentTeacher();
teacher.learn(); // ok
teacher.teach(); // ok
```

### 8.5.1 할당 가능성 확장

하위 클래스도 기본 클래스의 멤버를 상속한다.

하위 클래스의 인스턴스는 기본 클래스의 모든 멤버를 가지므로 기본 클래스의 인스턴스가 필요한 모든 곳에서 사용할 수 있다.

만약 기본 클래스에 하위 클래스가 가지고 있는 모든 멤버가 없으면 더 구체적인 하위 클래스가 필요할 때 사용할 수 없다.

```ts
class Lesson {
  subject: string;

  constructor(subject: string) {
    this.subject = subject;
  }
}

class OnlineLesson extends Lesson {
  url: string;

  constructor(subject: string, url: string) {
    super(subject);
    this.url = url;
  }
}

// ok
let lesson: Lesson;
lesson = new Lesson("coding");
lesson = new OnlineLesson("coding", "oreilly.com");

// not ok
let online: OnlineLesson;
online = new OnlineLesson("coding", "oreilly.com");
// Property 'url' is missing in type 'Lesson' but required in type 'OnlineLesson'.
online = new Lesson("coding");
```

타입스크립트의 구조적 타입에 따라 하위 클래스의 모든 멤버가 동일한 타입의 기본 클래스에 이미 존재하는 경우 기본 클래스의 인스턴스를 하위 클래스 대신 사용할 수 있음

```ts
class Temp {
  stringArry: string[] = [];
}

class NumTemp extends Temp {
  numArray?: number[];
}

// ok
let subTemp: NumTemp;
subTemp = new Temp();
subTemp = new NumTemp();
```

- 실제 코드에서 하위 클래스는 일반적으로 기본 클래스 위에 새로운 필수 타입 정보를 추가함

### 8.5.2 재정의된 생성자

바닐라 자바스크립트와 마찬가지로 타입스크립트에서 하위 클래스는 작체 생성자를 정의할 필요가 없음

자체 생성자가 없는 하위 클래스는 암묵적으로 기본 클래스의 생성자를 사용함

자바스크립트에서 하위 클래스가 자체 생성자를 선언하면 super 키워드를 통해 기본 클래스 생성자를 호출해야 함

하위 클래스 생성자는 기본 클래스에서의 필요 여부와 상관 없이 모든 매개변수를 선언할 수 있음

타입스크립트의 타입 검사기는 기본 클래스 생성자를 호출할 때 올바른 매개변수를 사용하는지 확인 함

자바스크립트 규칙에 따르면 하위 클래스의 생성자는 this 또는 super에 접근하기 전에 반드시 기본 클래스의 생성자를 호출해야함

타입스크립트는 super()를 호출하기 전에 this 또는 super에 접근하려고 하는 경우 타입 오류를 보고 함

```ts
class Bus {
  color: string;
  busNumber: number;

  constructor(color: string, busNumber: number) {
    this.color = color;
    this.busNumber = busNumber;
  }
}

class CompanyBus extends Bus {
  constructor() {
    super("green", 1000);
  }
}

class SchoolBus extends Bus {
  // Constructors for derived classes must contain a 'super' call.
  constructor() {}
}
```

### 8.5.3 재정의된 메서드

하위 클래스의 메서드가 기본 클래스의 메서드에 할당될 수 있는 한 하위 클래스는 기본 클래스와 동일한 이름으로 새 메서드를 다시 선언할 수 있다.

기본 클래스를 사용하는 모든 곳에 하위 클래스를 사용할 수 있으므로 새 메서드의 타입도 기본 메서드를 대신 사용할 수 있어야 한다

```ts
class GradeCounter {
    counterGrades(grades: string[], letter: string) {
        return grades.filter(grade => grade === letter).length;
    }
}

class FailureCounter extends GradeCounter {
    counterGrades(grades: string[]) {
        return super.counterGrades(grades, 'F')
    }
}

class AnyFailureCounter extends GradeCounter {
    counterGrades(grades: string[]) {
      // Property 'counterGrades' in type 'AnyFailureCounter' is not assignable to the same property in base type 'GradeCounter'.
      // Type '(grades: string[]) => boolean' is not assignable to type '(grades: string[], letter: string) => number'.
      // Type 'boolean' is not assignable to type 'number'.
        return super.counterGrades(grades, 'F') !=== 0;
    }
}
```

### 8.5.4 재정의된 속성

하위 클래스는 새 타입을 기본 클래스의 타입에 할당할 수 있는 한 동일한 이름으로 기본 클래스의 속성을 명시적으로 다시 선언할 수 있다.

재정의된 메서드와 마찬가지로 하위 클래스는 기본 클래스와 구조적으로 일치해야 한다.

속성을 다시 선언하는 대부분의 하위 클래스는 해당 속성을 유니언 타입의 더 구체적인 하위 집합으로 만들거나 기본 클래스 속성 타입에서 확장되는 타입으로 만듬

속성의 유니언 타입의 허용된 값 집합을 확장할 수 없음

- 만약 확장한다면 하위 클래스 속성은 더 이상 기본 클래스 속성 타입에 할당할 수 없음

```ts
class Assignment {
  grade?: number;
}

class GradedAssignment extends Assignment {
  grade: number;

  constructor(grade: number) {
    super();
    this.grade = grade;
  }
}
```

## 8.6 추상 클래스

때로는 일부 메서드의 구현을 선언하지 않고, 대신 하위 클래스가 해당 메서드를 제공할 것을 예상하고 기본 클래스를 만드는 방법이 유용할 수 있음

추상화하려는 클래스 이름과 메서드 앞에 타입스크립트의 abstract 키워드를 추가함

- 추상화 메서드 선언은 추상화 기본 클래스에서 메서드의 본문을 제공하는 것을 건너뛰고, 대신 인터페이스와 동일한 방식으로 선언됨

```ts
abstract class People {
  readonly name: string;
  readonly age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  abstract getName(): string;
  abstract getAge(): number;
}

class Student extends People {
  getName() {
    return this.name;
  }
  getAge() {
    return this.age;
  }
}

let student = new Student("temp", 10);
student.getName();
student.getAge();
```

## 8.7 멤버 접근성

자바스크립트에서 클래스 멤버 이름 앞에 `#`을 추가해 private 클래스 멤버임을 나타냄

private 클래스 멤버는 해당 클래스 인스턴스에서만 접근할 수 있음

자바스크립트 런타임은 클래스 외부 코드 영역에서 private 메서드나 속성에 접근하려고 하면 오류를 발생시킴

자바스크립트 런타임에서는 `#` private 필드만 진정한 private이다.

```ts
class Base {
  public publicVaue = 1;
  protected protectedValue = 2;
  private privateValue = 3;
  #privateValue2 = 4;
}

class SubClass extends Base {
  getItem() {
    this.publicVaue;
    this.protectedValue;
    // Property 'privateValue' is private and only accessible within class 'Base'.
    this.privateValue;
    // Property '#protectedValue2' does not exist on type 'SubClass'.
    this.#privateValue2;
  }
}
```

### 8.7.1 정적 필드 제한자

자바스크립트는 static 키워드를 사용해 클래스 자체에서 멤버를 선언함

타입스크립트는 static 키워드를 단독으로 사용하거나 readonly와 접근성 키워드를 함께 사용할 수 있도록 지원

static 클래스 필드에 대해 readonly와 접근성 제한자를 사용하면 해당 필드가 해당 클래스 외부에서 접근되거나 수저오디는것을 제한하는 데 유용함

```ts
class Question {
  static readonly #answer = "bash";
  static readonly #prompt = ">>";

  guess(getAnswer: (prompt: string) => string) {
    const answer = getAnswer(Question.#prompt);

    if (answer === Question.#answer) {
      console.log("TRUE");
    } else {
      console.log(false);
    }
  }
}
```
