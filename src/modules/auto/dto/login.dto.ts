import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({ description: "邮箱", type: String })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: "密码", type: String })
  @IsString()
  @IsNotEmpty()
  password: string;
}
