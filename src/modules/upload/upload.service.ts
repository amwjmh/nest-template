import { Injectable } from "@nestjs/common";
import { UploadDto } from "./upload.dto";

@Injectable()
export class UploadService {
  async uploadFile(file: Express.Multer.File): Promise<UploadDto> {
    return {
      filename: file.filename,
      size: file.size,
      path: file.path,
      mimetype: file.mimetype
    };
  }

  async uploadFiles(files: Express.Multer.File[]): Promise<UploadDto[]> {
    return files.map(file => ({
      filename: file.filename,
      size: file.size,
      path: file.path,
      mimetype: file.mimetype
    }));
  }
}
