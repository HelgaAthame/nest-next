import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Album } from "./schemas/album.schema";
import { Model } from "mongoose";
import { FileService } from "src/file/file.service";
import { Track } from "src/track/schemas/track.schema";

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<Album>,
    @InjectModel(Track.name) private trackModel: Model<Track>,
    private fileService: FileService,
  ) {}


}
