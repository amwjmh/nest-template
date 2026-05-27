import type { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { isNil } from "lodash";
import { RedisOptions } from "ioredis";
@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {
  }
  get typeOrmConfig() :TypeOrmModuleOptions {
    return {
      type: "mysql",
      host: this.get("db.host"),
      port: this.get("db.port"),
      username: this.get("db.username"),
      password: this.get("db.password"),
      database: this.get("db.database"),
      entities: [__dirname, "../../modules/**/*.dto.ts"],
      synchronize: true
    };
  }
  get redisConfig() : RedisOptions {
    return {
      host: this.get("redis.host"),
      port: this.get("redis.port"),
      password: this.get("redis.password"),
      db: this.get("redis.db"),
      keyPrefix: this.get("redis.keyPrefix")
    };
  }
  private get<T = string>(key: string): T {
    const value = this.configService.get<T>(key);
     if (isNil(value)) {
       throw new Error(key + "环境变量未设置");
     }
    return value;
  }
}
