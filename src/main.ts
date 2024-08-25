import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig } from './config';
import { LoggerFactoryService } from './shared/logger';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { addBearerAuth, SWAGGER_ACCESS_TOKEN_KEY } from './shared/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { resolveValidationError } from './shared/exception/exception';
import { useContainer, ValidationError } from 'class-validator';
import { HttpExceptionFilter } from './shared/exception/http-exception';

function setupSwagger(path: string, app: any) {
  let swaggerBuilder = new DocumentBuilder()
    .setTitle('Dau Noi API')
    .setVersion('1.0');

  swaggerBuilder = addBearerAuth(swaggerBuilder, {
    key: SWAGGER_ACCESS_TOKEN_KEY,
    name: 'User Token',
  });

  const config = swaggerBuilder.build();

  const document = SwaggerModule.createDocument(app, config);
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
      cacheControl: false,
      etag: false,
    },
    customSiteTitle: 'Restful API Dau Noi Version 1',
  };
  SwaggerModule.setup(path, app, document, customOptions);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logFactory = app.get(LoggerFactoryService);
  const logger = logFactory.createLogger(AppModule.name);
  app.useLogger(logger);

  useContainer(app.select(AppModule), {
    fallbackOnErrors: true,
  });

  const appConfig = app.get(AppConfig);
  app.setGlobalPrefix('/api');

  app.useGlobalFilters(new HttpExceptionFilter(logFactory));

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {}),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      // forbidNonWhitelisted: true,
      whitelist: true,
      skipNullProperties: true,
      skipMissingProperties: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return resolveValidationError(errors);
      },
    }),
  );

  app.enableCors({
    origin: '*',
  });
  app.enableShutdownHooks();

  const swaggerPath = appConfig.server.swaggerPath;
  setupSwagger(swaggerPath, app);

  const httpPort = appConfig.server.httpPort;
  await app.listen(httpPort);

  logger.log(`server listen on port 0.0.0.0:${httpPort}`);
}
bootstrap();
