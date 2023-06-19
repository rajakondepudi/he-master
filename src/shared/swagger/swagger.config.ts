import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export function setupSwagger(app: INestApplication) {
  const Config = app.get(ConfigService);
  const Options = new DocumentBuilder()
    .setTitle(Config.get<string>('swagger.title'))
    .setDescription(Config.get<string>('swagger.description'))
    .setVersion(Config.get<string>('swagger.version'))
    .addBearerAuth(
      {
        type: Config.get<any>('swagger.auth.type'),
        scheme: Config.get<any>('swagger.auth.schema'),
        bearerFormat: Config.get<any>('swagger.auth.bearerformat'),
        name: Config.get<any>('swagger.auth.name'),
        description: Config.get<any>('swagger.auth.description'),
        in: Config.get<any>('swagger.auth.in'),
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, Options);
  SwaggerModule.setup('api', app, document);
}
