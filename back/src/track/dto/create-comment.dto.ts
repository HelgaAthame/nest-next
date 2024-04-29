import { ObjectId } from 'mongoose';

export class CreateCommentDto {
  readonly username;
  readonly text;
  readonly trackid: ObjectId;
}
