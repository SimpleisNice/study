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