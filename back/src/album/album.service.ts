import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album } from './schemas/album.schema';
import { Model } from 'mongoose';
import { FileService, FileType } from 'src/file/file.service';
import { Track } from 'src/track/schemas/track.schema';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<Album>,
    @InjectModel(Track.name) private trackModel: Model<Track>,
    private fileService: FileService,
  ) {}

  async getAll(count: number = 10, offset: number = 0): Promise<Album[]> {
    const albums = await this.albumModel
      .find()
      .skip(Number(offset))
      .limit(Number(count));
    return albums;
  }

  async create(
    dto: CreateAlbumDto,
    picture: Express.Multer.File,
  ): Promise<Album> {
    const picaturePath = await this.fileService.createFile(
      FileType.IMAGE,
      picture,
    );
    const album = await this.albumModel.create({
      ...dto,
      picture: picaturePath,
    });
    return album;
  }
}
