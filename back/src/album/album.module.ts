import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Album, AlbumSchema } from "./schemas/album.schema";
import { FileService } from "src/file/file.service";
import { AlbumService } from "./album.service";
import { AlbumController } from "./album.controller";

@Module({
  imports: [
    MongooseModule.forFeature([{name: Album.name, schema: AlbumSchema}])
  ],
  controllers: [AlbumController],
  providers: [AlbumService, FileService]
})
export class AlbumModule {}
