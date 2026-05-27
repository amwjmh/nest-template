import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./modules/user/user.module";
import { ConfigModule } from "@nestjs/config";
import configuration from "./configuration";
import { AppConfigService } from "./shared/services/app-config.service";
import { SharedModule } from "./shared/shared.module";
import { DepartmentModule } from "./modules/department/department.module";
import { UploadModule } from "./modules/upload/upload.module";
import { LoggerModule } from "./common/logger/logger.module";
import { LoggingInterceptor } from "./common/interceptors/loging.interceptor";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { RedisModule } from "./common/redis/redis.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ".env"
    }),
    SharedModule,
    TypeOrmModule.forRootAsync({
      useFactory: (appConfigService: AppConfigService) => {
        return appConfigService.typeOrmConfig;
      },
      inject: [AppConfigService]
    }),
    LoggerModule,
    RedisModule,
    UserModule,
    DepartmentModule,
    UploadModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }
  ]
})
export class AppModule {}
