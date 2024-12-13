import {
  // BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateAlbumDto } from './dto/create-album.dto';
import { ObjectId } from 'mongoose';
import { CreateTrackDto } from '../track/dto/create-track.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { Album } from './schemas/album.schema';
import { Track } from '../track/schemas/track.schema';
// import { FilesInterceptor } from '@nestjs/platform-express';
// import * as path from 'path';

@Controller('/albums')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: Album,
    isArray: true,
  })
  getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.albumService.getAll(count, offset);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: Album,
  })
  getOne(@Param('id') id: ObjectId) {
    return this.albumService.getOne(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Album created',
    type: Album,
  })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  @ApiBody({ type: [CreateAlbumDto] })
  create(@UploadedFiles() files, @Body() dto: CreateAlbumDto) {
    const { picture } = files;
    return this.albumService.create(dto, picture[0]);
  }

  @Post('/add-track')
  @ApiResponse({
    status: 201,
    description: 'Track added',
    type: Track,
  })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
    // FilesInterceptor('files', 2, {
    //   limits: {
    //     fileSize: 6 * 1024 * 1024, // 6MB для каждого файла
    //   },
    //   fileFilter: (req, file, callback) => {
    //     const ext = path.extname(file.originalname).toLowerCase();
    //     if (
    //       ext !== '.mp3' &&
    //       ext !== '.jpg' &&
    //       ext !== '.jpeg' &&
    //       ext !== '.png'
    //     ) {
    //       return callback(new BadRequestException('Invalid file type'), false);
    //     }
    //     callback(null, true);
    //   },
    // }),
  )
  @ApiBody({ type: [CreateTrackDto] })
  addTrack(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
    const { picture, audio } = files;
    return this.albumService.addTrack(dto, picture[0], audio[0]);
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'Album deleted',
    type: String,
  })
  delete(@Param('id') id: ObjectId) {
    return this.albumService.delete(id);
  }
}
