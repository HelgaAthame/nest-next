import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';
import { AlbumModule } from './album/album.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI as string),
    FileModule,
    AlbumModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Добавьте проверку для запроса к index.html
    consumer
      .apply((req, res, next) => {
        if (req.url === '/index.html') {
          return res.status(404).send('Not Found');
        }
        next();
      })
      .forRoutes('*');
  }
}
