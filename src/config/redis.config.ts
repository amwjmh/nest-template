import type { RedisOptions } from "ioredis";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { isNil } from "lodash";

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {
  }
  get redisConfig() : RedisOptions {
    return {
      host: this.get("redis.host"),
      port: this.get("redis.port"),
      username: this.get("redis.username"),
      password: this.get("redis.password"),
      db: this.get("redis.db")
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
