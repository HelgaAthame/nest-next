import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://athame:666@athame.vwrzwf2.mongodb.net/'), TrackModule, FileModule],
})
export class AppModule {}
