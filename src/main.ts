import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { corsConfig } from './config/cors.config';
import { swaggerSetup } from './config/swagger.config';

async function bootstrap() {
  const PORT = process.env.PORT || 8000;

  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({ ...corsConfig });

  app.useGlobalPipes(new ValidationPipe());

  swaggerSetup(app);

  await app.listen(PORT).then(() => {
    console.log(`Server started at ${PORT} port`);
  });
}
bootstrap();
