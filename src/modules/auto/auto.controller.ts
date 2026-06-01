import { Controller, Get, Body, Post, Res } from "@nestjs/common";
import { AutoService } from "./auto.service";
import { ApiOperation, ApiBody, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { UserEntity } from "../user/user.entity";
import { JwtService } from "@nestjs/jwt";
import { Inject } from "@nestjs/common";

@ApiTags("认证")
@Controller("auto")
export class AutoController {
  constructor(private autoService: AutoService, private jwtService: JwtService) {};

  @Post("login")
  @ApiOperation({ summary: "登录" })
  @ApiBody({ type: LoginDto })
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const user = await this.autoService.login(dto);
    const token = await this.jwtService.signAsync({
      user: {
        userId: user.userid,
        username: user.username
      }
    });
    return { accessToken: token };
  }

  @Post("register")
  @ApiOperation({ summary: "注册" })
  @ApiBody({ type: RegisterDto })
  async register(@Body() dto: RegisterDto) {
    return this.autoService.register(dto);
  }
}
