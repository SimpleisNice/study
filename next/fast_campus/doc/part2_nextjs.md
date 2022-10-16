# PART2 NEXT JS 시작하기

## Data Fetching

아래의 프로젝트를 참고
- `npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/learn-starter"`

- `git clone https://github.com/vercel/commerce.git`

왜 시작은 Data Fetching
- 화면에 무엇인가 그리려면 결국 어디선가 Data를 가져와야함

Next.js 가 제시하는 3 + 1 가지 Data Fetching 방법
- SSR
- CSR
- SSG
- ISR

SSR(Server Side Render)
- 서버가 그린다
- 그린다: 데이터를 가져와서 그린다.
- 서버가 그린다.: 서버가 데이터를 가져와서 그린다.

SSR을 담당하는 함수
- getServerSideProps
- ```jsx
  export async function getServerSideProps() {
    return {
      props: { time: new Date().toISOString() }
    }
  }
  export default function Home({ time }) {
    return (
      <h1>{ time }</h1>
    )
  }
  ```

CSR(Client Side Render)
- 클라이언트가 그린다.
- 그린다: 데이터를 가져와서 그린다.
- 클라이언트가 그린다: 클라이언트가 데이터를 가져와서 그린다.

CSR을 담당하는 함수
- 따로 없음
- 기존 React 사용법과 동일

SSG(Static-Stie Generation)
- 정적인 사이트를 생성한다.
- 생성한다: 데이터를 가져와서 그려둔다.
- 정적인 사이트를 생성한다.: 정적인 사이트를 데이터를 가져와서 그려둔다.

SSG를 담당하는 함수
```js
export async function getStaticProps() {
  return {
    props: { time: new Date().toISOString(), }
  }
}
```
- getStaticProps(with getStaticPaths)
  - 미리 정적인 화면들을 그려둠
- getStaticPaths
  - 미리 그려둬야할 패스가 무엇인지 알기 위해

SSG 관련 사항
- SSG는 개발환경에서 제대로 동작하지 않음
- SSG는 개발환경에서 SSR 처럼 동작하기 때문에 다음과 같은 확인이 필요하다
  - yarn build
  - yarn start
- 빌드를 할때 미리 페이지를 만들어 둠
- 미리 만들어둔 페이지이기 떄문에 부하 없이 제공할 수 있음
- 블로그 처럼


ISR(Incremental Static Regeneration)
```js
export async function getStaticProps() {
  return {
    props: {
      time: new Date().toISOString(),
      revalidate: 1,
    }
  }
}
```
- 증분 정적 사이트를 재생성한다.
- 재생성한다: (특정 주기로) 데이터를 가져와서 다시 그려둔다.
- 증분 적적 사이트를 재생성한다.: (특정 주기로) 정적인 사이트를 데이터를 가져와서 다시 그려둔다.


ISR을 담당하는 함수
- getStaticProps with revaildate


## Layout - Pages - Image

Pages
- 
- url 과 1 : 1 매칭