import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/HttpException.filter';

const start = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new HttpExceptionFilter());
    app.enableCors();
    await app.listen(PORT, () => {
      console.log(`Server listens on PORT=${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
