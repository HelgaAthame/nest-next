"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const file_module_1 = require("./file/file.module");
const path_1 = require("path");
const serve_static_1 = require("@nestjs/serve-static");
const album_module_1 = require("./album/album.module");
const common_1 = require("@nestjs/common");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply((req, res, next) => {
            if (req.url === '/index.html') {
                return res.status(404).send('Not Found');
            }
            next();
        })
            .forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.resolve)(__dirname, 'static'),
            }),
            mongoose_1.MongooseModule.forRoot('mongodb+srv://olgafront:666@cluster0.jmctt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
            file_module_1.FileModule,
            album_module_1.AlbumModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map