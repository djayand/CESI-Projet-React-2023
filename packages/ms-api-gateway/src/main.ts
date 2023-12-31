import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    methods: ['POST', 'PUT', 'DELETE', 'GET'],
    credentials: true,
  });

  await app.listen(30000);
}
bootstrap();
