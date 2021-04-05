# 2장 도구 다루기

## 목차

### 2.1 테스팅 프레임워크
### 2.2 의존성 주입 프레임워크
### 2.3 애스팩트 툴킷
### 2.4 코드 검사 도구
### 2.5 정리하기

---

## **2.1 테스팅 프레임워크**

재스민 단위 테스트 실행하기
- 재스민 단위 테스트 실행을 자동화한 테스트 실행기가 있지만, 해당 책에서는 브라우저에서 재스민을 그때그때 실행하여 테스트.
- 테스트를 위해 아래의 사항을 준비한다.
  - 재스민 라이브러리
  - 자바스크립트
  - CSS 파일을 참조하는 단순한 HTML 파일
- 테스트 대상 코드가 들어 있는 자바스크립트 파일과 단위 테스트 코드가 포함된 파일을 스크립트로 참조
```html
<!-- jasmine cdn -->
<head>
  <link data-require="jasmine@*" data-semver="2.0.0" rel="stylesheet" href="http://cdn.jsdelivr.net/jasmine/2.0.0/jasmine.css"
  />
  <script data-require="jasmine@*" data-semver="2.0.0" src="http://cdn.jsdelivr.net/jasmine/2.0.0/jasmine.js">
  </script>
  <script data-require="jasmine@*" data-semver="2.0.0" src="http://cdn.jsdelivr.net/jasmine/2.0.0/jasmine-html.js">
  </script>
  <script data-require="jasmine@*" data-semver="2.0.0" src="http://cdn.jsdelivr.net/jasmine/2.0.0/boot.js">
  </script>

  <!-- 테스트 대상 코드 -->
  <script src="createUser.js"></script>
  <!-- 단위 테스트 -->
  <script src="createUser_tests.js"></script>
</head>
```

단위 테스트가 없는 기존 코드를 작업할 땐 실제 기능을 확인하는 테스트를 작성해야 한다. 그래야 밖으로 표출되는 기능을 변경하지 않은 상태에서 코드를 리팩토링할 수 있다.

### **2.1.1 잘못된 코드 발견하기**
## **2.2 의존성 주입 프레임워크**
## **2.3 에스팩트 툴킷**
## **2.4 코드 검사 도구**
## **2.5 정리하기**


