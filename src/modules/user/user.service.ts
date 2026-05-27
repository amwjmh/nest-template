import { Injectable, Body } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "./user.dto";

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserDto) private readonly userDtoRepository: Repository<UserDto>) {
  }

  async createUser(@Body() user: UserDto) {
    // console.log(user);
  }

  async findAll(): Promise<UserDto[]> {
    return this.userDtoRepository.query("select * from user");
  }
}
