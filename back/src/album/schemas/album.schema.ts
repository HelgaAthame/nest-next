import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Track } from '../../track/schemas/track.schema';
import { ApiProperty } from '@nestjs/swagger';

export type AlbumDocument = HydratedDocument<Album>;

@Schema()
export class Album {
  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  artist: string;

  @ApiProperty()
  @Prop()
  picture: string;

  @ApiProperty()
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }] })
  tracks: Track[];
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
