import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString, IsArray, IsEmail, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateDto {
  @ApiProperty({ description: "用户名" })
  @IsNotEmpty({ message: "用户名不能为空" })
  @IsString({ message: "用户名必须是字符串" })
  userName: string;

  @ApiProperty({ description: "性别 0=女 1=男" })
  @IsNotEmpty({ message: "性别不能为空" })
  @IsNumber({}, { message: "性别必须是数字" })
  gender: number;

  @ApiPropertyOptional({ description: "手机号" })
  @IsOptional()
  @IsPhoneNumber("CN", { message: "手机号格式错误" })
  phone?: string;

  @ApiProperty({ description: "邮箱" })
  @IsNotEmpty({ message: "邮箱不能为空" })
  @IsEmail({}, { message: "邮箱格式错误" })
  email: string;

  @ApiProperty({ description: "角色编码数组" })
  @IsNotEmpty({ message: "角色不能为空" })
  @IsArray({ message: "角色必须是数组" })
  roles: string[];
}
