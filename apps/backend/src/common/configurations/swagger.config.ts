import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_CONFIG } from '../constants';

export class SwaggerConfig {
  static setUp(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle(SWAGGER_CONFIG.TITLE)
      .setDescription(SWAGGER_CONFIG.DESCRIPTION)
      .setVersion(SWAGGER_CONFIG.VERSION)
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(SWAGGER_CONFIG.PATH, app, document);
  }
}
