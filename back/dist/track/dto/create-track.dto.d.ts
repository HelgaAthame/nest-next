import { ObjectId } from 'mongoose';
export declare class CreateTrackDto {
    readonly name: any;
    readonly artist: any;
    readonly text: any;
    readonly albumid: ObjectId;
}
