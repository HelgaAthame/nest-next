import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { ObjectId } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Track } from './schemas/track.schema';
import { Comment } from './schemas/comment.schema';

@Controller('/tracks')
export class TrackController {
  constructor(private trackService: TrackService) {}

  // @Post()
  // @UseInterceptors(
  //   FileFieldsInterceptor([
  //     { name: 'picture', maxCount: 1 },
  //     { name: 'audio', maxCount: 1 },
  //   ]),
  // )
  // create(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
  //   const { picture, audio } = files;
  //   return this.trackService.create(dto, picture[0], audio[0]);
  // }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: Track,
  })
  @ApiParam({
    name: 'id',
    description: 'The ID of the track',
    required: true, // Указывает, что параметр обязательный
    type: String, // Указывает тип параметра (ObjectId в виде строки)
  })
  getOne(@Param('id') id: ObjectId) {
    return this.trackService.getOne(id);
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: Track,
    isArray: true,
  })
  getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.trackService.getAll(count, offset);
  }
  // @Get('search')
  // search(@Query('query') query: string) {
  //   return this.trackService.search(query);
  // }

  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'Track deleted',
    type: String,
  })
  delete(@Param('id') id: ObjectId) {
    return this.trackService.delete(id);
  }

  @Post('comment')
  @ApiResponse({
    status: 201,
    description: 'Comment added',
    type: Comment,
  })
  @ApiBody({ type: [CreateCommentDto] })
  addComment(@Body() dto: CreateCommentDto) {
    return this.trackService.addComment(dto);
  }

  @Post('/listen/:id')
  listen(@Param('id') id: ObjectId) {
    return this.trackService.listen(id);
  }
}
