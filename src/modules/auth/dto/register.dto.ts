
import { IsNotEmpty, IsString, IsEmail, MinLength, MaxLength, Matches, IsNumber, Min, Max } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({ description: "用户名" })
  @IsNotEmpty()
  @IsString()
  userName: string;

  @ApiProperty({ description: "邮箱" })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ description: "密码" })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,8}$/, { message: "密码必须包含大小写字母、数字和特殊字符" })
  password: string;

  @ApiProperty({ description: "性别 0 ｜ 1" })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(1)
  gender: number;
}
