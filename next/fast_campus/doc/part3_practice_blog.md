# 블로그 프로젝트

Next.js가 제공하는 여러 기능들
- page-based-routing system(with dynamic routes)
- Pre-rendering SSG / SSR
- Automatic code splitting for faster page loads
- client-side routing with optimized prefetching
- API Routes(with serverless functions)
- development environment(with fast refresh)

<br>

# CH1 - 연습 프로그래밍

## 프로젝트 시작
```
yarn create next-app blog --example "https://github.com/vercel/next-learn/tree/master/basics/learn-starter"
```

### Link Component
`<a href="/posts/first-post">first post</a>`
- 본 서비스와 외부 링크로 연결 할 때는 `<a> tag` 만 쓰면 됨

`<Link href="/posts/first-post"><a>first post</a></Link>`
- Link Component에 스타일을 줄 때는 `<a> tag`에 줘야 함


### Client Side Navigate
browser에서 url을 직접 쳐서 이동하는 것과 달리 JS상에서 page 컴포넌트를 교체하는 것

### Code Splitting
Next.js는 Automatic Code Splitting을 제공하며, 아래의 기능을 통해 성능이 최적화 된다.
- 특정 페이지에 접근 할 때는 해당 페이지를 그릴때 필요한 chunk만 로드
- 페이지 이동을 할 땐 목적지 페이지에 필요한 chunk만 추가 로드

### prefetching
`<Link>` 컴포넌트를 이용하면, viewport에 Link 컴포넌트가 노출되었을 때 href로 연결된 페이지의 chunk를 로드하며, 이를 통해 성능 최적화를 한다.

<br>

## Layouts - Styling

### public
정적 리소스를 Next.js로 서빙하기 위한 디렉토리
- robots.txt
- images/

### image component
```jsx
// import Image from 'next/image'
<Image src="/images/sample_image.png" width={144} height={144} alt="">
```
- resizing(responsesive 사이즈)
- lazy load(viewport에 들어오면 로드)
- 그 외 optimization(webp 형태)

### metadata
웹 문서로서 제공하는 메타 정보들

### Head Component
- title / image / description등 og(open graph) tag
- icon
- third party script(ex. google-analytics, ...)

### Script Component
- strategy
- onLoad

<br>

## Pre-rendering - Data Fetching
SSG(build time), SSR(request time)

Next.js를 활용하면 페이지별로 Pre-rendering 방식을 선택할 수 있다.
- getStaticProps를 사용하면 SSG
- getServerSideProps를 사용하면 SSR
  - 참고 사항으로 fs는 server side에서만 가능`

### SSG
SSG를 사용하면 좋은 페이지
- Marketing pages
- Blog posts
- E-commerce product listings
- Help and documentation

SSG의 2가지 케이스
- 외부 데이터가 없이 pre-rendering
- 외부 데이터를 가져와서 pre-rendering

### 적용 여부 선택 기준에 따라
사용자가 페이지를 요처하기 전에 pre-render 할수 있는가?
- YES: SSG
- NO: SSR || ISR || CSR

<br>
<br>

# CH2 - 블로그 커스텀 해보기

<br>

# CH3 - 프론트엔드 개발즈를 위한 꿀팁

<br>

# CH4 - React 프로젝트 마이그레이션