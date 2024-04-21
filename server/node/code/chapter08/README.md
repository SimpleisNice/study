# 08 NestJS 시작하기

## 8.1 왜 NestJS가 필요할까?
NestJS는 서버 개발 시의 아키텍처를 누구든 비슷하게 설계하도록 아키텍처 문제를 해결하는 데 중점을 두고 있음

## 8.2 NestJS 소개
자바스크립트 최신 기능을 사용하는 웹 프레임워크

좋은 구조로 애플리케이션을 작성해 프로젝트의 복잡성을 잘 관리하는 것을 목표로 함

특징?
- Node.js 에서 실행하는 서버 사이드 프레임워크
- 타입스크립트를 완벽하게 지원
- 자바스크립트의 최신 스팩을 사용한다. 그러므로 바닐라 자바스크립트를 사용하려면 babel 사용이 필수
- HTTP 요청 부분은 추상화된 코드를 제공해 익스프레스와 패스티파이를 사용할 수 있다.

### 8.2.1 익스프레스와 NestJS 비교하기
익스프레스는 최소한의 기능을 제공하는 반면, NestJS는 상대적으로 조금 더 많은 기능을 제공

서버 개발에 아키텍처는 왜 필요할까?
- 쉡게 테스트하고, 쉽게 확장이 가능하고 각 모듈 간의 의존성을 줄이도록 해야 유지 보수가 쉬운데 좋은 아키텍처는 이런 목표를 달성할 수 있게 해준다.

### 8.2.2 NestJS 둘러보기
핵심 기능으로 의존성 주입을 둘 수 있다.
- 의존성 주입은 모듈 간의 결합도를 낮춰서 코드의 재사용을 용이하게 함
- 즉, 모듈 내에서의 코드의 응집도는 높여서 모듈의 재사용을 꾀하고 모듈간에는 결합도를 낮춰서 다양한 아키텍처에서 활용할 수 있게 해줌
  - 이를 위한 장치들로 모듈, 가드, 파이프, 미들웨어, 인터셉터 같은 모듈과 코드의 의존관계를 구성하는 프로그래밍적 장치가 있다.

NestJS에서의 기능들?
- 의존성 주입
- 모듈
- 유효성검증
- 가드
- 파이프
- 미들웨어
- 인터셉터
- 환경설정
- 파일 업로드
- 로깅
- 문서화
- 테스트 지원
- DB 연동
- MongoDB 연동
- 세션 처리
- 스트리밍
- 캐싱
- 테스크 스케줄링
- Fastify 적용
- graphql
- websocketﬁ

## 8.3 NestJS 설치하고 실행하기
3가지 방법
- NestJS 구동에 필요한 라이브러리들을 모두 직접 설치하는 방법
- `nest-cli`를 통한 프로젝트 생성
- nest 명령어로 설치하는 저장소를 직접 git clone 하여 내려 받은 후 자신에게 맞도록 설정을 변경하는 방법

### 8.3.1 의존성 패키지 설치
구동에 필요한 라이브러리들을 모두 직접 설치
- @nestjs/core
  - @nestjs/common 에서 사용하는 코드가 들어 있음
- @nestjs/common
  - 프로젝트에서 사용할 대부분의 코드가 들어 있음
  - ex) 데코레이터로 사용하는 코드가 들어 있음
- @nestjs/platform-express
  - HTTP 요청/응답 부분을 감싸서 익스프레스의 req, res 객체를 사용하는 라이브러리
- reflect-metadata
- typescript

```zsh
npm i @nestjs/core @nestjs/common @nestjs/platform-express reflect-metadata typescript
```

### 8.3.2 타입스크립트 설정하기

```json
// tsconfig.json
{
  "compilerOptions": {
    "module": "CommonJS", // 컴파일 옵션
    "target": "ESNEXT", // 모듈 시스템
    "experimentalDecorators": true, // 데코레이터를 사용할 지 여부
    "emitDecoratorMetadata": true, // 데코레이터의 메타 데이터를 같이 보낼지 여부
  }
}
```

### 8.3.3 NestJS의 모듈과 컨트롤러 만들기
NestJS는 웹 서버이므로 기본적으로 HTTP 요청/응답을 처리

일반적으로 웹 애플리케이션이 서버에서 HTTP 요청/응답을 처리하기까지 몇 단계를 거치게 됨
- NestJS에서는 HTTP 요청을 보통
  - `가드 -> 인터셉터 -> 파이프 -> 컨트롤러 -> 서비스 -> 리포지토리` 순서로 처리
    - 클라이언트에서 온 요청을 코드에 전달해야 하므로 이중 컨트롤러는 필수
    - 또한 컨트롤러는 모듈에 포함되어 있음
    - 그러므로 NestJS를 최소한의 코드로 실행시키려면 하나의 모듈과 하나의 컨트롤러가 필요
  - 파이프: 요청에 대한 유효성 검증
  - 가드: 인증/인가
  - 컨트롤러: 특정 함수에 값을 전달(라우팅)
  - 서비스: 비즈니스 로직
  - 리포지터리: 데이터 저장

```ts
// hello.controller.ts
import { Controller, Get }  from '@nestjs/common'

@Controller()
export class HelloController {
  @Get()
  hello() {
    return 'hello world, NESTJS'
  }
}
```
```ts
// hello.module.ts
import { Module} from '@nestjs/common';
import { HelloController } from './hello.controller';

@Module({
  controllers: [HelloController]
})
export class HelloModule {}
```

### 8.3.4 hello-nest 앱 실행시켜보기

```ts
// main.ts
import { NestFactory } from "@nestjs/core";
import { HelloModule } from "./hello.module";

/**
 * NestJS에서는 진입점을 bootstrap()으로 이름 짓는 것이 관례
 */
async function bootstrap() {
  const app = await NestFactory.create(HelloModule);
  await app.listen(3000, () => {
    console.log('START SERVER');
  })
}

bootstrap();
```

다음 명령어를 통해 간단하게 서버를 실행시켜보자
- npx ts-node-dev src/main.ts

### 8.3.5 NestJS의 네이밍 규칙

규칙1: 파일명은 `.` 으로 연결합니다. 모듈이 둘 이상의 단어로 구성되어 있으면 대시로 연결
```
// <모듈명>.<컴포넌트명>.ts
hello.controller.ts
my-first.controller.ts
```

규칙2: 클래스명은 낙타 표기법(Camel Case) 사용한다
```
// <모듈명><컴포넌트명>
HelloController
```

규칙3: 같은 디렉터리에 있는 클래스는 index.tsx를 통해 임포트하는 것을 권장

규칙4: 타입스크립트에서는 인터페이스를 많이 사용
- 인터페이스는 타입을 정의하는데 사용되고 구체적인 내용은 클래스를 만들고 인터페이스를 상속하는 방식으로 작성
```
// interface sample
interface Series {}
interface BookSeries extends Series {}
class MovieSeries extends Series {}
```

## 8.4 NestJS로 웹 API 만들기
블로그를 만들며 NestJS 사용법을 체득해 보자!

1단계: API 만들기
- 프로젝트 생성
- 컨트롤러 만들기
- 블로그 API 작성하기
- 메모리와 파일로 블로그 API 만들기

2단계: 의존성 주입
- 의존성 주입 설정하기
- 서비스에 리포지토리 의존성 주입하기
- 컨트롤러에 서비스 의존성 주입하기

3단계: 몽고디비 연결하기
- 의존성 설치하기
- 스키마 만들기
- 몽고디비 리포지토리 생성하기
- 서비스에 몽고디비 사용하도록 변경하기

### 8.4.1 프로젝트 생성과 설정
`nest-cli`를 사용해서 프로젝트 설정
```
npm install -g @nestjs/cli
nest new blog
```

설치가 완료된 구조
```
- src
-- app.controller.spec.ts
-- app.controller.ts
-- app.module.ts
-- app.service.ts
- test
-- app.e2e-spec.ts
-- jset-e2e.json
- .eslintrc.js
- .gitignore
- .prettierrc
- nest-cli.json
- package.json
- pnpm-lock.yaml
- README.md
- tsconfig.build.json
- tsconfig.json
```

### 8.4.2 컨트롤러 만들기
컨트롤러는 유저가 보낸 HTTP 요청을 어떤 코드에서 처리할지 정하는 역할
- HTTP 요청 시 헤더, URL 매개변수, 쿼리, 바디 등의 정보가 있음
- 이 정보를 바탕으로 적절한 데코레이터가 붙어 있는 컨트롤러 코드를 실행시킴
- `<모듈명>.controller.ts` 라는 파일로 생성함
- NestJS에서는 모듈 단위로 애플리케이션을 구성

```
클라이언트에서 HTTP 요청이 들어온다면 특정 컨트롤러가 받아서 처리함
===== (HTTP 요청) ====> 컨트롤러 A
===== (HTTP 요청) ====> 컨트롤러 B
===== (HTTP 요청) ====> 컨트롤러 C
```

블로그를 위하여 아래의 파일을 생성
```
blog.controller.ts
blog.data.json
blog.http
blog.model.ts
blog.repository.ts
blog.schema.ts
blog.service.ts
```

### 8.4.3 블로그 API 작성하기
| URL 경로 | HTTP메서드 | 설명 |
|------|------|------|
|/|GET|글 목록을 가져옴|
|/blog|POST|글을 쓴다. 글의 정보는 아이디(id), 제목(title), 작성자(name), 내용(content), 생성일시(createdDt), 수정일시(updatedDt)로 구성|
|/blog/:id|PUT|게시글 아이디가 id인 글을 수정|
|/blog/:id|DELETE|게시글 아이디가 id인 글을 삭제|
|/blog/:id|GET|게시글 아이디가 id인 글을 가져옴|

블로그 API 기능을 작성하려면 우선 컨트롤러가 있어야 한다.
- 컨트롤러는 URL 경로와 HTTP 속성들을 확인해 특정 코드를 실행시켜 줌
- NestJS에서는 `@Controller` 데코레이터를 사용해서 컨트롤러를 만듬
- HTTP 메서드나 URL 속성도 모두 데코레이터로 표현을 한다.

```ts
// blog.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";

@Controller('blog')
export class BlogController {
  // GET /blog는 모든 게시글을 가져오는 메서드인 getAllPosts에 매핑됨
  @Get()
  getAllPosts() {
    console.log('call all posts');
  }
  // POST /blog는 게시글을 만드는 함수인 createPost에 매핑됨
  @Post()
  createPost(@Body() post: any) {
    console.log('create post')
    console.log(post);
  }
  // GET /blog/:id는 하나의 게시글을 가져오는 메서드인 getPost에 매핑됨
  // :id는 @Param 데코레이터를 사용
  @Get('/:id')
  getPost(@Param('id') id: string) {
    console.log(`[id: ${id}] get one post`)
  }
  // DELETE /blog/:id는 하나의 게시글을 삭제하는 메서드인 deletePost에 매핑됨
  // :id는 @Param 데코레이터를 사용
  @Delete('/:id')
  deletePost() {
    console.log('delete post')
  }
  // PUT /blog/:id는 하나의 게시글을 업데이트하는 메서드인 updatePost에 매핑됨
  // :id는 @Param 데코레이터를 사용
  @Put('/:id')
  updatePost(@Param('id') id: string, @Body() post: any) {
    console.log(`[${id} update post]`);
    console.log(post);
  }
}
```

### 8.4.4 메모리에 데이터를 저장하는 API 만들기
컨트롤러의 역할은 HTTP 요청을 특정 함수가 실행하게 하는 것이며,
실제 로직의 경우 BlogService에 비즈니스 로직을 담는다.

```ts
// blog.service.ts
import { PostDto } from './blog.model';

export class BlogService {
  posts = [];

  getAllPosts() {
    return this.posts;
  }
  
  createPost(postDto: PostDto) {
    const id = this.posts.length + 1;
    this.posts.push({
      id: id.toString(),
      ...postDto,
      createDt: new Date()
    });
  }

  getPost(id) {
    const post = this.posts.find(post => {
      return post.id === id;
    });
    console.log(post);
    return post;
  }

  delete(id) {
    const filteredPosts = this.posts.filter(post => post.id !== id);
    this.posts = [...filteredPosts];
  }

  updatePost(id, postDto: PostDto) {
    let updateIndex = this.posts.findIndex((post) => post.id === id);
    const updatePost = { id, ...postDto, updatedDt: new Date() }
    this.posts[updateIndex] = updatePost;
    return updatePost
  }
}
```

```ts
// blog.model.ts
export interface PostDto {
  id: string;
  title: string;
  content: string;
  name: string;
  createdDt: Date;
  updatedDt?: Date;
}
```

```ts
// blog.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { BlogService } from "./blog.service";

@Controller('blog')
export class BlogController {
  blogService: BlogService;

  constructor() {
    this.blogService = new BlogService();
  }

  @Get()
  getAllPosts() {
    console.log('call all posts');
    return this.blogService.getAllPosts();
  }

  @Post()
  createPost(@Body() postDto) {
    console.log('create post')
    this.blogService.createPost(postDto);
    return 'success';
  }

  @Get('/:id')
  getPost(@Param('id') id: string) {
    console.log(`[id: ${id}] get one post`);
    return this.blogService.getPost(id);
  }

  @Delete('/:id')
  deletePost(@Param('id') id: string ) {
    console.log('delete post');
    this.blogService.delete(id);
    return 'success';
  }

  @Put('/:id')
  updatePost(@Param('id') id: string, @Body() postDto) {
    console.log(`[${id} update post]`, id, postDto);
    return this.blogService.updatePost(id, postDto);
  }
}
```

```
# blog.http
@server = http://localhost:3000

# 게시글 조회
GET {{ server }}/blog

### 게시글 생성
POST {{ server }}/blog
Content-Type: application/json

{
  "title": "안녕하세요",
  "content": "처음 인사드립니다.",
  "name": "이름"
}

### 특정 게시글 조회
GET {{ server }}/blog/<게시글ID>

### 게시글 삭제
DELETE {{ server }}/blog/<게시글ID>

### 게시글 수정
PUT {{ server }}/blog/1
Content-Type: application/json

{
  "title": "타이틀 수정3",
  "content": "본문수정3",
  "name": "jerome.kim"
}
```
### 8.4.5 파일에 정보를 저장하도록 API 업그레이드 하기
```
개인적으로 사용하는 코드라면 메모리에 올려도 문제는 없을것이다.
하지만 실제 블로그를 운영한다면 이는 큰 문제일 것이고, 이를 해결하려면 파일이나 데이터베이스에 저장해야 한다.
이를 아키텍처 관점에서는 영속성이라고 한다.
```
인터페이스를 사용하면 확장성이 좋은 프로그램을 만들 수 있다.
