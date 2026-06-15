import { Injectable, Body } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userDtoRepository: Repository<UserEntity>) {}

  async createUser(@Body() user: UserEntity) {
    // console.log(user);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userDtoRepository.query("select * from user");
  }

  async findUserInfoById(userId: number) {
    const user = await this.userDtoRepository.findOne({
      where: { id: userId as any },
      relations: ["roles", "roles.permissions"]
    });

    if (!user) {
      return null;
    }

    const roles = user.roles?.map((role) => role.roleCode) ?? [];
    const buttons = user.roles?.flatMap((role) => role.permissions?.map((p) => p.permissionCode) ?? []) ?? [];

    return {
      userId: String(user.id),
      userName: user.userName,
      roles,
      buttons,
      email: user.email
    };
  }
  async findById(userId: string) {
    try {
      const user = await this.userDtoRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new Error("用户不存在");
      }
      return user;
    } catch (error) {
      return null;
    }
  }
}
