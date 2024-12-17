import { ObjectId } from 'mongoose';
export declare class CreateCommentDto {
    readonly username: any;
    readonly text: any;
    readonly trackid: ObjectId;
}
