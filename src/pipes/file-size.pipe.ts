import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  constructor(private readonly maxSize: number = 10 * 1024 * 1024) {}

  transform(file: Express.Multer.File): Express.Multer.File {
    if (!file) {
      throw new BadRequestException("文件不存在");
    }

    if (file.size > this.maxSize) {
      throw new BadRequestException(
        `文件大小超过限制，最大允许 ${this.formatSize(this.maxSize)}，当前文件大小 ${this.formatSize(file.size)}`
      );
    }

    return file;
  }

  private formatSize(bytes: number): string {
    if (bytes < 1024) {
      return bytes + " B";
    } else if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(2) + " KB";
    } else {
      return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    }
  }
}
