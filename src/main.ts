import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Bootstrap means to start the application. The word comes from the saying "to pull oneself up by one's bootstraps", which means to start from scratch.
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe(
      // ValidationPipe is a pipe that uses class-validator to transform and validate payloads against a class model.
      {
        whitelist: true,
        // forbidNonWhitelisted: true,
        // transform: true,
      },
    ),
  );
  await app.listen(process.env.PORT || 3500);
}
bootstrap();
