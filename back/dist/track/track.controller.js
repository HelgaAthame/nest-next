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
exports.TrackController = void 0;
const common_1 = require("@nestjs/common");
const track_service_1 = require("./track.service");
const create_comment_dto_1 = require("./dto/create-comment.dto");
let TrackController = class TrackController {
    constructor(trackService) {
        this.trackService = trackService;
    }
    getOne(id) {
        return this.trackService.getOne(id);
    }
    getAll(count, offset) {
        return this.trackService.getAll(count, offset);
    }
    delete(id) {
        return this.trackService.delete(id);
    }
    addComment(dto) {
        return this.trackService.addComment(dto);
    }
    listen(id) {
        return this.trackService.listen(id);
    }
};
exports.TrackController = TrackController;
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TrackController.prototype, "getOne", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('count')),
    __param(1, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], TrackController.prototype, "getAll", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TrackController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('comment'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_comment_dto_1.CreateCommentDto]),
    __metadata("design:returntype", void 0)
], TrackController.prototype, "addComment", null);
__decorate([
    (0, common_1.Post)('/listen/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TrackController.prototype, "listen", null);
exports.TrackController = TrackController = __decorate([
    (0, common_1.Controller)('/tracks'),
    __metadata("design:paramtypes", [track_service_1.TrackService])
], TrackController);
//# sourceMappingURL=track.controller.js.map