# Singleton Pattern
Singletons are classes which can be instantiated once, and can be accessed globally. This single instance can be shared throughout our application, which makes Singletons great for managing global state in an application.

In software engineering, the singleton pattern is a software design pattern that restricts the instantiation of a class to one "single" instance. This is useful when exactly one object is needed to coordinate actions across the system.

Singleton pattern is a design pattern which restricts a class to instantiate its multiple objects.
Class is defined in such a way that only one instance of the class is created in the complete execution of a program or project.
It is used where only a single instance of a class is required to control the action throughout the execution.

객체의 인스턴스가 오직 1개만 생성되는 패턴을 의미

메모리 측면

데이터 공유

오직 한 개의 클래스 인스턴스만을 갖도록 보장하고, 이에대한 전역적인 접근점을 제공하도록 하는 패턴을 의미
```js
let count = 0;
let instance;

class Counter {
  constructor() {
    if (instance) {
      throw new Error('Only one instance can be created.');
    }
    instance = this;
  }

  getInstance() {
    return this;
  }

  getCount() {
    return count;
  }

  increase() {
    return ++count;
  }

  decrease() {
    return --count;
  }
}

const counterInstance = Object.freezen(new Counter());
export default counterInstance;
```

## 참고
- https://www.patterns.dev/posts/singleton-pattern/
- https://www.geeksforgeeks.org/singleton-design-pattern-introduction/
