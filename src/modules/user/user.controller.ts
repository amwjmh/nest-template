import { Body, Controller, Post, Get, Req, UseGuards, Query } from "@nestjs/common";
import { ApiTags, ApiBody, ApiOperation, ApiQuery } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { JwtService } from "@nestjs/jwt";
import { ApiResponse } from "../../common/api-response";
import { RequireLogin } from "../../decorators/requireLogin-decorator";
import { AuthGuard } from "@nestjs/passport";
import { ListDto } from "./dto/list.dto";
import { EditDto } from "./dto/edit.dto";
import { CreateDto } from "./dto/create.dto";
import { PageResult } from "../../common/api-response";

@ApiTags("用户管理")
@Controller("api/user")
@RequireLogin()
export class UserController {
  constructor(private userService: UserService, private jwtService: JwtService) {};
  @Post("create")
  @ApiOperation({ summary: "创建用户" })
  @ApiBody({ type: CreateDto })
  async createUser(@Body() user: CreateDto) {
    try {
      await this.userService.create(user);
      return ApiResponse.ok(null, "创建成功");
    } catch (error) {
      return ApiResponse.fail(error.message);
    }
  }

  @Post("edit")
  @ApiOperation({ summary: "编辑用户" })
  @ApiBody({ type: EditDto })
  async editUser(@Body() user: EditDto) {
    try {
      await this.userService.edit(user);
      return ApiResponse.ok("编辑成功");
    } catch (error) {
      return ApiResponse.fail(error.message);
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

  @Post("list")
  @ApiOperation({ summary: "查询用户列表" })
  async list(@Body() listDto: ListDto) {
    const { list, total } = await this.userService.list(listDto);
    return ApiResponse.ok(list, "查询成功", total);
  }
}
