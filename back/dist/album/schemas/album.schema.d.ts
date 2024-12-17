import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Track } from '../../track/schemas/track.schema';
export type AlbumDocument = HydratedDocument<Album>;
export declare class Album {
    name: string;
    artist: string;
    picture: string;
    tracks: Track[];
}
export declare const AlbumSchema: mongoose.Schema<Album, mongoose.Model<Album, any, any, any, mongoose.Document<unknown, any, Album> & Album & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Album, mongoose.Document<unknown, {}, mongoose.FlatRecord<Album>> & mongoose.FlatRecord<Album> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
