import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album } from './schemas/album.schema';
import { Model, ObjectId } from 'mongoose';
import { FileService, FileType } from 'src/file/file.service';
import { Track } from 'src/track/schemas/track.schema';
import { CreateAlbumDto } from './dto/create-album.dto';
import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { TrackService } from '@/track/track.service';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<Track>,
    @InjectModel(Album.name) private albumModel: Model<Album>,
    private fileService: FileService,
  ) {}

  async getAll(count: number = 10, offset: number = 0): Promise<Album[]> {
    const albums = await this.albumModel
      .find()
      .skip(Number(offset))
      .limit(Number(count));
    return albums;
  }

  async getOne(id: ObjectId): Promise<Album> {
    const album = await this.albumModel.findById(id).populate('tracks');
    return album;
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

  async addTrack(
    dto: CreateTrackDto,
    picture: Express.Multer.File,
    audio: Express.Multer.File,
  ): Promise<Track> {
    const audioPath = await this.fileService.createFile(FileType.AUDIO, audio);
    const picaturePath = await this.fileService.createFile(
      FileType.IMAGE,
      picture,
    );
    console.log(dto);
    const album = await this.albumModel.findById(dto.albumid);
    const track = await this.trackModel.create({
      ...dto,
      listens: 0,
      picture: picaturePath,
      audio: audioPath,
    });
    album.tracks.push(track.id);
    await album.save();
    return track;
  }

  async delete(id: ObjectId): Promise<string> {
    const album = await this.albumModel.findById(id);
    if (!album) throw new NotFoundException({ message: 'Album not found' });
    const trackIds = album.tracks;
    await this.albumModel.findByIdAndDelete(id);
    trackIds.forEach((trackId) => {
      this.trackModel.findByIdAndDelete(trackId);
    });
    return `Album ${album.id} was successfully deleted!`;
  }
}
