import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Bootstrap means to start the application. The word comes from the saying "to pull oneself up by one's bootstraps", which means to start from scratch.
  const app = await NestFactory.create(AppModule);
  await app.listen(3500);
}
bootstrap();
