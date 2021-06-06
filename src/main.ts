import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // validator pipe global
  app.useGlobalPipes(new ValidationPipe());

  // TODO: Only show at development mode
  // Swagger
  const configSwagger = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The description of API')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, configSwagger)

  SwaggerModule.setup('/', app, document)

  await app.listen(3000);
}
bootstrap();
