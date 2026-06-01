import { Injectable, Body } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userDtoRepository: Repository<UserEntity>) {
  }

  async createUser(@Body() user: UserEntity) {
    // console.log(user);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userDtoRepository.query("select * from user");
  }
}
