import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class EditDto {
  id: string;
  @ApiProperty({ description: "用户名" })
  userName: string;

  @ApiProperty({ description: "性别" })
  @IsOptional()
  gender?: number;

  @ApiProperty({ description: "手机号" })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: "邮箱" })
  @IsOptional()
  @IsString()
  email?: string;
}
