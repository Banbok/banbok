import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfig } from './common/configurations';
import { CorsConfig } from './common/configurations/cors.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(CorsConfig.getCorsOptions());
  SwaggerConfig.setUp(app)
  await app.listen(3001);
}

bootstrap();
