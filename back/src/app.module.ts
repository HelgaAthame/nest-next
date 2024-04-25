import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';
import { resolve } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    MongooseModule.forRoot(
      'mongodb+srv://athame:666@athame.vwrzwf2.mongodb.net/',
    ),
    FileModule,
    AlbumModule,
  ],
})
export class AppModule {}
