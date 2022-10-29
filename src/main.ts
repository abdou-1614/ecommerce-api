import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ExceptionInterceptor } from './common/interceptors/exception.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }))

  app.useGlobalInterceptors(new ExceptionInterceptor())

  const config = new DocumentBuilder()
  .setTitle('Ecommerce BackEnd')
  .setDescription('BackEnd Ecommerce App')
  .setVersion('0.0.1')
  .addBearerAuth()
  .addTag('authentication')
  .addTag('user')
  .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'E-commerce Swagger API'
  })
  await app.listen(3000);
}
bootstrap();
