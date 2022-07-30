# CSS
Cascading Style Sheets

웹 페이지에서 HTML은 몸의 구조를 담당하고

CSS는 옷과 신발과 같이 외적으로 꾸며주는 역할을 한다.

## CSS 소개
CSS는 간단히 이야기하면 HTML을 꾸며주는 표현용 언어
- http://www.csszengarden.com/

## CSS 문법과 적용
CSS 구문
- `h1 { color: yellow; font-size: 2em; }`
  - 선택자(selector): h1
  - 속성(property): color, font-size
  - 값(value): yellow, 2em
  - 선언(declaration): color: yellow, font-size: 2em
  - 선언부(declaration block): { color: yellow; font-size: 2em;}
  - 규칙(rule set): h1 { color:yellow; font-size:2em; }
- CSS 파일은 여러 개의 규칙으로 이루어져 있음
- 선택자와 선언부 사이, 선언과 선언 사이는 앞뒤로 개행을 해도 상관 없음
- 속성 이름과 속성값 사이에는 개행을 하면 안됨


CSS의 속성(Property)과 HTML의 속성(Attribute)
- HTML의 속성은 Attribute이고, CSS의 속성은 Property이다.

CSS주석
```
/* 주석 내용 */
```

CSS의 적용
- inline
  - `<div style="color:red">내용</div>`
  - 해당 요소에 직접 스타일 속성을 이용해서 규칙들을 선언하는 방법
  - 해당 요소에 직접 입력하기 때문에 선택자는 필요하지 않게 되고, 선언부에 내용만 스타일 속성의 값으로 넣어주면 된다.
  - 코드의 재활용이 되지 않기 대문에 자주 사용하지 않음

- internal
  - `<style> div { color:red; }<style>`
  - 문서에 `<style>`을 활용한 방법
  - `<style>`은 `<head>` 내부에 들어가며 `<style>`안에 스타일 규칙이 들어감
  - 페이지가 많고 스타일 규칙이 많아지면 해당 방식은 지양함
- external
  - ```
    // test.html
    <head>
      <link rel="stylesheet" href="test.css">
    <head>

    // test.css
    div { color:red; }
    ```
  - 외부 스타일 시트 파일을 이용하는 방법
  - rel속성은 연결되는 파일이 문서와 어떤 관계인지 명시하는 속성
  - 외부 스타일 시트 방식은 파일 관리가 편하면서도 용량이 작기 때문에 주로 사용되는 방법
- import
  - `@import url("test.css")`
  - 스타일 시트 내에서 다른 스타일 시트 파일을 불러오는 방법
  - `<style>` 내부 상단이나 외부 스타일 시트 파일 상단에 선언하는데 성능상 좋지 않아서 거의 쓰이지 않음


## 선택자
선택자는 복잡하고 다양한 요소들 사이에서 내가 원하는 요소만을 선택할 수 있도록 도와줌

요소 선택자
```css
h1 { color:red; }
p { color:black; }
```
- 선택자 중에 가장 기본이 되는 선택자이며, 태그 선택자라고 한다.
- 요소 선택자는 선택자 부분에 태그 이름이 들어감
- 문서 내에 선택자에 해당하는 모든 요소에 스타일 규칙이 적용

그룹화
```css
h1, h2, h3, h4, h5 { color:yellow; }
* { color:black}
h1 { color:red; font-size:2em; }
h1, h2, h3 { color:red; font-size:2em; }
```
- 선택자는 쉼표를 이용해서 그룹화를 할 수 있다.
- `*(별표, asterisk)` 기호로 문서 내에 모든 요소를 선택할 수 있다.
  - 전체 선택지는 매우 편리하지만, 성능에 좋지 않으므로 될 수 있으면 사용을 지양


class 선택자
```html
<head>
  <style>
    .foo { color:red; }
    .bar { font-size:30px; }
  </style>
  <body>
    <p class="foo">TEST</p>
    <p class="foo bar">CLASS TEST</p>
  </body>
</head>
```
- class 선택자를 활용하면 요소에 구애받지 않고 스타일 규칙을 적용할 수 있다.
- class 선택자를 사용하기 위해서는 HTML을 수정해 class 속성을 추가해야 한다.
- class 속성은 글로벌 속성이므로 어느 태그에서도 사용할 수 있다.
- class 속성에 값을 넣게 되면, class 선택자를 이용해서 해당 요소에 스타일 규칙을 적용할 수 있다.
- 클래스 선택자를 쓸 때는, 맨 앞에 `.(마침표)`를 찍어줘야한다.
- class 속성은 공백으로 구분하여 여러 개의 class 값을 넣을 수 있다.

id 선택자
```html
<head>
  <style>
    #foo { color:red; }
    #bar { font-size:30px; }
  </style>
  <body>
    <p id="foo">TEST</p>
    <p id="bar">CLASS TEST</p>
  </body>
</head>
```
- id 선택자는 class 선택자와 비슷하다
- 선택자를 쓸 때는 `#(해시)` 기호를 쓰면된다.
- id 속성 값은 문서 내 유일하게 사용되어야 한다.


class와 id의 차이점
- .기호가 아닌 #기호 사용
- 태그의 class 속성이 아닌 id 속성을 참조
- 문서 내에 유일한 요소에 사용
- 구체성 

선택자의 조합
```css
/* 
  요소와 class의 조합 
  - p 이면서 class 속성에 bar가 있어야 적용
*/
p.bar { ... }
/*
  다중 class
  - class 속성에 foo와 bar 모두가 있어야 적용
*/
.foo.bar { ... }
/*
  id와 class의 조합
  - id가 foo이며 class가 bar인 요소에 적용
*/
#foo.bar { ... }
```

속성 선택자
```html
<head>
  <style>
    p[class] { color:red; }
    p[class][id] { color:green; }
    p[class="foo"] { color:blue; }
    p[id="title"] { color:blue; }
  </style>
  <body>
    <p class="for">TEST</p>
    <p class="bar">TEST</p>
    <p class="baz" id="title">TEST</p>
  </body>
</head>
```

부분 속성값으로 선택
- 부분 속성값으로 선택은 속성 이름과 속성값 사이에 사용되는 기호에 따라 동작이 조금 다릅니다. 
  - `[class~="bar"]` : class 속성의 값이 공백으로 구분한 "bar" 단어가 포함되는 요소 선택
  - `[class^="bar"]` : class 속성의 값이 "bar"로 시작하는 요소 선택
  - `[class$="bar"]` : class 속성의 값이 "bar"로 끝나는 요소 선택
  - `[class*="bar"]` : class 속성의 값이 "bar" 문자가 포함되는 요소 선택

  
## 문서 구조 관련 선택자 부터 해야함