import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UploadDto {
  @ApiProperty({ description: "文件名", type: String })
  filename: string;

  @ApiProperty({ description: "文件大小", type: Number })
  size: number;

  @ApiProperty({ description: "文件路径", type: String })
  path: string;

  @ApiPropertyOptional({ description: "文件类型", type: String })
  mimetype?: string;
}
