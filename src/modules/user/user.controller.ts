import { Body, Controller, Post, Get } from "@nestjs/common";
import { ApiTags, ApiBody, ApiOperation } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { UserDto } from "./user.dto";
import { ApiResult } from "../../decorators/api-result.decoraator";

@ApiTags("用户管理")
@Controller("user")
export class UserController {
  constructor(private userService: UserService) {};

  @Post("create")
  @ApiOperation({ summary: "创建用户" })
  @ApiBody({ type: UserDto })
  async createUser(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }
  @Get("findAll")
  @ApiOperation({ summary: "查询用户" })
  @ApiResult(UserDto, true, true)
  async findAll() {
    return this.userService.findAll();
  }
}
