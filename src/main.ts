import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as expressBasicAuth from 'express-basic-auth';
import * as config from 'config';

// swagger api를 위한 추가
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get('server');
  const swaggerAuth = config.get('swagger');

  app.use(
    ['/docs', '/docs-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        [swaggerAuth.username]: swaggerAuth.password,
        // 당연히 코드에 비밀번호 적으면 다 털리니까 ENV로 분리해 저장
      },
    }),
  );
  app.use(cookieParser());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('DIY Service API')
    .setDescription('배운거 적용해보는 중')
    .setVersion('1.0.0')
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(
    app,
    swaggerConfig,
  );
  SwaggerModule.setup('docs', app, document);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(serverConfig.port);
}
bootstrap();

// 강의 참조해서 싱글톤 패턴으로 서버 만들어보기
// import { NestFactory, Reflector } from '@nestjs/core';
// import { AppModule } from './app.module';
// import {
//   ClassSerializerInterceptor,
//   Logger,
//   ValidationPipe,
// } from '@nestjs/common';
// import { NestExpressApplication } from '@nestjs/platform-express';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import cookieParser from 'cookie-parser';

// class Application {
//   private logger = new Logger(Application.name); // 로그 미들웨어인가?
//   private PORT: string; // 실행 시 사용할 포트 번호
//   private corsOriginList: string[]; // cors 주소는 배열로 들어감
//   private ADMIN_USER: string; // Swagger 접속 시 사용하는 유저
//   private ADMIN_PASSWORD: string; // Swagger 접속 시 사용하는 비밀번호

//   constructor(private server: NestExpressApplication) {
//     this.server = server;

//     // JWT 생성할 비밀번호가 없으면 에러
//     if (!process.env.SECRET) this.logger.error('JWT 암호화 키 없음');
//     // 포트는 존재하지 않으면 8000
//     this.PORT = process.env.PORT || '8000';
//     // CORS 주소 배열은 없으면 와일드카드
//     // 배열을 ',' 로 나눠서 여백 날리고 추가
//     this.corsOriginList = process.env.CORS_ORIGIN_LIST
//       ? process.env.CORS_ORIGIN_LIST.split(',').map((origin) => origin.trim())
//       : ['*'];
//     this.ADMIN_USER = process.env.ADMIN_USER || 'USER';
//     this.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'TEST';
//   }

//   private setUpSwagger() {
//     SwaggerModule.setup(
//       'docs',
//       this.server,
//       SwaggerModule.createDocument(
//         this.server,
//         new DocumentBuilder()
//           .setTitle('Practice API')
//           .setDescription('연습용 API 앱')
//           .setVersion('0.0.1')
//           .build(),
//       ),
//     );
//   }

//   private async setUpGlobalMiddleware() {
//     this.server.enableCors({
//       origin: this.corsOriginList,
//       credentials: true,
//     });
//     // cookie-parser, @types/cookie-parser 설치 필요
//     this.server.use(cookieParser());
//     // 인증 관련 미들웨어가 필요
//     this.setUpSwagger();
//     this.server.useGlobalPipes(
//       new ValidationPipe({
//         transform: true,
//       }),
//     );
//     // passport 관련 미들웨어
//     this.server.useGlobalInterceptors(
//       new ClassSerializerInterceptor(this.server.get(Reflector)),
//     );
//     // 404 미들웨어(여기까지 처리가 안 됐으면 없는 주소니까)
//   }

//   async bootstrap() {
//     await this.setUpGlobalMiddleware();
//     await this.server.listen(this.PORT);
//   }

//   startLog() {
//     this.logger.log(`Server running on port ${this.PORT}`);
//   }

//   errorLog(error: Error) {
//     this.logger.log(`!!! Server ERROR ${error} !!!`);
//   }
// }

// async function init(): Promise<void> {
//   const server = await NestFactory.create<NestExpressApplication>(AppModule);
//   const app = new Application(server);
//   await app.bootstrap();
//   app.startLog();
// }

// init().catch((err) => {
//   new Logger('init').error(err);
// });
