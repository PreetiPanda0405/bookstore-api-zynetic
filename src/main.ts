import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); 
  const config = new DocumentBuilder()
    .setTitle('Bookstore API')
    .setDescription('Zynetic Backend Developer Assignment API Docs')
    .setVersion('1.0')
    .addBearerAuth() // enables JWT token auth
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Docs available at /api

  await app.listen(3000);
}
bootstrap();
