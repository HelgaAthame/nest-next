import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    type: String,
  })
  readonly username;

  @ApiProperty({
    type: String,
  })
  readonly text;

  @ApiProperty({
    type: Number,
  })
  readonly trackid: ObjectId;
}
