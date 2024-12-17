import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { ObjectId } from 'mongoose';
import { CreateTrackDto } from '../track/dto/create-track.dto';
import { Album } from './schemas/album.schema';
import { Track } from '../track/schemas/track.schema';
export declare class AlbumController {
    private albumService;
    constructor(albumService: AlbumService);
    getAll(count: number, offset: number): Promise<Album[]>;
    getOne(id: ObjectId): Promise<Album>;
    create(files: any, dto: CreateAlbumDto): Promise<Album>;
    addTrack(files: any, dto: CreateTrackDto): Promise<Track>;
    delete(id: ObjectId): Promise<string>;
}
