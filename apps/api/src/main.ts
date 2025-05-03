import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { appConfig } from './config/AppConfig';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule.register());
  const appMode = appConfig.appMode;

  if (['api', 'combined'].includes(appMode)) {
    await initializeApiMode(app);
  } else {
    await initializeBackgroundMode(app);
  }
}

async function initializeApiMode(app) {
  Logger.log('Starting application in API mode...');

  configureApiSettings(app);
  setupSwagger(app);

  await app.listen(appConfig.port);
  Logger.log(`Application is running on http://localhost:${appConfig.port}`);
}

async function initializeBackgroundMode(app) {
  Logger.log('Running in background mode: No HTTP server started');
  await app.init(); // Ensure all lifecycle hooks are executed
}

function configureApiSettings(app) {
  Logger.log('Configuring API settings...');

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Increase the payload limit
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
}

function setupSwagger(app) {
  Logger.log('Setting up Swagger...');

  const config = new DocumentBuilder()
    .setTitle('Turborepo Boilerplate API')
    .setDescription('API documentation for the Turborepo Boilerplate application')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  Logger.log('Swagger is set up at /api/docs');
}

bootstrap();
