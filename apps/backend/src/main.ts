import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfig } from './common/configurations';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  SwaggerConfig.setUp(app)
  await app.listen(3001);
}

bootstrap();
