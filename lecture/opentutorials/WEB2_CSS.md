# CSS
https://opentutorials.org/course/3086

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
- 웹 페이지를 디자인할 때 HTML 을 이용해서 디자인하는 것보다 훨씬더 효과적일 수 있다. 이것이 우리가 CSS 를 사용하는 매우 중요한 이유라는 것이다.
- 디자인과 관련된 코드는, style 안에 갇혀있게된다. 
- 이로 인해, HTML 의 분석기는 필요한 정보를 명확하게 획득할 수 있다.


- HTML 이 정보에 전념하기 위해, HTML 로 부터 디자인에 대한 기능을 뺏어온것
- CSS 를 통해 웹페이지를 디자인 하는 것이 HTML 을 통해 디자인하는 것보다 훨씬 더 효율적

# WEB2 CSS - 4. CSS의 기본 문법
https://www.youtube.com/watch?v=h0AlL9YI6bM

CSS 를 HTML 에게 알려주기 위해서는 크게 3가지 방식이 존재한다.

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
- 스타일 태그 내 `a` 처럼, 스타일을 누군가에게 준다는 점에서, `a` 와 같은 것을 선택자 또는 selector 라고 부른다.
- 선택자에게 지정된 효과를 `color: red` 이며, 이것을 효과 또는 declaration(선언) 라고 부른다.
- 세미콜론은 구분자 역할을 한다.

# WEB2 CSS 5 - 혁명적 변화
https://www.youtube.com/watch?v=nC2-nJEXL2U


```
<style>
  a {
    color: red;
  }
</style>
```
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
- 그룹핑(grouping) 하다, 하나로 묶는 다는 의미가 포함되어 있음
- class 라는 속성의 값에는 여러개의 값들이 들어올 수 있으며, 띄어쓰기로 구분
- class 속성에 여러개가 존재하고, 같은 선언이라면, 가장 가까운 대상이 적용된다.
- 하나의 태그에, 여러개의 클래스가 존재하고, 각 클래스에 같은 선언이 존재한다면 랭크에 따라 실질적으로 정용되는 값이 달라짐

id
- id는 class 보다 우선순위가 높다.

id > class > tag

즉.. style 태그 기준 가장 아래있는게 가장 가까운것이다.
이는 페이지가 읽어지는 순서를 생각하면 쉽다.
가장 가까운것은 결국 마지막에 읽혀지는 대상일것이다.

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

HTML 의 여러 태그들은, 태그의 성격과 일반적인 쓰임에 따라서 
- 화면의 전체 사용
  - block level element
- 자신의 부피만을 사용
  - inline element
- 해당 값들은, display 속성의 기본 값일뿐, 언제든 CSS 를 통해서 바꿀 수 있다. 

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
          Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document
          written in a markup language.[1] Although most often used to set the visual style of web pages and user
          interfaces written in HTML and XHTML, the language can be applied to any XML document, including plain XML, SVG
          and XUL, and is applicable to rendering in speech, or on other media. Along with HTML and JavaScript, CSS is a
          cornerstone technology used by most websites to create visually engaging webpages, user interfaces for web
          applications, and user interfaces for many mobile applications.
        </p>
      </div>
    </div>
  </body>
</html>
```
- `#grid ol` 의 의미는 ol 중 부모가 #grid 인 태그를 선택하는 선택자가 되는것

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
        <p>
          Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document
          written in a markup language.[1] Although most often used to set the visual style of web pages and user
          interfaces written in HTML and XHTML, the language can be applied to any XML document, including plain XML, SVG
          and XUL, and is applicable to rendering in speech, or on other media. Along with HTML and JavaScript, CSS is a
          cornerstone technology used by most websites to create visually engaging webpages, user interfaces for web
          applications, and user interfaces for many mobile applications.
        </p>
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

# 검색
CSS 란