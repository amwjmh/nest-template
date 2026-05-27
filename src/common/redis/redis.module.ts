import { Global, Module } from "@nestjs/common";
import { RedisService } from "./redis.service";
import { SharedModule } from "../../shared/shared.module";
import { Redis } from "ioredis";
import { AppConfigService } from "../../shared/services/app-config.service";

@Global()
@Module({
  imports: [SharedModule],
  providers: [
    {
      provide: "REDIS_CLIENT",
      useFactory: (appConfigService: AppConfigService) => {
        return new Redis(appConfigService.redisConfig);
      },
      inject: [AppConfigService]
    },
    RedisService
  ],
  exports: [RedisService]
})
export class RedisModule {}
