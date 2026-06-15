import { Body, Controller, Post, Get, Req, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBody, ApiOperation } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { UserEntity } from "./user.entity";
import { JwtService } from "@nestjs/jwt";
import { ApiResponse } from "../../common/api-response";
import { RequireLogin } from "../../decorators/requireLogin-decorator";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("用户管理")
@Controller("api/user")
@RequireLogin()
export class UserController {
  constructor(private userService: UserService, private jwtService: JwtService) {};

  @Post("create")
  @ApiOperation({ summary: "创建用户" })
  @ApiBody({ type: UserEntity })
  async createUser(@Body() user: UserEntity, @Req() req: Request) {
    try {
      const accessToken = req.headers["authorization"];
      console.log(accessToken);
      if (!accessToken) {
        throw new Error("未授权");
      }
      const token = accessToken.split(" ")[1];
      const payload = this.jwtService.verify(token);
      if (!payload) {
        throw new Error("无效的token");
      }
      return this.userService.createUser(user);
    } catch (error) {
      return { error: error.message };
    }
  }
  @Get("findAll")
  @ApiOperation({ summary: "查询用户" })
  async findAll() {
    return this.userService.findAll();
  }

  @Get("info")
  @ApiOperation({ summary: "查询用户信息" })
  @UseGuards(AuthGuard("jwt"))
  async info(@Req() req: Request) {
    try {
      const authorization = req.headers["authorization"];
      const token = authorization.split(" ")[1];
      const payload = this.jwtService.verify(token);
      if (!payload) {
        return ApiResponse.fail("token中未包含用户标识");
      }
      const userId = payload.userId;
      if (!userId) {
        return ApiResponse.fail("token中未包含用户标识");
      }
      return this.userService.findUserInfoById(userId);
    } catch (error) {
      console.log(error.message);
      return ApiResponse.fail(error.message);
    }
  }
}
