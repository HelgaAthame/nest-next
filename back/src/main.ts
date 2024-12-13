import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/HttpException.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';

const start = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new HttpExceptionFilter());
    app.enableCors({
      origin: '*',
    });

    const config = new DocumentBuilder()
      .setTitle('Music library')
      .setDescription('Create, read, update, delete tracks, albums')
      .setVersion('1.0')
      .addTag('music_library')
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, documentFactory);

    app.use(bodyParser.json({ limit: '40mb' }));
    app.use(bodyParser.urlencoded({ extended: true, limit: '40mb' }));

    // app.use((req, res, next) => {
    //   res.header(
    //     'Access-Control-Allow-Origin',
    //     'https://nest-next-kappa.vercel.app',
    //   );
    //   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    //   res.header(
    //     'Access-Control-Allow-Headers',
    //     'Content-Type, Accept, Authorization',
    //   );
    //   next();
    // });

    await app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server listens on PORT=${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
