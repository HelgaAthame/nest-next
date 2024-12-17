import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Comment } from './comment.schema';
import { Album } from '../../album/schemas/album.schema';
export type TrackDocument = HydratedDocument<Track>;
export declare class Track {
    name: string;
    artist: string;
    text: string;
    listens: number;
    picture: string;
    audio: string;
    comments: Comment[];
    album: Album;
}
export declare const TrackSchema: mongoose.Schema<Track, mongoose.Model<Track, any, any, any, mongoose.Document<unknown, any, Track> & Track & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Track, mongoose.Document<unknown, {}, mongoose.FlatRecord<Track>> & mongoose.FlatRecord<Track> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
