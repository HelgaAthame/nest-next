import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Comment } from './comment.schema';
import { Album } from '../../album/schemas/album.schema';
import { ApiProperty } from '@nestjs/swagger';

export type TrackDocument = HydratedDocument<Track>;

@Schema()
export class Track {
  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  artist: string;

  @ApiProperty()
  @Prop()
  text: string;

  @ApiProperty()
  @Prop()
  listens: number;

  @ApiProperty()
  @Prop()
  picture: string;

  @ApiProperty()
  @Prop()
  audio: string;

  @ApiProperty()
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Album' })
  album: Album;
}

export const TrackSchema = SchemaFactory.createForClass(Track);
