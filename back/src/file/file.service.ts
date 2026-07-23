import { ConflictException, Injectable } from '@nestjs/common';
import { put } from '@vercel/blob';
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
      const fileName = `${type}/${uuid.v4()}.${fileExt}`;
      const blob = await put(fileName, file.buffer, {
        access: 'public',
        contentType: file.mimetype,
      });
      return blob.url;
    } catch (e) {
      throw new ConflictException('File was not created');
    }
  }
}
