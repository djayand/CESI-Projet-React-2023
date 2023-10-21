import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CorsOptions } from 'cors';
import { AppModule } from './app.module';

// Swagger UI base document
async function bootstrap() {
  // Start app
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // CORS Options
  const corsOptions: CorsOptions = {
    origin: '*',
    credentials: true,
  };
  app.enableCors(corsOptions);

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('ms-users')
    .setDescription('API - Users Microservice')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Setup port
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
  const url = await app.getUrl();

  // Display launch logs
  console.log(`ms-users is running on: ${url} .`);
}

bootstrap();
