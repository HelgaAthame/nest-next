import { Album } from './schemas/album.schema';
import { Model, ObjectId } from 'mongoose';
import { FileService } from '../file/file.service';
import { Track } from '../track/schemas/track.schema';
import { CreateAlbumDto } from './dto/create-album.dto';
import { CreateTrackDto } from '../track/dto/create-track.dto';
export declare class AlbumService {
    private trackModel;
    private albumModel;
    private fileService;
    constructor(trackModel: Model<Track>, albumModel: Model<Album>, fileService: FileService);
    getAll(count?: number, offset?: number): Promise<Album[]>;
    getOne(id: ObjectId): Promise<Album>;
    create(dto: CreateAlbumDto, picture: Express.Multer.File): Promise<Album>;
    addTrack(dto: CreateTrackDto, picture: Express.Multer.File, audio: Express.Multer.File): Promise<Track>;
    delete(id: ObjectId): Promise<string>;
}
