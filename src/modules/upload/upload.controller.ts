import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors, UsePipes } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiConsumes } from "@nestjs/swagger";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { UploadService } from "./upload.service";
import { UploadDto } from "./upload.dto";
import { ApiResult } from "../../decorators/api-result.decoraator";
import { FileSizeValidationPipe } from "../../pipes/file-size.pipe";

@ApiTags("文件上传")
@Controller("upload")
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post("single")
  @ApiOperation({ summary: "单文件上传" })
  @ApiConsumes("multipart/form-data")
  @ApiResult(UploadDto)
  @UseInterceptors(FileInterceptor("file"))
  @UsePipes(new FileSizeValidationPipe(5 * 1024 * 1024))
  async uploadSingleFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return this.uploadService.uploadFile(file);
  }

  @Post("multiple")
  @ApiOperation({ summary: "多文件上传" })
  @ApiConsumes("multipart/form-data")
  @ApiResult(UploadDto, true)
  @UseInterceptors(FilesInterceptor("files"))
  async uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
    return this.uploadService.uploadFiles(files);
  }
}
