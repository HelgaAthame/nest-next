"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = exports.FileType = void 0;
const common_1 = require("@nestjs/common");
const path = require("path");
const fs = require("fs/promises");
const uuid = require("uuid");
var FileType;
(function (FileType) {
    FileType["AUDIO"] = "audio";
    FileType["IMAGE"] = "image";
})(FileType || (exports.FileType = FileType = {}));
let FileService = class FileService {
    async createFile(type, file) {
        try {
            const fileExt = file.originalname.split('.').pop();
            const fileName = uuid.v4() + '.' + fileExt;
            const filePath = path.resolve(__dirname, '..', 'static', type);
            try {
                await fs.access(filePath);
            }
            catch (e) {
                await fs.mkdir(filePath, { recursive: true });
            }
            await fs.writeFile(path.resolve(filePath, fileName), file.buffer);
            return type + '/' + fileName;
        }
        catch (e) {
            throw new common_1.ConflictException('File was not created');
        }
    }
    removeFile(fileName) { }
};
exports.FileService = FileService;
exports.FileService = FileService = __decorate([
    (0, common_1.Injectable)()
], FileService);
//# sourceMappingURL=file.service.js.map