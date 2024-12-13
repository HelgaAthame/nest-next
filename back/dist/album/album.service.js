"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const album_schema_1 = require("./schemas/album.schema");
const mongoose_2 = require("mongoose");
const file_service_1 = require("../file/file.service");
const track_schema_1 = require("../track/schemas/track.schema");
let AlbumService = class AlbumService {
    constructor(trackModel, albumModel, fileService) {
        this.trackModel = trackModel;
        this.albumModel = albumModel;
        this.fileService = fileService;
    }
    async getAll(count = 10, offset = 0) {
        const albums = await this.albumModel
            .find()
            .skip(Number(offset))
            .limit(Number(count));
        if (!albums || !albums.length)
            throw new common_1.NotFoundException({ message: 'Albums not found' });
        return albums;
    }
    async getOne(id) {
        const album = await this.albumModel.findById(id).populate('tracks');
        if (!album)
            throw new common_1.NotFoundException({ message: 'Album not found' });
        return album;
    }
    async create(dto, picture) {
        const picturePath = await this.fileService.createFile(file_service_1.FileType.IMAGE, picture);
        const album = await this.albumModel.create({
            ...dto,
            picture: picturePath,
        });
        if (!album)
            throw new common_1.NotFoundException({ message: 'Album not found' });
        return album;
    }
    async addTrack(dto, picture, audio) {
        const audioPath = await this.fileService.createFile(file_service_1.FileType.AUDIO, audio);
        const picturePath = await this.fileService.createFile(file_service_1.FileType.IMAGE, picture);
        if (!dto.albumid)
            throw new common_1.BadRequestException('Incorrect album id');
        const album = await this.albumModel.findById(dto.albumid);
        if (!album)
            throw new common_1.NotFoundException({ message: 'Album not found' });
        const track = await this.trackModel.create({
            ...dto,
            listens: 0,
            picture: picturePath,
            audio: audioPath,
        });
        if (!track)
            throw new common_1.NotFoundException({ message: 'Track was not created' });
        if (track)
            album.tracks.push(track.id);
        await album.save();
        return track;
    }
    async delete(id) {
        const album = await this.albumModel.findById(id);
        if (!album)
            throw new common_1.NotFoundException({ message: 'Album not found' });
        const trackIds = album.tracks;
        await this.albumModel.findByIdAndDelete(id);
        trackIds.forEach((trackId) => {
            this.trackModel.findByIdAndDelete(trackId);
        });
        return `Album ${album.id} was successfully deleted!`;
    }
};
exports.AlbumService = AlbumService;
exports.AlbumService = AlbumService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(track_schema_1.Track.name)),
    __param(1, (0, mongoose_1.InjectModel)(album_schema_1.Album.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        file_service_1.FileService])
], AlbumService);
//# sourceMappingURL=album.service.js.map