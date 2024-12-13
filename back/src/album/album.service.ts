import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album } from './schemas/album.schema';
import { Model, ObjectId } from 'mongoose';
import { FileService, FileType } from '../file/file.service';
import { Track } from '../track/schemas/track.schema';
import { CreateAlbumDto } from './dto/create-album.dto';
import { CreateTrackDto } from '../track/dto/create-track.dto';

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
    if (!albums || !albums.length)
      throw new NotFoundException({ message: 'Albums not found' });
    return albums;
  }

  async getOne(id: ObjectId): Promise<Album> {
    const album = await this.albumModel.findById(id).populate('tracks');
    if (!album) throw new NotFoundException({ message: 'Album not found' });
    return album;
  }

  async create(
    dto: CreateAlbumDto,
    picture: Express.Multer.File,
  ): Promise<Album> {
    const picturePath = await this.fileService.createFile(
      FileType.IMAGE,
      picture,
    );
    const album = await this.albumModel.create({
      ...dto,
      picture: picturePath,
    });
    if (!album) throw new NotFoundException({ message: 'Album not found' }); //todo create exception
    return album;
  }

  async addTrack(
    dto: CreateTrackDto,
    picture: Express.Multer.File,
    audio: Express.Multer.File,
  ): Promise<Track> {
    const audioPath = await this.fileService.createFile(FileType.AUDIO, audio);
    const picturePath = await this.fileService.createFile(
      FileType.IMAGE,
      picture,
    );
    if (!dto.albumid) throw new BadRequestException('Incorrect album id');
    const album = await this.albumModel.findById(dto.albumid);
    if (!album) throw new NotFoundException({ message: 'Album not found' });
    const track = await this.trackModel.create({
      ...dto,
      listens: 0,
      picture: picturePath,
      audio: audioPath,
    });
    if (!track)
      throw new NotFoundException({ message: 'Track was not created' });
    if (track) album.tracks.push(track.id);
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
