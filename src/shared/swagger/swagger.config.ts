import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export function setupSwagger(app: INestApplication) {
  const config = app.get(ConfigService);
  const options = new DocumentBuilder()
    .setTitle(config.get<string>('swagger.title'))
    .setDescription(config.get<string>('swagger.description'))
    .setVersion(config.get<string>('swagger.version'))
    .addBearerAuth(
      {
        type: config.get<any>('swagger.auth.type'),
        scheme: config.get<any>('swagger.auth.schema'),
        bearerFormat: config.get<any>('swagger.auth.bearerformat'),
        name: config.get<any>('swagger.auth.name'),
        description: config.get<any>('swagger.auth.description'),
        in: config.get<any>('swagger.auth.in'),
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}
