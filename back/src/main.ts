import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/HttpException.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const start = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new HttpExceptionFilter());
    app.enableCors();

    const config = new DocumentBuilder()
      .setTitle('Music library')
      .setDescription('Create, read, update, delete tracks, albums')
      .setVersion('1.0')
      .addTag('music_library')
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

    await app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server listens on PORT=${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
