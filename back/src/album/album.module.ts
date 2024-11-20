import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Album, AlbumSchema } from './schemas/album.schema';
import { FileService } from '../file/file.service';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { Track, TrackSchema } from '@/track/schemas/track.schema';
import { TrackModule } from '@/track/track.module';

@Module({
  imports: [
    TrackModule,
    MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
  ],
  controllers: [AlbumController],
  providers: [AlbumService, FileService],
})
export class AlbumModule {}
