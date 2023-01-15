import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 8000;

  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:3000', 'https://cportal-eight.vercel.app'],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT).then(() => {
    console.log(`Server started at ${PORT} port`);
  });
}
bootstrap();
