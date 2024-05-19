# CHAPTER09 - NestJS 환경 변수 설정하기
환경 변수를 테스트하는 데 사용할 프로젝트를 생성하고 환경 변수 설정에 사용하는 .env 파일을 불러오는 테스트를 합니다.

NestJS 에서 환경 변수 관련 로직을 담당하는 ConfigModule의 설정은 각 모듈별로 설정해야 함
- 전역적
- 여러 환경 변수 사용
- 커스텀 환경 변수 사용
- 기동 시 환경 변수 파일을 읽어오는 절차
- YAML 사용 방법
- 캐시 옵션 사용 방법
- 확장 변수 사용 방법

## 9.1 환경 변수 소개
배포를 어떤 환경에 하느냐에 따라서 환경별로 나눠주어야함

또한 소스코드에 들어가면 안 되는 민감한 값이 있을 수 있는데 이런 부분은 최소한 환경 변수로 설정하거나 vault 같은 소스 코드 이외의 외부 저장소에 두어야함

코드로 제어하는 것이 아닌 별도의 파일로 두거나 외부의 서버에 설정해서 읽어올 수 있도록 해야함
- 그렇지 않으면 설정이 복잡해질수록 환경 변수를 제어하는 코드가 복잡해지기 때문

NestJS에서 환경 변수 설정은 ConfigModule에서 할 수 있으면, 설정된 환경 변수를 다른 모듈에서 가져다 쓰려면 ConfigService를 주입받아서 사용해야 한다.

```
main.ts
1. bootstrap()
2. ConfigModule 초기화
- ConfigModule.forRoot() 실행
- envFilePath에서 환경 변수 읽기
- envFilePath 결과와 process.env 와 병합
- envFilePath, process.env 결과와 load 옵션 설정과 병합
3. ConfigService 초기화
- 의존성 주입
```

## 9.2 프로젝트 생성 및 설정하기
프로젝트 생성 및 설정
```
nest new config-test
cd config-test
pnpm i @nestjs/config
```
- @nestjs/config 는 내부적으로 dotenv 를 사용

## 9.3 NestJS 설정 및 테스트하기
1. app.module.ts 에 ConfigModule 설정
2. .env 파일 생성
3. app.controller.ts 에 테스트 라우팅 함수 추가

### 9.3.1 app.module.ts에 ConfigModule 설정하기
ConfigModule은 환경 설정에 특화된 기능을 하는 모듈
@nestjs/config 패키지에 포함되 있는 클래스이며 모든 환경 변수 설정은 ConfigModule로 부터 시작한다고 생각하면 된다.

### 9.3.2 .env 파일 생성하기
.env 파일은 @nestjs/config 내부에서 사용하는 dotenv 라이브러리에서 환경 변수 파일을 읽어올 때 사용하는 파일

dotenv는 기본적으로 .env 확장자인 파일을 읽어옴

환경 변수 설정을 가장 간단히 하는 방법은 .env 파일을 만드는 것

그러므로 프로젝트 루트 디렉터리에 .env 파일을 생성

### 9.3.3 app.controller.ts 에 코드 추가하기
app.controller.ts는 nest-cli로 프로젝트를 생성하면 기본적으로 만들어지는 파일

```ts
/** 환경 변수 테스트용 핸들러 함수 추가 */
import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private configService: ConfigService) {}

  @Get()
  getHello(): string {
    const message = this.configService.get('MESSAGE');
    return message;
  }
}

```

## 9.4 ConfigModule 을 전역 모듈로 설정하기
환경 변수를 읽어오려면 ConfigService를 사용할 수 있어야한다.

그러려면 ConfigModule을 해당 모듈에 설정해야 한다.
- 모듈이 몇 개 안된다면 문제가 없지만, 큰 프로젝트는 모듈을 수백 개 사용하므로 효율적인 방법이 필요
- 이럴 때 isGlobal 옵션을 사용하면 다른 모듈에 ConfigModule을 일일이 임포트 하지 않아도 됨

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  // 전역 모듈 설정 추가
  imports: [ConfigModule.forRoot({ isGlobal: true })], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### 9.4.1 .env에 환경 변수 설정하기
.env 파일에 환경 변수 추가
```
MESSAGE=hello nest js
WEATHER_API_URL=http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=
WEATHER_API_KEY=my_weather_api_key
```

### 9.4.2 weather 모듈 만들기
nest cli 에서 다음과 같이 실행하면 weather 모듈과 컨트롤러 클래스가 각각 생성됨
```
nest g module weather
nest g controller weather --no-spec
```

```ts
// weather.controller.ts
import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('weather')
export class WeatherController {
  constructor(private configService: ConfigService) {}

  @Get()
  public getWeather(): string {
    const apiUrl = this.configService.get('WEATHER_API_URL');
    const apiKey = this.configService.get('WEATHER_API_KEY');
    return this.callWeatherApi(apiUrl, apiKey);
  }

  private callWeatherApi(apiUrl: string, apiKey: string): string {
    console.log('get weather info...');
    console.log(apiUrl);
    console.log(apiKey);
    return 'clean'
  }
}
```

## 9.5 여러 환경 변수 파일 사용학

### 9.5.1 환경별로 서버가 기동되도록 스크립트 수정하기
local, dev, prod 환경에서 서버를 기동하려면 package.json의 scripts 항목에 스크립트 추가가 필요
- `process.env.{환경 변수명}` 형식을 사용한다.

```json
// window
{
  "scripts": {
    "start": "set NODE_ENV=local && nest start",
    "start:dev": "set NODE_ENV=dev && nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "set NODE_ENV=prod && node dist/main"
  }
}
// mac
{
  "scripts": {
    "start": "NODE_ENV=local nest start",
    "start:dev": "NODE_ENV=dev nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "NODE_ENV=prod node dist/main"
  }
}
```
- `npm run start:dev` 또는 `npm run start:prod`

### 9.5.2 local, dev, prod 환경 변수 생성
ConfigModule.forRoot() 의 옵션 중 envFilePath 옵션을 사용해서 구현해보자.

```
// envs/local.env
SERVICE_URL=http://dev.config-test.com

// envs/dev.env
SERVICE_URL=http://dev.config-test.com

// envs/product.env
SERVICE_URL=http://config-test.com
```

### 9.5.3 환경 변수에 따라서 다른 환경 변수 파일을 사용하도록 설정 수정하기
환경 변수에 따라서 다른 환견 변수 파일을 사용하는 envFilePath를 적용할 수 있게 변경
```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [
    // 전역 모듈 설정 추가
    ConfigModule.forRoot({
      isGlobal: true,
      /**
       * 환경 변수 파일 경로 지정
       * - cwd는 현재 디렉터리의 절대 경로를 출력
       */
      envFilePath: `${process.cwd()}/envs/${process.env.NODE_ENV}.env`
    }),
    WeatherModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## 9.6 커스텀 환경 설정 파일 사용하기
복잡한 설정이 필요할 때 .ts 환경 설정 파일을 사용함

환경 설정 파일로 .ts 파일을 사용하면 커스텀한 환경 설정을 할 수 있다.

.ts 파일을 사용해 공통 환경 변수 설정과 YAML 파일로 설정
- config.ts 환경 변수 파일 생성
- ConfigModule 에 load 옵션 추가
- 커스텀 환경 변수 읽기

커스텀 환견 변수 파일 config.ts의 로직
1. process.env.NODE_ENV 확인
2. {NODE_ENV}.ts 파일로 불러오기
3. common.ts 파일 불러오기
4. 이전에 읽은 2와 3을 병합하여 변환

### 9.6.1 환경 변수 파일 생성하기
실행 시 logLevel, apiVersion, MESSAGE 등 공통으로 사용할 환경 변수를 정의하는 파일을 정의
```ts
export default {
  logLevel: 'info',
  apiVersion: '1.0.0',
  MESSAGE: 'hello'
};
```

### 9.6.2 ConfigModule에 load 옵션 추가하기
커스텀 파일 설정을 하려면 load 옵션을 추가해야함
- app.module.ts의 ConfigModule 설정에 load 옵션을 추가해야함

### 9.6.3 커스텀 환경 변수 읽기 테스트하기

## 9.7 서버 기동과 환경 설정 파일 초기화 순서 알아보기
```
1. main.ts 의 bootstrap() 실행
2. NestFactory.create() 실행
3. 각 모듈 초기화
  - ConfigModule 초기화
    - 환경 변수 읽어오기
      4. ConfigModule.forRoot() 실행
      5. envFilePath 에서 환경 변수 읽기
      6. 4에서 설정한 process.env 를 5와 병합
      7. load 실행 후의 결과 값괏값과 병합
  - AppModule 초기화
  - WeatherModule 초기화
8. 각 컨트롤러 초기화 및 핸들러 함수 url 에 매핑
```

## YAML 파일을 사용해 환경 변수 설정하기
YAML 은 문법이 간결하며 JSON 에서 표현하는 모든 데이터를 표현할 수 있다.

또한 JSON 에서 불가능한 주석도 지원

### 9.3.1 js-yaml 설치하기
```
npm i js-yaml
npm i -D @types/js-yaml
```

### 9.3.2 config.yaml 파일 생성하기
```yaml
# env/config.yaml
http:
  port: 3000

redis:
  host: 'localhost'
  port: 6379
```

### 9.3.3 config.ts 수정하기
```ts
// configs/config.ts
import common from "./common";
import local from "./local";
import dev from "./dev";
import prod from "./prod";
import { readFileSync } from "fs";
import * as yaml from 'js-yaml';

const phase = process.env.NODE_ENV;

const yamlConfig: Record<string, any> = yaml.load(
  // YAML 파일 로딩
  readFileSync(`${process.cwd()}/envs/config.yaml`, 'utf-8'),
);

let conf = {}
// phase 의 값에 따라서 적절한 환경 변숫값을 conf 에 저장
if (phase === 'local') {
  conf = local;
} else if (phase === 'dev') {
  conf = dev;
} else if (phase === 'prod') {
  conf = prod;
}

// common 과 conf 에서 받은 값을 합쳐서 결과값으로 주는 함수 반환
export default () => ({
  ...common,
  ...conf,
  ...yamlConfig
})
```

### 9.8.4 테스트용 핸들러 함수로 테스트하기
```ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private configService: ConfigService) {}
  // ...
  @Get('redis-info')
  getRedisInfo(): string {
    return `${this.configService.get('redis.host')}:${this.configService.get('redis.port')}`
  }
}
```

## 9.9 캐시 옵션 사용하기
설정 파일은 서버가 한 번 기동된 뒤에는 변경되지 않으므로 캐시를 사용하면 성능에서 이득

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { WeatherModule } from './weather/weather.module';
import config from './configs/config';

@Module({
  imports: [
    // 전역 모듈 설정 추가
    ConfigModule.forRoot({
      isGlobal: true,
      /**
       * 환경 변수 파일 경로 지정
       * - cwd는 현재 디렉터리의 절대 경로를 출력
       */
      envFilePath: `${process.cwd()}/envs/${process.env.NODE_ENV}.env`,
      load: [config],
      cache: true,  // 캐시
    }),
    WeatherModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## 9.10 확장 변수 사용하기
확장 변수는 이미 선언된 변수를 다른 변수에 `${변수명}`으로 할당하는 기능

```
# local.env
SERVER_DOMAIN=localhost
SERVER_PORT=3000

# 확장 변수 기능을 사용한 변수 선어
SERVER_URL=http://${SERVER_DOMAIN}:${SERVER_PORT}
```
- 확장 변수는 내부적으로 dotenv-expand 패키지를 사용합니다.

### 9.10.1 확장 변수를 사용할 수 있게 추가 설정하기
확장 변수를 사용하려면 ConfigModule 에 한가지 설정이 필요
- expandVariables 옵션 추가 필요

```ts
@Module({
  imports: [
    // 전역 모듈 설정 추가
    ConfigModule.forRoot({
      // ...
      expandVariables: true, // 확장 변수 옵션 추가
    }),
    WeatherModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### 9.10.2 테스트용 핸들러 함수로 테스트하기
```ts
@Controller()
export class AppController {
  @Get('server-url')
  getServerUrl(): string {
    return this.configService.get('SERVER_URL'); // 확장 변숫값 읽기
  }
}
```

## 9.11 main.ts 에서 환경 변수 사용하기
main.ts는 서버 기동 시 가장 먼저 실행되는 파일
- 가장 먼저 실행이 되므로 해당 파일에서 NestFactory.create()를 호출 해주기 전에는 ConfigModule이 활성화되지 않는다.
- 또한 크랠스가 아니라 bootstrap() 함수만 있으므로 기존처럼 클래스의 생성자로 의존성을 주입 받을 수 없으므로, 다른 방법으로 ConfigService 를 사용해야 한다.
- app.get() 메서드에 ConfigService 클래스를 인수로 주고, 반환값을 받는 방식으로 사용

```ts
/** 
 * 기동 시 가장 먼저 실행되는 파일 
 * - /src/main.ts
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ConfigService를 app.get()에 추가
  const configService = app.get(ConfigService);
  // configService 사용
  await app.listen(configService.get("SERVER_PORT"));
}
bootstrap();
```
1. app.get() 메서드에 ConfigService 를 넣으면 앱의 환경 변수를 사용할 수 있는 configService 인스턴스를 반환
2. 1에서 받은 configService 인스턴스를 사용해 기존에는 하드 코딩되어 있던 서버 포트 정보를 환경 변수를 변경

## END
개발, 배포 등에 상황에 따라 환경 변수를 달리해야 함.

### 추가로
1. 민감한 환경 변수를 관리하는 설정 파일 저장소 "vault"
2. 서바 간 설정을 동기화하는 데 사용할 수 있는 "주키퍼" 서버
3. NestJS 설정 공식 문서
