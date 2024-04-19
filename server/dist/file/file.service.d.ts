export declare enum FileType {
    AUDIO = "audio",
    IMAGE = "image"
}
export declare class FileService {
    createFile(type: FileType, file: File): void;
    removeFile(fileName: string): void;
}
