/// <reference types="multer" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
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
