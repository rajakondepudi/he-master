import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './shared/pipes/validate.pipe';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { ResponserInterceptor } from './shared/interceptors/response.interceptor';
import { setupSwagger } from './shared/swagger/swagger.config';
import { ResponseClass } from './shared/utils/response.utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const globalPrefix: string = configService.get<string>('api.prefix');
  app.setGlobalPrefix(globalPrefix);
  // handle all user input validation globally
  app.useGlobalPipes(new ValidateInputPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Handle all response globally
  const ResponseInstance = new ResponseClass();
  app.useGlobalInterceptors(new ResponserInterceptor(ResponseInstance));

  // Register Swagger
  setupSwagger(app);

  const port: number = configService.get<number>('http.port');
  await app.listen(port);
}
bootstrap();
