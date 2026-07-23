import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';
import { AlbumModule } from './album/album.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI as string),
    FileModule,
    AlbumModule,
  ],
})
export class AppModule {}
