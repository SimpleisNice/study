# CSS
https://opentutorials.org/course/3086

CSS
- Cascading Style Sheets

# WEB2 CSS - 1. 수업 소개
https://www.youtube.com/watch?v=Ok0bBJPtgJI

# WEB2 CSS - 2. CSS가 등장하기 전의 상황
https://www.youtube.com/watch?v=-OWx2vM4tLI

웹 페이지가, 스타일에 관한 내용이 포함되면서 정보로서 가치가 떨어지게됨

# WEB2 CSS - 3. CSS의 등장
https://www.youtube.com/watch?v=L41Zjl7XANI

```html
<!DOCTYPE html>
<html>
  <!-- 본문을 설명 -->
  <head>
    <title>WB1 - CSS</title>
    <meta charset="utf-8">
    <!-- CSS -->
    <style>
      a {
        color: red;
      }
    </style>
  </head>

  <!-- 본문 -->
  <body>
    <h1><a href="index.html" title="HOME">WEB</a></h1>
    <h2>WEB</h2>
    <p>INFO</p>
  </body>
</html>
```
- `<style></style>`
- CSS 를 사용하는 것은
  - CSS 를 통해 웹 페이지를 디자인 하는 것은, HTML 을 통해 디자인하는 것보다 훨씬 더 효율적이다.
  - CSS 를 사용함으로 HTML 이 정보에 전념할 수 있으며, 분석기는 필요한 정보를 HTML 에서 명확하게 획득 할 수 있다.
  - 디자인과 관련된 코드는 `style` 안에 갇혀있게된다.

# WEB2 CSS - 4. CSS의 기본 문법
https://www.youtube.com/watch?v=h0AlL9YI6bM

CSS 를 HTML 에게 알려주기 위해서는 아래의 방식을 사용한다.

1. style 태그 사용
2. style 속성 사용

```html
<!DOCTYPE html>
<html>
  <!-- 본문을 설명 -->
  <head>
    <title>WB1 - CSS</title>
    <meta charset="utf-8">
    <!-- CSS -->
    <style>
      a {
        color: red;
      }
    </style>
  </head>

  <!-- 본문 -->
  <body>
    <h1><a href="index.html" title="HOME">WEB</a></h1>
    <h2 style="color: green">WEB</h2>
    <p>INFO</p>
  </body>
</html>
```
- `style` 태그 내 `a` 처럼, 스타일을 누군가에게 준다는 점에서, `a` 와 같은 것을 `선택자` 또는 `selector` 라고 부른다.
- 선택자에게 지정된 효과를 `color: red` 이며, 이것을 `선언` 또는 `declaration` 라고 부른다.
- 세미콜론은 구분자 역할을 한다.

# WEB2 CSS 5 - 혁명적 변화
https://www.youtube.com/watch?v=nC2-nJEXL2U


```html
<style>
  a {
    color: red;
  }
</style>
```
Rule set
- 전체 구조

Selector: a
- 선택자

Declaration: color:red;
- 선언

Property: color
- 속성

value: red
- 값

# WEB2 CSS - 6. CSS 속성을 스스로 알아내기
https://www.youtube.com/watch?v=WcED6Ia1IY4

# WEB2 CSS - 7. CSS 선택자의 기본
https://www.youtube.com/watch?v=8-rCMmamtDE


```html
<!DOCTYPE html>
<html>
  <!-- 본문을 설명 -->
  <head>
    <title>WB1 - html</title>
    <meta charset="utf-8">
    <style>
      a {
        color: black;
        text-decoration: none;
      }
      h1 {
        font-size: 10em;
        text-align: center;
      }
      .saw {
        color: gray;
      }
      .active {
        color: red;
      }
      #activeId {
        color: red;
      }
    </style>
  </head>
  <!-- 본문 -->
  <body>
    <h1><a href="index.html" title="HOME">WEB</a></h1>
    <ol>
      <li><a href="./1.html" title="HTML" class="saw">HTML</a></li>
      <li><a href="./2.html" title="CSS" class="saw active" id="activeId">CSS</a></li>
      <li><a href="./3.html" title="JavaScript">JavaScript</a></li>
    </ol>
    <h2>WEB</h2>
    <p>Info</p>
  </body>
</html>
```

class
- 그룹핑(grouping) 하다, 하나로 묶다 라는 의미가 포함
- class 속성 값에는 여러개의 값들이 들어올 수 있으며, 띄어쓰기로 구분
- 위 예시처럼, class 내 여러 값들이 존재하며, 각 값들이 같은 내용을 변경한다면, class 와 가장 가까운 대상이 반영된다. 이는 브라우저가 위에서 아래로 분석
- 위 예시처럼, class 속성 내 값들이 여러개이며, 값들이 같은 내용을 변경한다면, class 와 가장 가까운 대상이 적용된다.

id
- id 는 문서 전체에서 유일한 고유식별자를 정의
- 고유식별자의 목적은 프래그먼트 식별자를 사용해 요소를 가리킬 때와 스크립트 및 스타일 적용 시 특정 요소를 식별하기 위함
- id는 class 보다 우선순위가 높다.


id > class > tag

style 태그 기준 가장 아래있는게 가장 가까운 것이며, 이는 페이지가 읽어지는 순서를 생각하면 된다. 즉 가장 가까운 것은 결국 마지막에 읽혀 반영되는 것이다.

# WEB2 CSS - 8. 박스 모델
https://www.youtube.com/watch?v=MLjCVUspcDo

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <style>
      h1 {
        border: 5px solid red;
        display: inline;
      }
      a {
        border-width: 5px;
        border-color: red;
        border-style: solid;
        display: block;
      }
    </style>
  </head>
  <body>
    <h1>CSS</h1>
    css info <a href="javascript:void">test</a>
  </body>
</html>
```

HTML 의 여러 태그들은, 태그의 성격과 일반적인 쓰임에 따라
- 화면의 전체 사용
  - block level element
- 자신의 부피만을 사용
  - inline element
- 해당 값들은, display 속성의 기본 값 일뿐, 언제든 CSS 를 통해서 바꿀 수 있다. 

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <style>
      h1 {
        border: 5px solid red;
        padding: 20px;
        margin: 20px;
        display: block;
        width: 100px;
      }
    </style>
  </head>
  <body> 
    <h1>CSS</h1>
    <h1>CSS</h1>
  </body>
</html>
```
- margin
- border
- margin

# WEB2 CSS - 9. 박스 모델 써먹기
https://www.youtube.com/watch?v=4ir8XAf7wxI

```html
<!DOCTYPE html>
<html>
  <!-- 본문을 설명 -->
  <head>
    <title>WB1 - html</title>
    <meta charset="utf-8">
    <style>
      body {
        margin: 0;
      }
      .saw {
        color: gray;
      }
      #active {
        color: red;
      }
      a {
        color: block;
        text-decoration: none;
      }
      h1 {
        font-size: 45px;
        text-align: center;
        border-bottom: 1px solid gray;
        margin: 0;
        padding: 20px;
      }
      ol {
        border-right: 1px solid gray;
        width: 20%;
        margin: 0;
        padding: 20px;
      }
    </style>
  </head>

  <!-- 본문 -->
  <body>
    <h1><a href="index.html" title="HOME">WEB</a></h1>
    <ol>
      <li><a href="./1.html" class="saw" title="HTML">HTML</a></li>
      <li><a href="./2.html" class="saw" id="active" title="CSS">CSS</a></li>
      <li><a href="./3.html" class="saw" title="JavaScript">JavaScript</a></li>
    </ol>
    <h2>CSS</h2>
    <p>CSS info</p>
  </body>
</html>
```

각가의 블록들은 아래와 같은 속성을 가진다.
```
  +---------------------+
  |             margin  |
  |   +----border----+  |
  |   |              |  |
  |   |    padding   |  |
  |   |              |  |
  |   +--------------+  |
  +---------------------+
```

- padding: 컨텐트 주위의 공간 (예, 문단 글자의 주위)
- border: padding 의 바깥쪽에 놓인 실선
- margin: 요소의 바깥쪽을 둘러싼 공간


# WEB2 CSS - 10. 그리드 소개
https://www.youtube.com/watch?v=M1eQFIBY2vI

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <style>
      div {
        border: 5px solid gray;
        display: grid;
        grid-template-columns: 1fr 1fr;
      }
      #grid {
        border: 5px solid pink;
      }
    </style>
  </head>
  <body>
    <div id=grid>
      <div>NAVIGATION</div>
      <div>ARTICLE</div>
    </div>
  </body>
</html>
```



https://caniuse.com/

# WEB2 CSS - 11. 그리드 써먹기
https://www.youtube.com/watch?v=AL8RSY8rADY

```html
<!doctype html>
<html>
  <head>
    <title>WEB - CSS</title>
    <meta charset="utf-8">
    <style>
      body {
        margin: 0;
      }
      a {
        color: black;
        text-decoration: none;
      }
      h1 {
        font-size: 45px;
        text-align: center;
        border-bottom: 1px solid gray;
        margin: 0;
        padding: 20px;
      }
      ol {
        border-right: 1px solid gray;
        width: 100px;
        margin: 0;
        padding: 20px;
      }
      #grid {
        display: grid;
        grid-template-columns: 150px 1fr;
      }
      #grid ol {
        padding-left: 33px;
      }
      #grid #article {
        padding-left: 25px;
      }
    </style>
  </head>
  <body>
    <h1><a href="index.html">WEB</a></h1>
    <div id="grid">
      <ol>
        <li><a href="1.html">HTML</a></li>
        <li><a href="2.html">CSS</a></li>
        <li><a href="3.html">JavaScript</a></li>
      </ol>
      <div id="article">
        <h2>CSS</h2>
        <p>
          CSS Info!!
        </p>
      </div>
    </div>
  </body>
</html>
```
- `#grid ol` 의 의미는 `ol` 중 부모가 `#grid` 인 태그를 선택하는 선택자가 되는것

# WEB2 CSS - 12. 미디어 쿼리 소개
https://www.youtube.com/watch?v=aA4xunvDWU8

반응형 웹
- 화면의 크기에 따라서 웹 페이지의 각 요소들이 반응해서 최적화된 모양으로 바뀌게 하는것

미디어 쿼리
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <style>
      div {
        border: 5px solid green;
        font-size: 60px;
      }
      @media(max-width:800px) {
        div { 
          display: none;
        }
      }
    </style>
  </head>
  <body>
    <div>
      Responsive
    </div>
  </body>
</html>
```
- min-width
  - 최솟값
- max-width
  - 최댓값


# WEB2 CSS - 13. 미디어 쿼리 써먹기
https://www.youtube.com/watch?v=qe3nSIg2k3Y&t=5s

```html
<!doctype html>
<html>
  <head>
    <title>WEB - CSS</title>
    <meta charset="utf-8">
    <style>
      body {
        margin: 0;
      }
      a {
        color: black;
        text-decoration: none;
      }
      h1 {
        font-size: 45px;
        text-align: center;
        border-bottom: 1px solid gray;
        margin: 0;
        padding: 20px;
      }
      ol {
        border-right: 1px solid gray;
        width: 100px;
        margin: 0;
        padding: 20px;
      }
      #grid {
        display: grid;
        grid-template-columns: 150px 1fr;
      }
      #grid ol {
        padding-left: 33px;
      }
      #grid #article {
        padding-left: 25px;
      }

      @media(max-width:800px) {
        #grid {
          display: block;
        }
        ol {
          border-right: none;
        }
        h1 {
          border-bottom: none;
        }
      }
    </style>
  </head>
  <body>
    <h1><a href="index.html">WEB</a></h1>
    <div id="grid">
      <ol>
        <li><a href="1.html">HTML</a></li>
        <li><a href="2.html">CSS</a></li>
        <li><a href="3.html">JavaScript</a></li>
      </ol>
      <div id="article">
        <h2>CSS</h2>
        <p>CSS Info</p>
      </div>
    </div>
  </body>
</html>
```

# WEB2 CSS - 14. CSS 코드의 재사용
https://www.youtube.com/watch?v=djBrHjeitUo

```html
<html>
  <head>
    <link rel="stylesheet" href="index.css">
  </head>
  <head></head>
</html>
```

캐싱
- 한번 style.css 라는 파일을 다운로드 받았다면
- 해당 파일이 변경되기 전까지 우리의 컴퓨터에 저장 및 사용
- 빠른 속도 및 적은 네트워크 사용

# WEB2 CSS - 15. 수업을 마치며
https://www.youtube.com/watch?v=42Bps7nCx8I
