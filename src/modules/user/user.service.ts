import { Injectable, Body } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as dayjs from "dayjs";
import * as crypto from "crypto";
import { UserEntity } from "./user.entity";
import { ListDto } from "./dto/list.dto";
import { EditDto } from "./dto/edit.dto";
import { CreateDto } from "./dto/create.dto";
import { UserRepository } from "./repository/user.repository";

function md5(str: string) {
  const hash = crypto.createHash("md5");
  hash.update(str);
  return hash.digest("hex");
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userDtoRepository: Repository<UserEntity>,
    private readonly userRepository: UserRepository
) {}

  async findAll(): Promise<UserEntity[]> {
    return this.userDtoRepository.query("select * from user");
  }

  async create(dto: CreateDto) {
    const existUser = await this.userRepository.findByUsername(dto.userName);
    if (existUser) {
      throw new Error("用户名已存在");
    }
    const password = md5("123456");
    const user = await this.userRepository.create({
      userName: dto.userName,
      password,
      gender: dto.gender,
      phone: dto.phone,
      email: dto.email
    });
    return await this.userRepository.save(user);
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

  async list(listDto: ListDto) {
    const where: any = {};
    if (listDto.userName) {
      where.userName = listDto.userName;
    }
    const [result, total] = await this.userDtoRepository.findAndCount({
      where,
      select: ["id", "userName", "gender", "phone", "email", "createTime"],
      skip: (listDto.pageNum - 1) * listDto.pageSize,
      take: listDto.pageSize,
      order: { createTime: "DESC" }
    });
    const list = result.map((user) => ({
      ...user,
      createTime: dayjs(user.createTime).format("YYYY-MM-DD HH:mm:ss")
    }));
    return { list, total };
  }

  async edit(user: EditDto) {
    if (!user.id) {
      throw new Error("用户ID不能为空");
    }
    return this.userDtoRepository.update(user.id, {
      userName: user.userName,
      gender: user.gender,
      phone: user.phone,
      email: user.email
    });
  }
}
