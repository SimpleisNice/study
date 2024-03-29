# CSS
Cascading Style Sheets

웹 페이지에서 HTML은 몸의 구조를 담당하고

CSS는 옷과 신발과 같이 외적으로 꾸며주는 역할을 한다.

<br>

## CSS 소개
CSS는 간단히 이야기하면 HTML을 꾸며주는 표현용 언어
- http://www.csszengarden.com/

<br>

## CSS 문법과 적용
CSS 구문
- `h1 { color:yellow; font-size:2em; }`
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
  - 코드의 재활용이 되지 않기 때문에 자주 사용하지 않음

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
  - rel 속성은 연결되는 파일이 문서와 어떤 관계인지 명시하는 속성
  - 외부 스타일 시트 방식은 파일 관리가 편하면서도 용량이 작기 때문에 주로 사용되는 방법
- import
  - `@import url("test.css")`
  - 스타일 시트 내에서 다른 스타일 시트 파일을 불러오는 방법
  - `<style>` 내부 상단이나 외부 스타일 시트 파일 상단에 선언하는데 성능상 좋지 않아서 거의 쓰이지 않음

<br>

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
- `.` 기호가 아닌 `#` 기호 사용
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

<br>  

## 문서 구조 관련 선택자
선택자 중에는 문서의 구조를 이용하여 요소를 선택하는 선택자도 있음

문맥이나 요소의 구조를 기반으로 하여 선택자를 조합하는 것을 "조합자" 또는 "결정자" 라고 부름

이 조합자를 이용하면 문서 구조를 이용해 좀 더 유연하게 요소를 선택하고 스타일을 적용할 수 있음

```html
<!DOCTYPE html>

<html lang="ko">
  <head>
    <meta charset="utf-8">
    <title>CSS</title>
    <style media="screen">
      /* 자손 선택자 */
      div span { color:red; }
      /* 자식 선택자 */
      div > span { color:green; }
      /* 인접 형제 선택자 */
      div + span { color:purple; }
      /* 인접 형제 선택자 */
      div ~ span { background:yellow; }
    </style>
  </head>
  <body>
    <span>문서 구조 관련 선택자</span>
    <div>
      <h1><span>HTML</span>: HYPER TEXT MARKUP LANGUAGE</h1>
      <span>CSS는 문서를 꾸며줍니다.</span>
    </div>
    <span>JAVASCRIPT는 문서를 동적으로 제어할 수 있다.</span>
    <p>HTML과 CSS와 JAVASCRIPT를 이용해서 아름다운 웹 사이트를 제작할 수 있다.</p>

    <span>TEST1</span>
    <span>TEST2</span>
  </body>
</html>
```
- 부모와 자식 관계
- 조상과 자손 관계
- 형제 관계
  - 형제 관계에는 요소 중 바로 뒤에 이어 나오는 요소를 인접해 있다고 한다.

### 문서 구조 관련 선택자
자손 선택자
- `div span { color:red; }`
- 자손 선택자는 선택자 사이에 아무 기호 없이 그냥 공백으로 구분

자식 선택자
- `div > span { color:red; }`
- 자식 선택자는 선택자 사이에 닫는 `꺽쇠 기호(>)`를 넣는다.
- 꺽쇠 기호와 선택자 기호 사이에는 공백은 있거나 없어도 상관 없다.

인접 형제 선택자
- `div + p { color:red; }`
  - 인접 형제 선택자는 선택자 사이에 + 기호를 넣는다.
  - 자식 선택자와 마찬가지로 공백은 있거나 없어도 상관 없음
  - 인접 형제 선택자는 형제 관계이면서 바로 뒤에 인접해 있는 요소를 선택하는 선택자
- `div ~ p { color:red; }`
  - 인접 형제 선택자는 선택자 사이에 ~ 기호를 넣는다.
  - 자식 선택자와 마찬가지로 공백은 있거나 없어도 상관 없음
  - 인접 형제 선택자는 형제 관계이면서 뒤에 인접해 있는 요소들을 선택하는 선택자


<br>

## 가상 선택자
```html
<!DOCTYPE html>

<html lang="ko">
  <head>
    <meta charset="utf-8">
    <title>CSS</title>
    <style media="screen">
      li:first-child { color:red; }
      li:last-child { color:blue; }

      a:link { color:blue; }
      a:visited { color:green; }

      a:focus { background-color: gray; }
      a:hover { font-weight: bold; }
      a:active { color: maroon; }
      
      p::before {
        content: "###";
      }
    </style>
  </head>
  <body>
    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>JS</li>
    </ul>

    <a href="https://naver.com">네이버</a>
    <a href="https://google.com">구글</a>
    <a href="https://daum.net">다음</a>

    <p>TEST</p>
  </body>
</html>
```

가상 클래스(pseudo class)
- https://www.boostcourse.org/web344/lecture/33513/?isDesc=false
- 가상 클래스는 미리 정의해놓은 상황에 적용되도록 약속된 보이지 않는 클래스
- 우리가 직접 요소에 클래스를 선언하는 것이 아닌, 약속된 상황이 되면 브라우저 스스로 클래스를 적용해줌
- 가상 클래스는 `:(콜론)` 기호를 써서 나타냄

가상 요소(pseudo element)
- 가상 요소는 HTML 코드에 존재하지 않는 구조 요소에 스타일을 부여할 수 있음
- 가상 요소도 가상 클래스처럼 문서 내에 보이지 않지만, 미리 정의한 위치에 삽입되도록 약속
- 가상 요소는 `::(클론)` 기호를 써서 나타냄
  - CSS3부터 가상 클래스와 가상요소를 구분하기 위해 개수가 달라짐.
  - 하위 브라우저 `::` 문법을 지원하지 않는 문제가 있으므로, 상황에 따라 기호 사용

<br>

## 구체성(명시도)
선택자에는 어떤 규칙이 우선 적용되어야 하는지에 대해 정해진 규칙이 있다.

이 규칙을 `구체성`이라고 한다.

구체성은 선택자를 얼마나 명시적으로(구체적으로) 선언했느냐를 수치화한 것

구체성의 값이 클수록 우선으로 적용됨

```
0, 0, 0, 0

h1 { ... }                // 0,0,0,1
body h1 { ... }           // 0,0,0,2
.grape { ... }            // 0,0,1,0
*.bright { ... }          // 0,0,1,0
p.bright em.dark { ... }  // 0,0,2,2
#page { ... }             // 0,1,0,0
div#page { ... }          // 0,1,0,1
```
- 값을 비교할 때는 좌측에 있는 값부터 비교하며, 좌측 부분의 숫자가 클수록 높은 구체성을 갖는다.
- 구체성은 아래의 규칙대로 계산됨
  - 0, 1, 0, 0 : 선택자에 있는 모든 id 속성값
  - 0, 0, 1, 0 : 선택자에 있는 모든 class 속성값, 기타 속성, 가상 클래스
  - 0, 0, 0, 1 : 선택자에 있는 모든 요소, 가상 요소
  - 전체 선택자는 0, 0, 0, 0을 가진다.
  - 조합자는 구체성에 영향을 주지 않는다. (>, + 등)

인라인 스타일?
- 구체성의 값은 `1,0,0,0`을 가짐

important
- `p#page { color:red !important; }`
- important 키워드는 별도의 구체성 값은 없지만, 모든 구체성을 무시하고 우선권을 갖는다.
- important 키워드는 속성값 뒤 한 칸 공백을 주고 느낌표 기호와 함께 쓴다.
- 모든 우선 순위를 무시하고 적용한다.

<br>

## 상속
https://developer.mozilla.org/en-US/docs/Web/CSS/inheritance

CSS에서 상속은 우리가 기본적으로 알고 있는 부모가 가진 특성을 자식이 물려받는 개념과 같다.

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8">
    <title>CSS</title>
    <style media="screen">
      * { color: red; }
      h1#page { color: gray; }
    </style>
  </head>
  <body>
    <h1 id="page">HELLO, <em>CSS</em></h1>
  </body>
</html>
```

상속되는 속성
- 박스 모델 속성들은 상속되지 않는다.

상속되는 속성의 구체성
- 상속된 속성은 아무런 구체성을 가지지 못함

<br>

## 캐스케이딩(cascading)
https://developer.mozilla.org/en-US/docs/Web/CSS/Cascade

스타일 규칙들이 어떠한 기준으로 요소에 적용되는지를 정한 규칙

### cascading 규칙
- 중요도(!important)와 출처
  - 출처는 CSS 의 출처를 의미한다.
  - CSS 출처는 제작자와 사용자, 그리고 사용자 에이전트 경우로 구분
    - 제작자의 경우 사이트를 실제 제작하는 개발자가 작성한 CSS를 의미
    - 사용자의 경우 웹페이지를 방문하는 일반 사용자들이 작성한 CSS 의미
    - 사용자 에이전트의 경우는 일반 사용자의 환경, 즉 브라우저에 내장된 CSS를 의미
- 구체성
- 선언 순서


### 모든 스타일은 아래의 규칙에 따라 단계적으로 적용
1. 스타일 규칙들을 모아서 중요도가 명시적으로 선언되었는지에 따라 분류
    - 중요도가 명시적으로 선언된 규칙들은 그렇지 않은 규칙들보다 우선한다.
    - 중요도가 있는 규칙들끼리는 아래 다른 규칙들을 적용 받는다.
2. 스타일 규칙들을 출처에 따라 분류
    - 제작자 스타일 규칙이 사용자 에이전트 규칙보다 우선
3. 스타일 규칙들을 구체성에 따라 분류
    - 구체성이 높은 규칙들이 우선한다.
4. 스타일 규칙들을 선언 순서에 따라 분류
    - 뒤에 선언된 규칙일수록 우선

<br>

## 선택자 정리
https://www.w3schools.com/cssref/css_selectors.asp

<br>

## 속성
https://www.w3schools.com/css/default.asp

https://developer.mozilla.org/ko/

### 속성-단위
https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units

단위의 크기는 `절대 길이` 단위와 `상대 길이` 단위로 구분되어 진다.

- 절대 길이
  - `px (1px = 1/96th of 1 inch)`
    - 절대 길이는 고정된 크기 단위로, 다른 요소의 크기에 영향을 받지 않는다.
    - 절대 길이이므로 다른 요소의 영향을 받지 않아 화면에 고정된 크기를 가지지만, 장치의 해상도에 따라 상대적이다.
    - 여러 환경에서 디자인을 같게 표현하고 브라우저 호환성에 유리한 구조로 되어 있다.
  - `pt (1pt = 1/72 of 1 inch)`
    - 컴퓨터가 없던 시절부터 있던 단위
    - 인쇄물이나 워드프로세서 프로그램에서 사용된 가장 작은 표준 인쇄단위
    - 웹 화면에 인쇄용 문서를 위한 스타일을 적용할 때 유용하게 사용
    - 사용하는 기기의 해상도에 따라 차이가 있으므로, W3C에서도 `pt`는 웹 개발시 권장하는 단위가 아님
      - window 9pt = 12px
      - mac 9pt = 9px
- 상대 길이
  - 상대 길이는 다른 요소의 크기나 폰트 크기, 브라우저(viewport) 등의 크기에 따라 상대적으로 값이 변함
  - %: 부모의 값에 대해서 백분율로 환산한 크기를 갖게 됩니다.
  - em: font-size를 기준으로 값을 환산합니다. 소수점 3자리까지 표현 가능합니다.
  - rem: root의 font-size를 기준으로 값을 환산합니다.
  - vw: viewport의 width값을 기준으로 1%의 값으로 계산됩니다.

### 속성-색상
```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8">
    <title>CSS</title>
    <style>
      div { height: 20px; width: 100%; }
    </style>
  </head>
  <body>
    <h1>COLORS CAN BE SET USING HEXADECIMAL VALUES</h1>
    <div style="background-color:#ff0000"></div>
    <div style="background-color:#00ff00"></div>
    <div style="background-color:#0000ff"></div>
    <div></div>
    <div style="background-color:rgb(255, 0, 0)"></div>
    <div style="background-color:rgb(0, 255, 0)"></div>
    <div style="background-color:rgb(0, 0, 255)"></div>
    <div></div>
    <div style="background-color:rgba(255, 0, 0, 1)"></div>
    <div style="background-color:rgba(0, 255, 0, 1)"></div>
    <div style="background-color:rgba(0, 0, 255, 1)"></div>
    <h1 style="color:#ff0000">HEADING</h1>
    <h1 style="color:#00ff00">HEADING</h1>
    <h1 style="color:#0000ff">HEADING</h1>
  </body>
</html>
```

색상 값 지정 방식
- 컬러 키워드
  - CSS 자체에서 사용 가능한 문자 식별자
  - `red`, `blue`, `black` 등과 같이 미리 정의되어 있는 키워드를 이용해 색상 표현
- 16 진법
  - 각 자리의 알파벳은 대소문자를 구분하지 않음
  - `#RRGGBB`
    - RR: 적색
    - GG: 녹색
    - BB: 청색
  - `#RGB`
    - 위의 방식에서 각각의 두자리가 같은 값을 가지면 3자리로 축약하여 사용할 수 있음
- RGB()
  - `rgb(R, G, B)`
    - rgb(R, G, B)의 형태로 각 변수 값(R 적색, G 녹색, B 청색)의 강도를 정의
    - 0 ~ 255의 정수로 된 값으로 지정
    - 0 -> 255는 검정에서 흰색으로 값의 변화를 나타냄
- RGBA()
  - `rgba(R, G, B, A)`
    - rgb(R, G, B, A)의 형태로 각 변수는(R 적색, G 녹색, B 청색, A 투명도)의 강도를 정의
    - 0 ~ 255의 정수로 된 값으로 지정
    - 0 -> 255는 검정에서 흰색으로 값의 변화를 나타냄
    - A의 값은 0 ~ 1 사이의 값을 지정할 수 있으며, 0.5와 같이 소수점으로 표기
    - 0 -> 1 은 투명에서 불투명으로 값의 변화를 나타냄

<br>

### 속성-background
요소 배경에 관련된 속성을 지정할 때 사용

https://www.w3schools.com/css/css_background.asp

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8">
    <title>CSS</title>
    <style>
      div {
        height: 1000px;
        background-color: pink;
        background-image: url(https://www.w3schools.com/CSSref/img_tree.gif);
        background-repeat: no-repeat;
        background-position: center center;
        /* 브라우저 성능에 영향을 미침*/
        background-attachment: fixed; 

        background: pink url(https://www.w3schools.com/CSSref/img_tree.gif) no-repeat center center fixed;
      }
      span {
        background-color: pink;
      }
    </style>
  </head>
  <body>
    <div>
      배경에 대해서 알아볼까요?배경에 대해서 알아볼까요? 
    </div>
    <span>
      배경에 대해서 알아볼까요?배경에 대해서 알아볼까요?
    </span>
  </body>
</html>
```


background-color
- `background-color: pink;`
- 기본 값: transparent
- 배경의 색상을 지정하는 속성

background-image
- `background-image: url(https://www.w3schools.com/CSSref/img_tree.gif);`
- 기본값: none
- 배경으로 사용할 이미지의 경로를 지정하는 속성
- url의 경로는 절대 경로, 상대 경로 모두 사용 가능
- background-color에 색상이 적용된 상태에서 background-image로 사용된 이미지에 투명한 부분이 있다면, 그 부분에 background-color 색상이 노출됨

background-repeat
- `background-repeat: repeat;`
- 기본값: repeat
- 이미지의 반복 여부와 방향을 지정하는 속성

background-position
- `background-position: 0% 0%;`
- 기본값: 0% 0%
- 요소에서 배경 이미지의 위치를 지정하는 속성
- x축 y축으로부터 위치를 지정할 수 있음
- 선언 순서는 x축, y축으로부터의 간격
- 만일 한쪽만 지정된다면 나머지는 중앙 값(center)으로 지정

background-attachment
- `background-attachment: scroll;`
- 기본값: scroll
- 화면 스크롤에 따른 배경 이미지의 움직임 여부를 지정하는 속성
- 브라우저 성능에 영향을 미치므로, 사용에 주의


축약
- `background: [-color] [-image] [-repeat] [-attachment] [-position];`

<br>

### 속성-boxmodel

https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model

![box model](../images/box_model.png)

문서를 배치할 때 브라우저의 렌더링 엔진은 표준 CSS 기본 박스 모델에 따라 각 요소를 사각형 상자로 나타냄

CSS를 이용해 이 상자의 크기, 위치 및 속성(색상, 배경, 테두리 크기 등)을 변경할 수 있다.

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8">
    <title>CSS</title>
    <style>
      div {
        margin: 50px;
        padding: 30px;
        border: 10px solid #000;
      }
    </style>
  </head>
  <body>
    <div>
      box model
    </div>
  </body>
</html>
```

boxmodel 구성
- Content 영역
  - 요소의 실제 내용을 포함하는 영역
  - 따라서 크기는 내용의 너비 및 높이를 나타냅니다.
- Border 영역
  - content 영역을 감싸는 테두리 선을 border
- Padding 영역
  - content 영역과 테두리 사이의 여백을 padding
  - content 영역이 배경, 색 또는 이미지가 있을 때 패딩 영역까지 영향을 미칩
  - 이에 따라 padding을 content의 연장으로 볼 수도 있음
- Margin 영역
  - border 바깥쪽의 영역을 margin이라고 함
  - border 영역을 다른 요소와 구별하기 위해 쓰이는 빈 영역
  - 즉, 주변 요소와의 여백(간격)을 margin을 이용해 지정할 수 있음

<br>

### 속성-border
border 속성은 요소의 테두리에 관련된 속성을 지정할 때 사용

테두리의 굵기, 모양, 색상을 지정할 수 있는 속성들이 있음

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8">
    <title>CSS</title>
    <style>
      div {
        margin: 50px;
        padding: 30px;

        border-width: 10px 20px 10px 20px;
        border-style: solid;
        border-color: red green red green;
        
        border: 10px solid green;
      }
    </style>
  </head>
  <body>
    <div>
      box model
    </div>
  </body>
</html>
```

속성
- border-width
  - `border-width: [top] [right] [bottom] [left];`
  - 기본 값: medium
  - 선의 굵기를 지정하는 속성
  - border-top-width, border-bottom-width, border-right-width, border-left-width를 이용하여 상하좌우 선의 굵기를 다르게 표현할 수 있음
- border-style
  - `border-style: [top] [right] [bottom] [left];`
  - 기본 값: none
  - 선의 모양을 지정하는 속성
  - border-top-style, border-bottom-style, border-right-style, border-left-style을 이용하여 상하좌우 선의 모양을 다르게 표현할 수 있음
- border-color
  - `border-color: [top] [right] [bottom] [left];`
  - 기본 값: currentColor
  - 선의 색상을 지정하는 속성
  - . border-top-color, border-bottom-color, border-right-color, border-left-color를 이용하여 상하좌우 선의 색상을 다르게 표현할 수 있음

border 축약
- `border: [-width] [-style] [-color];`
- 정의되지 않은 속성값에 대해서는 기본값이 적용

<br>

### 속성-padding

padding 영역은 border와 content 사이의 여백

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8">
    <title>CSS</title>
    <style>
      div {
        padding-top: 0px;
        padding-right: 10px;
        padding-bottom: 20px;
        padding-left: 30px;

        /* 시계 방향 순서 */
        padding: 0px 10px 20px 30px;
        /* 좌우가 같은 경우 */
        padding: 0px 10px 20px;
        /* 상하가 같고 좌우가 같은 경우 */
        padding: 10px 30px;
        /* 상하좌우가 같은 경우 */
        padding: 10px;

        border: 10px solid green;
      }
    </style>
  </head>
  <body>
    <div>
      box model
    </div>
  </body>
</html>
```
padding
- 기본 값: 0
- 속성
  - padding-top
    - content 영역의 위쪽 여백을 지정합니다.
  - padding-right
    - content 영역의 오른쪽 여백을 지정합니다.
  - padding-bottom
    - content 영역의 아래쪽 여백을 지정합니다.
  - padding-left
    - content 영역의 왼쪽 여백을 지정합니다.

padding 축약
- `padding: [-top] [-right] [-bottom] [-left];`

CSS에서 0 값에 대해서는 단위를 따로 적지 않음

<br>

### 속성-margin

margin은 border 영역을 다른 요소와 구별하기 위해 쓰이는 빈 영역이라고 배웠다.

즉, 이 말은 다른 요소와의 간격을 만들 수 있다는 것이다.

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8">
    <title>CSS</title>
    <style>
      div {
        width: 300px;
        margin-right: auto;
        margin-left: auto;
        margin: 50px auto;

        border: 10px solid green;
      }
    </style>
  </head>
  <body>
    <div>box model</div>
    <div style="margin-top: 100px">box model</div>
  </body>
</html>
```

margin 속성
- 기본 값: 0
- 속성 값: length, percent, auto
- 속성
  - margin-top border 영역의 위쪽 여백을 지정
  - margin-right border 영역의 오른쪽 여백을 지정
  - margin-bottom border 영역의 아래쪽 여백을 지정
  - margin-left border 영역의 왼쪽 여백을 지정

margin 축약
- `margin: [-top] [-right] [-bottom] [-left];`

margin collapse(마진 병합)
- 마진 병합은 인접한 두 개 이상의 수직 방향 박스의 마진이 하나로 합쳐지는 것을 의미
- 마진 병합이 다음 세가지의 경우에 일어납니다.
  1. 두 요소가 상하로 인접한 경우: 위 요소의 하단 마진과 아래 요소의 상단 마진의 병합이 일어납니다.
  2. 부모 요소와 첫 번째 자식 요소 또는 마지막 자식 요소
      - 부모 요소의 상단 마진과 첫 번째 자식 요소의 상단 마진 병합이 일어납니다.
      - 부모 요소의 하단 마진과 마지막 자식 요소의 하단 마진 병합이 일어납니다.
  3. 내용이 없는 빈 요소의 경우: 해당 요소의 상단 마진과 하단 마진의 병합이 일어납니다.
- 마진 병합은 수직 방향으로만 이루어지며, 좌우에 대해서는 일어나지 않습니다. 
- 마진 병합은 마진이 반드시 맞닿아야 발생하기 때문에 2,3번째의 경우 패딩 및 보더가 없어야 합니다.

추가적으로
- 다음과 같은 방식으로 중앙 정렬을 함
  - `margin: 0 auto;`

### 속성-margin & padding
padding과 margin 두 속성 모두 여백이 필요로 할 때 적용하는 속성이기 때문에, border의 경계가 명확하게 표시되지 않으면 어떤 속성으로 필요한 여백을 표현할지 헷갈릴 수도 있다.

|  | + | - | auto | 단위 |
|---|---|---|---|----|
|margin| O | O | O | px, %|
|pading| O | X | X | px, %|

<br>

![margin-padding](../images/margin_padding_example.png);

사람을 기준으로 박스 모델을 설명 하자면?
- content: 사람의 뼈
- border: 사람의 피부
- padding: 사람의 뼈와 피부 사이의 지방
- margin: 사람과 사람 사이 간격

% 값의 사용과 기준점
- css 속성을 사용하면서 어떤 값을 적용할 때 이 단위를 적용 할 수 있을까? 라는 생각을 가지고 코딩하는 자세는 매우 중요합니다. margin과 padding은 px과 같은 고정적인 단위 외에도 %라는 상대적인 단위를 사용 할 수 있습니다. %는 요소의 크기를 기준으로 상대적인 값을 결정짓게 됩니다. 얼핏 생각하면, 상하는 height 값에 대해 좌우는 width 값에 대해 크기가 계산될 거 같지만 그렇지 않습니다. %는 상하좌우의 방향에 관계없이 모두 요소의 width 값을 기준으로 값이 결정 됩니다.


### 속성-width
width 속성은 요소의 가로 크기를 정의하는 데 사용하는 속성

정확히는 content 영역의 너비를 지정하는 것을 의미

크기를 지정한다는 것은 같지만, 요소의 종류나 특징에 따라서 다르게 동작하기도 함


width
- 요소의 가로 크기를 지정하는 width 속성은 인라인 레벨 요소를 제외한 모든 요소에 적용
- width는 content 영역의 너비를 제어할 때 사용하는 데 이때 auto가 아닌 특정한 값을 지정하여 사용하면 그 크기는 box model 영역에서 margin 영역을 제외한 모든 영역에 대해 영향을 받습니다. (content, padding, border) 
- 기본 값: 0
- 속성 값: auto, length, percent

```
.box {
  width: 100px;
  padding: 20px;
  border: 10px solid black;
}

<div class="box">box</div>
```
- div 요소의 총 가로 크기는 160px
  - width: 100
  - padding: 20 * 2 = 40
  - border: 10 * 2 = 20


```
.parent {
  width: 300px;
  border: 20px solid red;
}
.child {
  width: 50%;
  padding: 20px;
  border: 10px solid black;
}

<div class="parent">
  <div class="child">
    child
  </div>
</div>
```
- child div 요소의 총 가로 크기는 210px
  - width: 300 % 50% = 150
  - padding: 20 * 2 = 40
  - border: 10 * 2 = 20

추가적으로
- width는 기본적으로 content 영역의 너비를 지정합니다.
- box-sizing이라는 속성을 이용하여 padding, border 영역을 기준으로 크기를 가질 수 있도록 변경할 수 있습니다.
- 부모가 인라인 레벨 요소일 때, 자식(블록 요소)이 width 값에 %를 가지면, 가장 가까운 블록 레벨인 조상의 width를 기준으로 계산됩니다. 
- 만일 최상단까지 블록 레벨 요소가 없으면 body를 기준으로 계산됩니다. 
- https://codepen.io/sunah/pen/LBaWqb

### 속성-height
height는 요소의 세로 크기를 정의하는 데 사용하는 속성

width와 마찬가지로 정확히는 content 영역의 높이를 지정하는 것

기본적인 동작은 width의 동작 방식과 같게 동작하지만, % 값을 가졌을 때의 동작 방식이 조금 다름

https://developer.mozilla.org/en-US/docs/Web/CSS/height

height
- 기본 값: 0
- 속성 값: auto, length, percent
- height는 content 영역의 높이를 제어할 때 사용하는데 이때 auto가 아닌 특정한 값을 지정하여 사용하면, width 속성과 마찬가지로 box model 영역에서 margin 영역을 제외한 모든 영역에 대해 영향을 받는다.

```
.box {
  width: 100px;
  height: 100px;
  padding: 10px;
  border: 15px solid black;
}

<div class="box">box</div>
```
- div 요소의 총 세로 크기는 150px
  - height: 100
  - padding: 10 * 2 = 20
  - border: 15 * 2 = 30


```
.parent {
  width: 200px;
  border: 10px solid black;
}
.child {
  height: 50%;
  background: red;
}

<div class="parent">
  <div class="child">
    child
  </div>
</div>
```
- child div 요소의 총 세로 크기는 200px
  - https://developer.mozilla.org/en-US/docs/Web/CSS/height#values
  - "Containing Block의 높이에 대한 백분율로 높이를 정의
  -  Containing Block은 부모를 의미한다고 생각
  - 즉, 현재 위의 코드에서는 부모가 명시적인 높이 값을 가지고 있지 않기 때문에 자식의 높이를 %값으로 지정해줘도 적용되지 않았던 것

추가적으로
- height 또한 box-sizing 속성을 이용하여 기준값을 padding 영역, border 영역으로 바꿀 수 있다.

<br><br>


# LAYOUT

## 속성 - display
```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <style>
      .inline {
        /* width: 100px;  inline은 미적용됨*/
        /* height: 100px; inline은 미적용됨*/
        margin: 10px; /* 실무에서는 좌우에만 값을 줌*/
        padding: 10px; /* 실무에서는 좌우에만 값을 줌*/
        border: 10px solid red;
        background: pink;
      }
      .block {
        width: 100px;
        height: 100px;
        margin: 10px;
        padding: 10px;
        border: 10px solid red;
        background: pink;
      }
      .inlineblock {
        width: 100px;
        height: 100px;
        margin: 10px;
        padding: 10px;
        border: 10px solid red;
        background: pink;
      }
    </style>
  </head>
  <body>
    <div>
      <div style="display: inline" class="inline">box1</div>
    </div>
    <div>
      <div style="display: block" class="block">box1</div>
    </div>
    <div>
      <div style="display: inline-block" class="inlineblock">box1</div>
    </div>
  </body>
</html>
```

display 속성
- 요소의 렌더링 박스 유형을 결정하는 속성
- 기본 값은 요소마다 다르다.
- 속성값
  - none
    - 요소가 렌더링 되지 않음
  - inline
    - inline level 요소처럼 렌더링
  - block
    - block level 요소처럼 렌더링
  - inline-block
    - inline level 요소처럼 렌더링(배치)되지만 block level의 성질을 가짐
    - height 나 width 등과 같은 박스모델 속성을 적용할 수 있다
    - inline와 inline-block의 경우 태그 사이의 공백이나 개행이 있을 경우 약 4px의 여백을 가지게 됩
  - ...

|display|width|height|margin|padding|border|
|---|---|---|---|---|---|
|block|O|O|O|O|O|
|inline|X|X|좌/우|O|O|
|inline-block|O|O|O|O|O|

추가 사항
- inline 요소의 padding/border 속성이 좌/우 만 적용 된다고 표시한 이유
  - 실제로 inline 요소의 padding/border는 좌/우뿐만 아니라 상/하에도 적용
  - 하지만 상/하 padding/border는 line-box에는 영향을 주지 못하기 때문에 위와 같이 부모 요소의 박스에 반영되지 않습니다
  - 또한 인접한 다른 line-box 에도 반영되지않습니다. 즉 콘텐츠가 겹칠 수 있기 때문에 실무에서는 잘 사용하지 않습니다.

<br>

## 속석 - visiblity
visiblity 속성
- 요소의 화면 표시 여부를 지정하는 속성
- 기본 값: visible
- `visiblity: visible|hidden|collapse|initial|inherit`

<br>

## 속성 - float
```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <style>
      .container {
        border: 1px dashed #aaa;
        padding: 15px;
        clear: both;
      }
      .container div, .container span {
        width: 100px;
        height: 100px;
        border: 1px solid #aaa;
        color: #fff;
      }
      .container :nth-child(1) {
        background-color: green;
      }
      .container :nth-child(2) {
        background-color: skyblue;
      }
    </style>
  </head>
  <body>
    <h2>요소를 보통의 흐름에서 벗어나 띄워지게 함</h2>

    <div class="container" style="width:400px;">
      <div style="float:left;">Box1</div>
      <div style="float:left;">Box2</div>
    </div>
  
    <h2 style="margin-top:100px;">주변 텍스트나 인라인요소가 주위를 감싸는 특징이 있음.</h2>
    <div class="container" style="width:400px;">
      <div style="float:left;">Box1</div>
      <div style="float:right;">Box2</div>
      <p>CSS 속성(property) float 은 한 요소(element)가 보통 흐름(normal flow)으로부터 빠져 텍스트 및 인라인(inline) 요소가 그 주위를 감싸는 자기 컨테이너의 좌우측을 따라 배치되어야 함을 지정합니다. 부동(floating) 요소 는 float 의 계산값(computed value)이 none이 아닌 요소입니다.</p>
    </div>
  
    <h2>대부분의 요소에 display 값을 block으로 변경함.</h2>
    <div class="container" style="width:400px;">
      <span style="float:left;">inline1</span>
      <span>inline2</span>
    </div>
  </body>
</html>
```

float 속성
- 요소를 float(요소를 보통의 흐름에서 벗어나게 함) 시킬지 지정하는 속성
- 기본 값: none
- `float: none | left | right | initial | inherit;`
- 대부분 요소를 display 값을 block으로 변경함
  - display 값 변경 예외: inline-table, flex 등