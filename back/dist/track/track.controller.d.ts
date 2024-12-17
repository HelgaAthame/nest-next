import { TrackService } from './track.service';
import { ObjectId } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Track } from './schemas/track.schema';
import { Comment } from './schemas/comment.schema';
export declare class TrackController {
    private trackService;
    constructor(trackService: TrackService);
    getOne(id: ObjectId): Promise<Track>;
    getAll(count: number, offset: number): Promise<Track[]>;
    delete(id: ObjectId): Promise<string>;
    addComment(dto: CreateCommentDto): Promise<Comment>;
    listen(id: ObjectId): Promise<number>;
}
