import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { AppModule } from '../src/app.module';
import { HttpExceptionFilter } from '../src/filters/HttpException.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const server = express();
let bootstrapped: Promise<void> | null = null;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({ origin: '*' });

  const config = new DocumentBuilder()
    .setTitle('Music library')
    .setDescription('Create, read, update, delete tracks, albums')
    .setVersion('1.0')
    .addTag('music_library')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);

  await app.init();
}

export default async function handler(req: express.Request, res: express.Response) {
  if (!bootstrapped) {
    bootstrapped = bootstrap();
  }
  await bootstrapped;
  server(req, res);
}
