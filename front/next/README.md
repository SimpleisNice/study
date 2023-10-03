# DEFALUT

https://github.com/hanbit/practical-next.js

<br>

# CHAPTER_1 Next.js 알아보기

> Next.js 의 기본 철학은 리액트와 거의 동일하다. `설정보다 관습(convention-over-configuration)`

Next.js는 리액트를 위해 만든 오픈소스 자바스크립트 웹 프레임워크로, 리액트에는 없는 SSR, SSG, ISR 과 같은 다양하고 풍부한 기능을 제공

- 정적 사이트 생성
- 증분 정적 콘텐츠 생성
- 타입스크립트에 대한 기본 지원
- 자동 폴리필 적용
- 이미지 최적화
- 웹 애플리케이션의 국체화 지원
- 성능 분석

## Next.js 시작하기

`npx create-next-app <app-name>`

<br>

# CHAPTER_2 렌더링 전략

웹 페이지 또는 웹 애플리케이션을 웹 브라우저에 제공하는 방법을 의미

## SSR

장점?

- 더 안전한 웹 애플리케이션
- 더 뛰어난 웹 사이트 호환성
- 더 뛰어난 SEO

주의 사항

- CSR 보다 더 많은 자원 소모
- 페이지에 대한 요청을 처리하는 시간이 길어짐

Next.js가 기본적으로 빌드 시점에 정적으로 페이지를 만든다는 점

- 페이지에서 외부 API를 호출하거나 데이터베이스에 접근하는 등 동작 작업을 해야 한다면 해당 함수를 페이지에서 익스포트해야함

### CSR

장점

- 쉬운 페이지 전환
- 지연된 로딩과 성능
- 서버 부하 감소

### process.browser 변수

서버에서 랜더링할 때 브라우저 전용 API 로 인한 문제를 다른 방법으로 해결할 수 있다.

- `process.browser` 값에 따라서 스크립트와 컴포넌트를 조건별로 실행
- 해당 값은 `boolean` 값으로, 클라이언트에서 실행시 true, 서버에서 실행시 false 값을 가진다.
- 해당 내용은 곧 중단될 예정이며, 대신 좀 더 강화한 의미를 갖는 `typeof window`를 사용할 수 있다.

### 동적 컴포넌트 로딩

dynamic

- 동적 임포트로 불러옴

```
import dynamic from 'next/dynamic';

const HighLight = dynamic(
  () => import (`../components/HightLight`),
  { ssr: fasle }
)
```

### SSG

정적 사이트 생성

일부 또는 전체 페이지를 빌드 시점에 미리 랜더링

장점?

- 쉬운 확장
- 뛰어난 성능
- 더 안전한 API 요청

### ISR

증분 정적 재생성

ISR을 사용하면 Next.js가 어느 정도의 주기로 정적 페이지를 다시 랜더링하고 해당 내용을 업데이트할지 정할 수 있음

### revalidate

Next.js는 전체 웹 사이트를 다시 빌드하는 일을 피하기 위해 `revalidate`라는 옵션을 추가

- 해당 옵션은 `getStaticProps` 함수가 변환하는 객체 내에 지정할 수 있음
- 이 값은 페이지에 대한 요청이 발생할 때 어느 정도의 주기로 새로 빌드애햐 하는지를 나타냄

과정

1. Next.js는 빌드 과정에서 페이지의 내용을 getStaticProps 함수가 반환한 객체의 값으로 채움. 그리고 이 페이지는 빌드를 거쳐 정적 페이지로 만들어짐
2. 처음 10분간 해당 페이지를 요청하는 모든 사용자는 동일한 정적 페이지를 제공받는다.
3. 10분이 지나고 해당 페이지에 대한 새로운 요청이 들어오면 Next.js는 이 페이지를 서버에서 다시 랜더링하고 getStaticProps 함수를 다시 호출한다. 그리고 랜더링 페이지를 저장해서 새로운 정적 페이지로 만들고 이전에 만든 정적 페이지를 새로 만든 페이지로 덮어쓴다.
4. 이후 10분간 동일한 페이지에 대한 모든 요청에 대해 새로 만든 정적 페이지를 제공

# CHAPTER03_Next.js 기초와 내장 컴포넌트

훌륭한 내장 컴포넌트와 함수를 제공하여 성능이 뛰어난 동적 웹 사이트를 쉽게 만들 수 있다.

구체적인 내용?

- 클라이언트와 서버에서의 라우팅 시스템 작동 방식
- 페이지 간 이동 최적화
- Next.js 가 정적 자원을 제공하는 방법
- 자동 이미지 최적화와 새로운 Image 컴포넌트를 사용한 이미지 제공 최적화 기법
- 컴포넌트에서 HTML 메타데이터를 처리하는 방법
- `_app.js` 와 `_document.js` 파일 내용 및 커스터마이징 방법

### 라우팅 시스템

Next.js 는?

- 파일시스템 기반 페이지와 라우팅을 사용한다.
- 기본적으로 `pages/ ` 디렉터리를 가지고 있음
  - 이 디렉터리 안의 모든 파일은 곧 애플리케이션의 페이지와 라우티 규칙을 의미
  - 따라서 페이지라는 것은 `pages/ ` 디렉터리 안의 .js, .jsx, .ts, .tsx 파일에서 익스포트한 리액트 컴포넌트라고 볼 수 있다.

동적 라우팅 규칙

- `[]` 는 경로 매개변수로, 사용자가 브라우저 주소창에 입력하는 값은 모두 가질 수 있다.
  - ex) `[slug].tsx`
- 동적 라우팅 규칙을 중첩할 수도 있다.

### 페이지에서 경로 매개변수 사용하기

경로 매개변수를 사용해서 동적 페이지 콘텐츠를 쉽게 만들 수 있다.

```js
export async function getServerSideProps({ params }) {
  const { name } = params;
  return {
    props: {
      name,
    },
  };
}

function Greet(props) {
  return <h1> Hello, {props.name}! </h1>;
}

export default Greet;
```

- getServerSideProps나 getStaticProps 함수는 반드시 객체를 반환해야 한다.
- 이러한 함수가 반환한 값을 페이지에서 사용할 때는 함수가 반환한 객체의 props 속성값을 사용해야 한다.

### 컴포넌트에서 경로 매개변수 사용하기

Next.js 에서는 useRouter 훅 덕분에 별다른 어려움 없이 컴포넌트 안에서 경로 매개변수를 사용할 수 있다.

```js
import { useRouter } from "next/router";

function Greet() {
  const { query } = useRouter();
  return <h1> Hello {query.name}! </h1>;
}
```

### 클라이언트에서의 내비게이션

HTML의 표준 `<a>` 태그를 사용해서 페이지들을 연결할 수 도 있지만 `Link` 컴포넌트를 통해 서로 다른 라우트 간의 이동을 최적화 할 수 도 있다.

```js
import Link from "next/link";

function NavBar() {
  return (
    <div>
      <Link href="/greet/type_a">Type A</Link>
      <Link href="/greet/type_b">Type B</Link>
      <Link href="/greet/type_c" preload={fasle}>
        Type C
      </Link>
      <Link href="/greet/[name]" as="greet/type_d">
        Type D Dynamic
      </Link>
    </div>
  );
}
```

Next.js는 기본적으로 현재 화면에 표시되는 페이지의 모든 Link에 대해 연결된 부분 또는 페이지를 미리 읽어온다.

- 페이지의 링크를 클릭했을 때 브라우저는 해당 페이지를 화면에 표시하기 위해 필요한 모든 데이터를 이미 불러온 상태
- 미릴 불러오는 기능은 Link 컴포넌트에서 `preload={false}` 라는 속성을 전달해서 비활성화할 수 있다.

동적 경로 매개변수를 통해 페이지를 더 쉽게 연결할 수 있다.

- `<Link href="/greet/[name]" as='/greet/type_d'>Type D Dynamic</Link>`

복잡한 URL을 사용한다면 href 속성에 객체를 전달할 수 도 있다.

- `<Link href={{ pathname: '/greet/[name]', query: { name: 'type_f', data: 'test' } }}>Type F</Link>`

### router.push 메서드

Link 컴포넌트 대신 useRouter 훅을 사용해서 다른 페이지로 이동할 수 있다.

- 예를들어 로그인한 사용자만 접근할 수 있는 페이지가 있다면, useRouter 훅을 사용해서 특정 페이지로 이동시킬 수 있다.

```
function MyPage() {
  const router = useRouter();
  const login = useLogin();

  useEffect(() => {
    if (login) {
      router.push('/posts/2020/2020')
    }
  }, [login]);

  return (<>PASS</>)
}
```

### 정적 자원 제공

정적 자원은 이미지, 폰트, 아이콘, 컴파일한 CSS 또는 JS 파일과 같은 동적으로 변하지 않는 모든 종류의 파일을 의미

이런 정적 자원은 `/public` 디렉터리 안에 저장하는 방식으로 클라이언트에 쉽게 제공

- Next.js 는 해당 디렉터리 안에 있는 모든 파일을 정적 자원으로 간주하고 제공

정적 자원을 관리하고 제공하는 것은 생각보다 쉽지만 특정 유형의 파일은 웹 사이트의 성능과 SEO 점수에 큰 영향을 미침

- 이미지 파일

Next.js 에서는 내장 Image 컴포넌트를 사용해서 CLS 문제를 해결

### 자동 이미지 최적화

이미지 최적화 기능을 사용하면 이미지를 WebP 와 같은 최신 이미지 포맷으로 제공할 수 있음

자동화 이미지 최적화의 장점은 바로 클라이언트가 이미지를 요구할 때 최적화를 한다는 점

다음과 같이 이미지를 바로 제공할 수 있도록 `next.config.js` 내 서비스 호트명을 추가할 수 있다.

- 아래와 같이 설정을 추가하면 Image 컴포넌트 안에서 해당 도메인의 이미지를 불러올 때마다 Next.js 가 자동으로 이미지를 최적화 한다.

```js
module.exports = {
  images: {
    domains: ["search.pstatic.net"],
  },
};
```

```js
function Sample() {
  return (
    <>
      <img
        src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F89%2F0b%2Fda%2F890bda36d1619347a4da16988c5b6377.jpg&type=a340"
        alt="cute dog"
      />
      <Image
        src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F89%2F0b%2Fda%2F890bda36d1619347a4da16988c5b6377.jpg&type=a340"
        width={500}
        height={500}
        alt="cute dog"
      />
    </>
  );
}
```

이미지의 경우 layout 속성값을 지정해서 이미지를 원하는 대로 자를 수 있다.

- fixed, responsive, intrinsic, fill

### 외부 서비스를 통한 자동 이미지 최적화

이미지 최적화는 서버에서 일어난다.

이때 웹 사이트가 컴퓨팅 자원이 충분하지 않은 작은 서버에서 실행된다면 이미지 최적화로 인해 성능에 영향을 미칠 수 있다.

그래서 Next.js 에는 next.config.js 파일 내에 loader 속성을 지정하여 외부 서비스를 통해 자동 이미지 최적화 작업을 처리한다.

```js
module.exports = {
  images: {
    loader: "akamai",
    domains: ["search.pstatic.net"],
  },
};
```

### 메타데이터

메타데이터를 제공하지 않으면 웹 사이트가 꼭필요한 정보를 제공하지 않는다고 생각하여 검색 엔진이 해당 페이지의 점수를 낮게 매김

메타 태그를 이용해서 브라우저가 사용자 경험을 최적화 할 수 있음

Next.js는 내장 Head 컴포넌트를 제공하여 이러한 데이터를 쉽게 다룰 수 있게 도와줌

```js
import Head from "next/head";

function AboutPage() {
  return (
    <>
      <Head>
        <title> Abount this website</title>
      </Head>
    </>
  );
}
```

여러 컴포넌트에서 같은 메타 태그를 수정하는 경우 Next.js 는 같은 태그를 서로 다른 내용으로 여러 요소를 만듬

- 이때 `<title key="htmlTitle">some content</title>` 와 같이 key 속성을 추가해서 해결할 수 있다.

웹 애플리케이션을 개발하다 보면 서로 다른 컴포넌트에서 같은 메타 태그를 사용하는 경우가 종종 생김

그러므로 메타데이터를 그룹화하여 특정 HTML 태그를 다루는 컴포넌트를 만들고 사용하는 것이 좋음

### 공통 메타 태그 그룹

```js
import Head from "next/head";

function PostMeta(props) {
  return (
    <Head>
      <title> {props.title} </title>
      <meta name="description" content={props.subtitle} />

      {/* 오픈 그래프 메타데이터 */}
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.subtitle} />
      <meta property="og:image" content={props.image} />

      {/* 트위터 카드 메타데이터 */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
      <meta name="twitter:image" content={props.image} />
    </Head>
  );
}
```

### \_app.js 와 \_document.js 페이지 커스터마이징

웹 애플리케이션에 따라 페이지 초기화 과정을 조절해야하는 경우가 있음

이 경우 페이지를 렌더링할 때마다 렌더링한 HTML을 클라이언트에 보내기 전에 특정 작업을 처리해야함

Next.js에서는 pages/ 디렉터리 안의 \_app.js 와 \_document.js 로 해당 작업을 처리함

### \_app.js 페이지

해당 파일의 주된 사용 목적은 페이지 이동시 서로 다른 페이지 간 상태 유지, 전역 스타일 추가, 페이지 레이아웃 관리, 페이지 속성에 데이터를 추가하는 것 등이다.

모든 페이지를 렌더링할 때마다 서버에서 특정 데이터를 불러와야 한다면 `getInitialProps` 함수를 사용할 수 있다.

- 이 함수를 사용하면 Next.js가 모든 페이지를 서버에서 렌더링하기 때문에 동적 페이지에 대한 정적 최적화를 하지 않음

```js
// _app.js
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

// getInitialProps sample
// MyApp.getInitialProps = async (appContext) => {
//   const appProps = await App.getInitialProps(appContext);
//   const additionalProps = await fetch();
//   return {
//     ...appProps,
//     ...additionalProps,
//   };
// };

export default MyApp;
```

### \_document.js 페이지

Next.js 에서는 `<html>` 과 `<body>` 태그를 렌더링하기 위해 내장 클래스인 Document 를 사용

\_document.js 파일로 기능을 확장할 수 있다.

\_document.js는 반드시 아래의 4가지를 불러와야 한다.

추가적으로 getServerSideProps 나 getStaticProps 같이 서버에서 데이터를 불러오는 함수는 사용할 수 없다.

```js
import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

- Html:
  - Next.js 애플리케이션의 `<html>` 태그에 해당함
  - lang 과 같은 표준 HTML 속성들을 전달할 수 있음
- Head:
  - 애플리케이션의 모든 페이지에 대한 공통 태그를 정의할 때 이 컴포넌트를 사용
  - 해당 테그는 이전의 `next/Head` 컴포넌트와 개념은 비슷하지만 다름
  - 해당 컴포넌트는 반드시 웹 사이트의 모든 페이지에 공통으로 사용되는 코드가 았을 때만 사용할 수 있다.
- Main:
  - Next.js 가 페이지 컴포넌트를 렌더링하는 곳
  - Main 외부의 컴포넌트는 브라우저에서 초기화되지 않기 때문에 페이지 간에 공통으로 사용되는 컴포넌트가 있다면 반드시 \_app.js 파일에서 해당 컴포넌트를 사용해야한다.
- NextScript:
  - Next.js는 클라이언트에서 전송할 페이지를 렌더링하고, 클라이언트에서 실행할 코드나 리액트 하이드레이션과 같은 작업을 처리할 수 있는 커스텀 스크립트를 끼워 넣음.
  - 해당 컴포넌트는 이러한 커스텀 자바스크립트가 위치하는 곳
