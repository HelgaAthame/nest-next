import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
export declare class AlbumController {
    private albumService;
    constructor(albumService: AlbumService);
    getAll(count: number, offset: number): Promise<import("./schemas/album.schema").Album[]>;
    create(files: any, dto: CreateAlbumDto): Promise<import("./schemas/album.schema").Album>;
}
