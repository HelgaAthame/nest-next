import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty({
    type: String,
  })
  readonly name;

  @ApiProperty({
    type: String,
  })
  readonly artist;
}
