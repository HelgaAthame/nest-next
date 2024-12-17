import { Model, ObjectId } from 'mongoose';
import { Track } from './schemas/track.schema';
import { Comment } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FileService } from '../file/file.service';
export declare class TrackService {
    private trackModel;
    private commentModel;
    private fileService;
    constructor(trackModel: Model<Track>, commentModel: Model<Comment>, fileService: FileService);
    getOne(id: ObjectId): Promise<Track>;
    getAll(count?: number, offset?: number): Promise<Track[]>;
    delete(id: ObjectId): Promise<string>;
    addComment(dto: CreateCommentDto): Promise<Comment>;
    listen(id: ObjectId): Promise<number>;
    search(query?: string): Promise<Track[]>;
}
