import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { UserRepository } from "../user/repository/user.repository";
import { Repository } from "typeorm";
import { UserEntity } from "../user/user.entity";
import { WinstonLogger } from "../../common/logger/logger.service";

import * as crypto from "crypto";
import { log } from "console";

function md5(str: string) {
  const hash = crypto.createHash("md5");
  hash.update(str);
  return hash.digest("hex");
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: WinstonLogger
  ) {};

  async register (dto: RegisterDto) {
    const user = await this.userRepository.findByUsername(dto.userName);
    if (user) {
      this.logger.error(`用户 ${JSON.stringify(user)} 已注册`, "AuthService");
      throw new Error("该用户名已注册");
    }
    const password = md5(dto.password);
    const newUser = await this.userRepository.create({
      userName: dto.userName,
      password
    });
    await this.userRepository.save(newUser);
    this.logger.log(`新用户 ${newUser.email} 注册成功`, "AuthService");
    return newUser;
  };

  async login(dto: LoginDto) {
    const user = await this.userRepository.findByUsernameWithPassword(dto.userName);
    if (!user) {
      this.logger.error(`用户 ${dto.userName} 不存在`, "AuthService");
      throw new UnauthorizedException("用户不存在");
    }
    if (md5(dto.password) !== user.password) {
      this.logger.error(`用户 ${dto.userName} 登录失败`, "AuthService");
      throw new UnauthorizedException("密码错误");
    }
    return user;
  }
}
