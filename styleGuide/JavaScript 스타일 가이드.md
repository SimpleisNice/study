# JavaScript 스타일 가이드 개선
1. ESLint



----
----


# ESLint
## ESLint 조금 더 잘 활용하기
- https://tech.kakao.com/2019/12/05/make-better-use-of-eslint/
- https://eslint.org/docs/user-guide/getting-started

위 글에서는 다음과 같은 내용을 알 수 있다.
- ESLint 의 설정 공유하는 방법, 규칙을 직접 만드는 방법에 대한 정리
- 스타일 가이드 업무를 하며 알게 된 점, 컨트리뷰션을 하며 얻게된 지식


### ESLint
JavaScript, JSX 의 정적 분석 도구로 오픈 소스 프로젝트

코드를 분석해 문법적인 오류나 안티 패턴을 찾아주고 일관된 코드 스타일로 작성하도록 도와줌

ESLint 는 커스터마이징이 쉽고 확장성이 뛰어나 많이 쓰이고 있는 추세

ESLint 스타일 가이드를 좀 더 편리하게 적용하기 위해 사용하며, 아래의 기업에서 해당 정보를 외부에 공개하고 있다.
- https://github.com/airbnb/javascript
- https://github.com/google/eslint-config-google

### ESLint 설정 공유하기
ESLint 는 Shareable Configs 라는 기증을 제공하고 있음

이는 누군가 만들어 놓은 ESLint 설정을 npm 을 이용해 쉽게 설치 및 확장해서 사용할 수 있는 기능

Shareable Configs 를 만들기 위해서

1. 설정 만들기
 - Shareable Configs 를 만들기 위해 필요한 파일은 package.json 과 index.js
```
eslint-config-[설정 이름]/
 ├── index.js
 └── package.json
```

2. package.json
package.json 작성 시 주의할점
- 패키지 이름
  - npm 을 통해 공유 가능한 설정을 만들기 위해서는 "eslint-config-[설정 이름]" 형식 사용
- peerDependencies 를 명시
  - ESLint 와 플러인의 버전마다 추가된 규칙이나 옵션이 있기 때문에 설정한 규칙을 지원하는 버전 명시
```json
// package.json
{
  "name": "eslint-config-[설정 이름]",
  "peerDependencies": {
    "eslint": ">=6",
    "eslint-plugin-import": "^2.18.2"
    // ...
  }
}
```

3. 확장할 설정
프로젝트의 ESLint 설정을 할 때처럼, 공유 설정에도 extends 항목에 이미 npm 공유된 설정을 사용할 수 있다.

또한 프로젝트 내부에 있는 설정을 확장할 수 있는데, 스타일 가이드 작업 시 이를 이용해 ECMAScript 버전, 분석의 대상(ECMAscript 버전 JSDoc) 등에 따라 규칙을 디렉터리로 분류해 관리하고 있다.
```
eslint-config-[설정 이름]/
 ├── index.js
 ├── package.json
 ├── es6/
 │    └── index.js
 ├── comment/
 │    └── index.js
 │ ...
```

4. 플러그인 추가
공유 설정에서 플러그인을 설정할 수 있다.

ESLint 에서 기본으로 제공하지 않는 다양한 규칙을 플러그인을 통해 사용할 수 있다.

Ex)
- eslint-plugin-jsdoc
- typescript-eslint


5. 사용할 규칙 설정
- https://eslint.org/docs/rules/
rules 에는 직접 규칙을 설정할 수 있으며, 설정할 수 있는 기본 규칙과 옵션은 ESLint Rules 에서 확인할 수 있다.

설정한 규칙을 어긴 코드가 있을 때 warning 또는 error 를 발생시키도록 설정할 수 있다.

error 가 하나라도 발생할 경우 ESLint 의 종료 코드(exit code) 가 1이 되며, warning 은 종료 코드에 영향을 미치지 않음

작업한 스타일 가이드에서는 no-debugger 와 같이 일부 개발 과정 중에 어길 수 있는 규칙들을 warning 으로 설정해 사용하고 있음

6. index.js
index.js 에는 공유할 설정을 작성
- 확장할 설정, 플러그인, 사용할 규칙 등을 설정할 수 있다.

```js
module.exports = {
  // 확장할 설정
  "extends": ["eslint:recommended", ],
  // 플러그인 추가
  "plugins": ["import", ],
  // 사용할 규칙 설정
  "rules": {
    "semi": "error",
    "no-console": "error",
  },
}
```