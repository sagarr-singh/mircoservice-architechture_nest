import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ApiKeyGuard } from './guards/apikey.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  console.log('Loaded API_KEY =', process.env.API_KEY);
  console.log('Products service port:', process.env.PRODUCTS_TCP_PORT);


  app.useGlobalGuards(new ApiKeyGuard()); // ⬅️ Enforce API key

  const config = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('Gateway for Products & Orders microservices')
    .setVersion('1.0')
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'apiKey')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
  console.log('API Gateway running at http://localhost:3000/docs');
}
bootstrap();
