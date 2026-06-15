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
import { APP_INTERCEPTOR, APP_GUARD } from "@nestjs/core";
import { RedisModule } from "./common/redis/redis.module";
import { AuthModule } from "./modules/auth/auth.module";
import { RoleModule } from "./modules/role/role.module";
import { PermissionModule } from "./modules/permission/permission.module";
import { LoginGuard } from "./guard/login.guard";
import { JwtModule } from "@nestjs/jwt";

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
    JwtModule.register({
      global: true,
      secret: "guang", signOptions: { expiresIn: "1d" }
    }),
    LoggerModule,
    RedisModule,
    UserModule,
    DepartmentModule,
    UploadModule,
    AuthModule,
    RoleModule,
    PermissionModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }
    // {
    //   provide: APP_GUARD,
    //   useClass: LoginGuard
    // }
  ]
})
export class AppModule {}
