import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Track } from './track.schema';
import { ApiProperty } from '@nestjs/swagger';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @ApiProperty()
  @Prop()
  username: string;

  @ApiProperty()
  @Prop()
  text: string;

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Track' })
  track: Track;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
