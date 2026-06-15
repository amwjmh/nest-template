import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({ description: "用户名", type: String })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({ description: "密码", type: String })
  @IsString()
  @IsNotEmpty()
  password: string;
}
