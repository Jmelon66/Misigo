import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {
  CorsOptions,
  CorsOptionsDelegate,
} from '@nestjs/common/interfaces/external/cors-options.interface';
import fastifyCookie from '@fastify/cookie';
import { randomUUID } from 'crypto';
const corsOptionsDelegate: CorsOptionsDelegate<any> = function () {
  let corsOption: CorsOptions = {};
  corsOption = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: true,
    credentials: true,
    maxAge: 600,
    optionsSuccessStatus: 204,
  };
  // callback(null, corsOption);
  return corsOption;
};
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      http2: true,
    }),
  );
  app.enableCors(corsOptionsDelegate);
  await app.register(fastifyCookie, {
    secret: randomUUID(),
    parseOptions: {
      httpOnly: true,
      path: '/',
      maxAge: 600,
    },
  });
  await app.listen(3001);
}
bootstrap();
