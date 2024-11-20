import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty({
    type: String,
  })
  readonly name;

  @ApiProperty({
    type: String,
  })
  readonly artist;

  @ApiProperty({
    type: String,
  })
  readonly text;

  @ApiProperty({
    type: Number,
  })
  readonly albumid: ObjectId;
}
