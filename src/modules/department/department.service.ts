import { Injectable } from "@nestjs/common";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { UpdateDepartmentDto } from "./dto/update-department.dto";
import { RedisService } from "../../common/redis/redis.service";
import { Department } from "./entities/department.entity";
import { WinstonLogger } from "../../common/logger/logger.service";

@Injectable()
export class DepartmentService {
  constructor(private readonly redisService: RedisService, private readonly logger: WinstonLogger) {
  }
  create(createDepartmentDto: CreateDepartmentDto) {
    return "This action adds a new department";
  }

  findAll() {
    return `This action returns all department`;
  }

  async findOne(id: number) {
    const cancheId = `$department:${id}`;
    const cached = await this.redisService.getObject<Department>(cancheId);
    if (cached) {
      this.logger.log(`findOne cache hit, id: ${id}`);
      return cached;
    } else {
      this.logger.log(`findOne cache miss, id: ${id}`);
      await this.redisService.setObject(cancheId, {
        id,
        name: "部门名称"
      });
      return {
        id,
        name: "部门名称"
      };
    }
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return `This action updates a #${id} department`;
  }

  remove(id: number) {
    return `This action removes a #${id} department`;
  }
}
