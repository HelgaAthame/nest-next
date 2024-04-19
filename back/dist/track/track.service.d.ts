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
import { Model, ObjectId } from 'mongoose';
import { Track } from './schemas/track.schema';
import { Comment } from './schemas/comment.schema';
import { CreateTrackDto } from './dto/create-track.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FileService } from 'src/file/file.service';
export declare class TrackService {
    private trackModel;
    private commentModel;
    private fileService;
    constructor(trackModel: Model<Track>, commentModel: Model<Comment>, fileService: FileService);
    create(dto: CreateTrackDto, picture: Express.Multer.File, audio: Express.Multer.File): Promise<Track>;
    getOne(id: ObjectId): Promise<Track>;
    getAll(count?: number, offset?: number): Promise<Track[]>;
    delete(id: ObjectId): Promise<ObjectId>;
    addComment(dto: CreateCommentDto): Promise<Comment>;
    listen(id: ObjectId): Promise<void>;
    search(query?: string): Promise<Track[]>;
}
