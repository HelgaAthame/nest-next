import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { Track } from './schemas/track.schema';
import { Comment } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FileService } from '../file/file.service';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<Track>,
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    private fileService: FileService,
  ) {}

  // async create(
  //   dto: CreateTrackDto,
  //   picture: Express.Multer.File,
  //   audio: Express.Multer.File,
  // ): Promise<Track> {
  //   const audioPath = await this.fileService.createFile(FileType.AUDIO, audio);
  //   const picaturePath = await this.fileService.createFile(
  //     FileType.IMAGE,
  //     picture,
  //   );
  //   const track = await this.trackModel.create({
  //     ...dto,
  //     listens: 0,
  //     picture: picaturePath,
  //     audio: audioPath,
  //   });
  //   return track;
  // }

  async getOne(id: ObjectId): Promise<Track> {
    if (!Types.ObjectId.isValid(id.toString())) {
      throw new BadRequestException('Invalid ObjectId format');
    }
    const objectId = new Types.ObjectId(id.toString());
    const track = await this.trackModel.findById(objectId).populate('comments');
    if (!track) throw new NotFoundException({ message: 'Track not found' });
    return track;
  }

  async getAll(count: number = 10, offset: number = 0): Promise<Track[]> {
    const tracks = await this.trackModel
      .find()
      .skip(Number(offset))
      .limit(Number(count));
    if (!tracks) throw new NotFoundException({ message: 'Tracks not found' });
    return tracks;
  }
  async delete(id: ObjectId): Promise<string> {
    const track = await this.trackModel.findByIdAndDelete(id);
    if (!track) throw new NotFoundException({ message: 'Track not found' });
    return `Album ${track.id} was successfully deleted!`;
  }

  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(dto.trackid);
    if (!track) throw new NotFoundException({ message: 'Track not found' });
    const comment = await this.commentModel.create({ ...dto });
    //todo was not create exception
    track.comments.push(comment.id);
    await track.save();
    return comment;
  }

  async listen(id: ObjectId) {
    const track = await this.trackModel.findById(id);
    track.listens += 1;
    track.save();
    return track.listens;
  }

  async search(query: string = ''): Promise<Track[]> {
    const tracks = await this.trackModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });
    return tracks;
  }
}
