"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const album_schema_1 = require("./schemas/album.schema");
const file_service_1 = require("../file/file.service");
const album_service_1 = require("./album.service");
const album_controller_1 = require("./album.controller");
const track_schema_1 = require("../track/schemas/track.schema");
const track_module_1 = require("../track/track.module");
let AlbumModule = class AlbumModule {
};
exports.AlbumModule = AlbumModule;
exports.AlbumModule = AlbumModule = __decorate([
    (0, common_1.Module)({
        imports: [
            track_module_1.TrackModule,
            mongoose_1.MongooseModule.forFeature([{ name: album_schema_1.Album.name, schema: album_schema_1.AlbumSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: track_schema_1.Track.name, schema: track_schema_1.TrackSchema }]),
        ],
        controllers: [album_controller_1.AlbumController],
        providers: [album_service_1.AlbumService, file_service_1.FileService],
    })
], AlbumModule);
//# sourceMappingURL=album.module.js.map