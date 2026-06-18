import { IsNumber, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ListDto {
  @IsNumber()
  @ApiProperty({ description: "页码", example: 1 })
  pageNum: number;

  @IsNumber()
  @ApiProperty({ description: "每页条数", example: 10 })
  pageSize: number;

  @ApiProperty({ description: "用户名" })
  @IsOptional()
  userName: string;
}
