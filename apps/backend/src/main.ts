import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfig } from './common/configurations';
import { CorsConfig } from './common/configurations/cors.config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors(CorsConfig.getCorsOptions());
  SwaggerConfig.setUp(app)
  await app.listen(3001);
}

bootstrap();
