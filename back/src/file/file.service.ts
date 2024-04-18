import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs/promises';
import * as uuid from 'uuid';

export enum FileType {
  AUDIO = 'audio',
  IMAGE = 'image',
}

@Injectable()
export class FileService {
  async createFile(type: FileType, file: Express.Multer.File): Promise<string> {
    try {
      const fileExt = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + fileExt;
      const filePath = path.resolve(__dirname, '..', 'static', type);
      try {
        await fs.access(filePath);
      } catch (e) {
        await fs.mkdir(filePath, { recursive: true });
      }
      await fs.writeFile(path.resolve(filePath ,fileName), file.buffer);
      return type + '/' + fileName;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  removeFile(fileName: string) {}
}
