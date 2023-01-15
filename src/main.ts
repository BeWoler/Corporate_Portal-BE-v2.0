import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 8000;

  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    origin: [process.env.CLIENT_LOCAL_URL, process.env.CLIENT_PROD_URL],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT).then(() => {
    console.log(`Server started at ${PORT} port`);
  });
}
bootstrap();
