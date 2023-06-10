import { HttpExceptionFilter } from '@common/filters/http-exception.filter';
import { TransformResponseInterceptor } from '@common/interceptors/transform-response.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const configService = new ConfigService();
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:3000']
    }
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.useGlobalInterceptors(new TransformResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Anastasia Project')
    .setDescription('The "Anastasia Project" API descripition.')
    .setVersion('1.0')
    .addTag('berikard')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.get<number>('BACKEND_APP_PORT'));
}
bootstrap();
