import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { UserEntity } from "../user.entity";

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  };

  async findByEmail(email: string) {
    return this.dataSource.manager.findOne(UserEntity, {
      where: {
        email
      }
    });
  }

  /**
   * 根据邮箱查询用户，包含密码
   * @param email 邮箱
   * @returns 用户实体
   */
  async findByEmailWithPassword(email: string) {
    return this.createQueryBuilder("user")
      .addSelect("user.password")
      .where("user.email = :email", { email })
      .getOne();
  }
}
