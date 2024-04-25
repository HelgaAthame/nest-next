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
exports.AlbumController = void 0;
const common_1 = require("@nestjs/common");
const album_service_1 = require("./album.service");
const platform_express_1 = require("@nestjs/platform-express");
const create_album_dto_1 = require("./dto/create-album.dto");
const create_track_dto_1 = require("../track/dto/create-track.dto");
let AlbumController = class AlbumController {
    constructor(albumService) {
        this.albumService = albumService;
    }
    getAll(count, offset) {
        return this.albumService.getAll(count, offset);
    }
    getOne(id) {
        return this.albumService.getOne(id);
    }
    create(files, dto) {
        const { picture } = files;
        return this.albumService.create(dto, picture[0]);
    }
    addTrack(files, dto) {
        const { picture, audio } = files;
        return this.albumService.addTrack(dto, picture[0], audio[0]);
    }
};
exports.AlbumController = AlbumController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('count')),
    __param(1, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], AlbumController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AlbumController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'picture', maxCount: 1 }])),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_album_dto_1.CreateAlbumDto]),
    __metadata("design:returntype", void 0)
], AlbumController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/add-track'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'picture', maxCount: 1 },
        { name: 'audio', maxCount: 1 },
    ])),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_track_dto_1.CreateTrackDto]),
    __metadata("design:returntype", void 0)
], AlbumController.prototype, "addTrack", null);
exports.AlbumController = AlbumController = __decorate([
    (0, common_1.Controller)('/albums'),
    __metadata("design:paramtypes", [album_service_1.AlbumService])
], AlbumController);
//# sourceMappingURL=album.controller.js.map